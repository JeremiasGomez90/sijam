import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Novedad } from '@prisma/client';
import { NovedadDto } from './dto';

@Injectable()
export class NovedadService {
  constructor(private prisma: PrismaService) {}
  async create(dto: NovedadDto): Promise<Novedad> {
    const row = await this.prisma.novedad.create({
      data: dto,
    });

    return row;
  }

  async findAll(): Promise<Novedad[]> {
    const rows = await this.prisma.novedad.findMany({
      where: {
        baja: false,
      },
    });

    return rows;
  }

  async unsubscribe(id: number): Promise<Novedad> {
    const row = await this.prisma.novedad.findFirst({ where: { id } });
    if (!row) {
      throw new NotFoundException();
    }

    return await this.prisma.novedad.update({
      where: {
        id,
      },
      data: {
        baja: true,
      },
    });
  }

  async findOne(id: number): Promise<Novedad> {
    const row = await this.prisma.novedad.findUnique({
      where: {
        id,
      },
    });

    return row;
  }

  async update(data: Novedad): Promise<Novedad> {
    const { id } = data;
    const row = await this.prisma.novedad.findUnique({ where: { id } });
    if (!row) {
      throw new NotFoundException();
    }

    return await this.prisma.novedad.update({
      where: {
        id,
      },
      data,
    });
  }
}
