import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Referencia } from '@prisma/client';
import { ReferenciaDto } from './dto';

@Injectable()
export class ReferenciaService {
  constructor(private prisma: PrismaService) {}
  async create(dto: ReferenciaDto): Promise<Referencia> {
    const row = await this.prisma.referencia.create({
      data: dto,
    });

    return row;
  }

  async findAll(): Promise<Referencia[]> {
    const rows = await this.prisma.referencia.findMany({
      where: {
        baja: false,
      },
    });

    return rows;
  }

  async unsubscribe(id: number): Promise<Referencia> {
    const row = await this.prisma.referencia.findFirst({ where: { id } });
    if (!row) {
      throw new NotFoundException();
    }

    return await this.prisma.referencia.update({
      where: {
        id,
      },
      data: {
        baja: true,
      },
    });
  }

  async findOne(id: number): Promise<Referencia> {
    const row = await this.prisma.referencia.findUnique({
      where: {
        id,
      },
    });

    return row;
  }

  async update(data: Referencia): Promise<Referencia> {
    const { id } = data;
    const row = await this.prisma.referencia.findUnique({ where: { id } });
    if (!row) {
      throw new NotFoundException();
    }

    return await this.prisma.referencia.update({
      where: {
        id,
      },
      data,
    });
  }
}
