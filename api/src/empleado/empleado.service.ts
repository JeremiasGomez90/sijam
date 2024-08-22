import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Empleado } from '@prisma/client';
import { EmpleadoDto } from './dto';

@Injectable()
export class EmpleadoService {
  constructor(private prisma: PrismaService) {}
  async create(dto: EmpleadoDto): Promise<Empleado> {
    console.log({ dto });
    const empleado = await this.prisma.empleado.create({
      data: dto,
    });

    return empleado;
  }

  async findAll(): Promise<Empleado[]> {
    const empleados = await this.prisma.empleado.findMany();

    return empleados;
  }
}
