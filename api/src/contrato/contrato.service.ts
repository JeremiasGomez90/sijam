import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Contrato } from '@prisma/client';
import { ContratoDto } from './dto';

@Injectable()
export class ContratoService {
  constructor(private prisma: PrismaService) {}
  async create(dto: ContratoDto): Promise<Contrato> {
    const row = await this.prisma.contrato.create({
      data: {
        nombre: dto.nombre,
        plantaId: +dto.plantaId,
      },
    });

    return row;
  }

  async findAll(): Promise<Contrato[]> {
    const rows = await this.prisma.contrato.findMany({
      where: {
        baja: false,
      },
      include: {
        planta: true,
      },
    });

    return rows;
  }

  async unsubscribe(id: number): Promise<Contrato> {
    const row = await this.prisma.contrato.findFirst({ where: { id } });
    if (!row) {
      throw new NotFoundException();
    }

    return await this.prisma.contrato.update({
      where: {
        id,
      },
      data: {
        baja: true,
      },
    });
  }
}
