import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Empleado } from '@prisma/client';
import { EmpleadoDto } from './dto';

@Injectable()
export class EmpleadoService {
  constructor(private prisma: PrismaService) {}
  async create(data: EmpleadoDto): Promise<Empleado> {
    const empleado = await this.prisma.empleado.create({
      data: {
        ...data,
        grupoId: +data.grupoId,
      },
    });

    return empleado;
  }

  async findAll(): Promise<Empleado[]> {
    const empleados = await this.prisma.empleado.findMany({
      where: {
        baja: false,
      },
    });

    return empleados;
  }

  async unsubscribe(id: number): Promise<Empleado> {
    const row = await this.prisma.empleado.findFirst({ where: { id } });
    if (!row) {
      throw new NotFoundException();
    }

    return await this.prisma.empleado.update({
      where: {
        id,
      },
      data: {
        baja: true,
      },
    });
  }

  async findOne(id: number): Promise<Empleado> {
    const row = await this.prisma.empleado.findUnique({
      where: {
        id,
      },
    });

    return row;
  }

  async update(data: Empleado): Promise<Empleado> {
    const { id } = data;
    const row = await this.prisma.empleado.findUnique({ where: { id } });
    if (!row) {
      throw new NotFoundException();
    }

    return await this.prisma.empleado.update({
      where: {
        id,
      },
      data: {
        ...data,
        grupoId: +data.grupoId,
      },
    });
  }
}
