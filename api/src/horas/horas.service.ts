import { Injectable } from '@nestjs/common';
import { Horas } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { sumarHoras } from './utils';

@Injectable()
export class HorasService {
  constructor(private prisma: PrismaService) {}

  async findAll(data): Promise<Horas[]> {
    let where: {
      baja: boolean;
      id?: any;
      empleadoId?: number;
    } = {
      baja: false,
    };

    if (data.ids) {
      where = {
        ...where,
        id: { in: data.ids },
      };
    }
    if (data.empleadoId) {
      where = {
        ...where,
        empleadoId: data.empleadoId,
      };
    }

    const rows = await this.prisma.horas.findMany({
      where,
      include: {
        empleado: {
          select: {
            nombre: true,
            apellido: true,
            grupo: {
              select: {
                nombre: true,
              },
            },
          },
        },
        adicional: {
          select: {
            valor: true,
            novedadesReferencias: {
              select: {
                novedad: {
                  select: {
                    nombre: true,
                    codigo: true,
                  },
                },
                referencia: {
                  select: {
                    nombre: true,
                    codigo: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const result = rows.reduce((prev, current) => {
      const some = prev.some((p) => {
        return (
          p.novedadCodigo ===
            current.adicional.novedadesReferencias.novedad.codigo &&
          p.empleadoId === current.empleadoId
          // new Date(p.fecha).getTime() === new Date(current.fecha).getTime()
        );
      });

      if (some) {
        return prev.map((e) => {
          if (
            e.novedadCodigo ===
              current.adicional.novedadesReferencias.novedad.codigo &&
            e.empleadoId === current.empleadoId
            // new Date(e.fecha).getTime() === new Date(current.fecha).getTime()
          ) {
            return {
              ...e,
              [current.adicional.novedadesReferencias.referencia.codigo]: e[
                current.adicional.novedadesReferencias.referencia.codigo
              ]
                ? sumarHoras(
                    e[current.adicional.novedadesReferencias.referencia.codigo],
                    current.cantidad,
                  )
                : +current.cantidad,
            };
          } else {
            return e;
          }
        });
      } else {
        const dias = rows.reduce((prevB, currentB) => {
          const some =
            currentB.adicional.novedadesReferencias.novedad.codigo ===
              current.adicional.novedadesReferencias.novedad.codigo &&
            currentB.empleadoId === current.empleadoId;

          if (some) {
            const someDate =
              currentB.adicional.novedadesReferencias.novedad.codigo ===
                current.adicional.novedadesReferencias.novedad.codigo &&
              currentB.empleadoId === current.empleadoId &&
              new Date(currentB.fecha).getTime() ===
                new Date(current.fecha).getTime();
            if (someDate) {
              return prev.map((e) => {
                if (
                  currentB.adicional.novedadesReferencias.novedad.codigo ===
                    current.adicional.novedadesReferencias.novedad.codigo &&
                  currentB.empleadoId === current.empleadoId &&
                  new Date(currentB.fecha).getTime() ===
                    new Date(current.fecha).getTime()
                ) {
                  return {
                    ...e,
                    [currentB.adicional.novedadesReferencias.referencia.codigo]:
                      e[
                        currentB.adicional.novedadesReferencias.referencia
                          .codigo
                      ]
                        ? sumarHoras(
                            e[
                              currentB.adicional.novedadesReferencias.referencia
                                .codigo
                            ],
                            currentB.cantidad,
                          )
                        : +currentB.cantidad,
                  };
                } else {
                  return e;
                }
              });
            } else {
              return [
                ...prevB,
                {
                  id: currentB.id,
                  fecha: currentB.fecha,
                  cantidad: currentB.cantidad,
                  empleadoId: currentB.empleadoId,
                  empleado: `${currentB.empleado.apellido || ''} ${currentB.empleado.nombre || ''}`,
                  empleadoNombre: currentB.empleado.nombre,
                  empleadoApellido: currentB.empleado.apellido,
                  [currentB.adicional.novedadesReferencias.referencia.codigo]:
                    currentB.cantidad,
                  novedadCodigo:
                    currentB.adicional.novedadesReferencias.novedad.codigo,
                  novedad: `${currentB.adicional.novedadesReferencias.novedad.codigo} - ${currentB.adicional.novedadesReferencias.novedad.nombre}`,
                },
              ];
            }
          } else {
            return prevB;
          }
        }, []);

        return [
          ...prev,
          {
            id: current.id,
            fecha: current.fecha,
            cantidad: current.cantidad,
            empleadoId: current.empleadoId,
            empleado: `${current.empleado.apellido || ''} ${current.empleado.nombre || ''}`,
            empleadoNombre: current.empleado.nombre,
            empleadoApellido: current.empleado.apellido,
            [current.adicional.novedadesReferencias.referencia.codigo]:
              current.cantidad,
            novedadCodigo:
              current.adicional.novedadesReferencias.novedad.codigo,
            novedad: `${current.adicional.novedadesReferencias.novedad.codigo} - ${current.adicional.novedadesReferencias.novedad.nombre}`,
            dias,
          },
        ];
      }
    }, []);

    return result;
  }

  async findOne(id: number): Promise<Horas> {
    const row = await this.prisma.horas.findUnique({
      where: {
        id,
      },
    });

    return row;
  }
}
