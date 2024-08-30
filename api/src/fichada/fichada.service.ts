import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Fichada } from '@prisma/client';
import { FichadaDto } from './dto';
import * as xlsx from 'xlsx';
import { calcularHoras, multiplicarHoras } from './utils';

@Injectable()
export class FichadaService {
  constructor(private prisma: PrismaService) {}
  async create(body: FichadaDto, file) {
    // Leer el archivo Excel
    const workbook = xlsx.read(new Uint8Array(file.buffer));

    // Seleccionar la primera hoja de trabajo (worksheet)
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    // Convertir la hoja de trabajo a un array de objetos
    const data = xlsx.utils.sheet_to_json(worksheet);

    // Mostrar el resultado
    const array = data.map((e) => {
      const fechaEntrada = e['Fecha de entrada']?.split('-');
      const [dia, mes, anio] = fechaEntrada[0].split('/');

      return {
        nombre: e['Nombre'],
        apellido: e['Apellido'],
        fecha: `${anio.trim()}-${mes.trim()}-${dia.trim()}`,
        horas: calcularHoras(e['Fecha de entrada'], e['Fecha de salida']),
      };
    });

    await this.prisma.fichada.create({
      data: {
        plantaId: +body.plantaId,
        nombre_archivo: file.originalname,
        fecha_subida: new Date(),
      },
    });

    const promises = array.map((e) => {
      return this.prisma.empleado
        .findFirst({
          where: {
            apellido: e.apellido,
            nombre: e.nombre,
          },
          include: {
            grupo: {
              include: {
                adicionales: true,
              },
            },
          },
        })
        .then((empleado) => {
          if (empleado) {
            if (empleado?.grupo?.adicionales?.length) {
              const adicionalPromises = empleado?.grupo?.adicionales?.map(
                (adicional) => {
                  return this.prisma.horas
                    .findFirst({
                      where: {
                        fecha: new Date(e.fecha),
                        empleadoId: empleado.id,
                        adicionalId: adicional.id,
                      },
                    })
                    .then((hora) => {
                      if (hora) {
                        return hora;
                      } else {
                        return this.prisma.horas.create({
                          data: {
                            cantidad: multiplicarHoras(
                              e.horas,
                              +adicional.valor,
                            ),
                            fecha: new Date(e.fecha),
                            empleadoId: empleado.id,
                            adicionalId: adicional.id,
                          },
                        });
                      }
                    });
                },
              );

              return Promise.all(adicionalPromises).then();
            }
          } else {
            return null;
          }
        });
    });

    const result = await Promise.all(promises);

    return result.filter((e) => e).flat();
  }

  async findAll(): Promise<Fichada[]> {
    const rows = await this.prisma.fichada.findMany({
      where: {
        baja: false,
      },
    });

    return rows;
  }

  async findOne(id: number): Promise<Fichada> {
    const row = await this.prisma.fichada.findUnique({
      where: {
        id,
      },
    });

    return row;
  }
}
