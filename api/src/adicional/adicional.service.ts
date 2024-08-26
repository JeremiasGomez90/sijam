import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Adicional } from '@prisma/client';
import { AdicionalDto } from './dto';

@Injectable()
export class AdicionalService {
  constructor(private prisma: PrismaService) {}
  async create(data: AdicionalDto): Promise<Adicional> {
    const row = await this.prisma.adicional.create({
      data,
    });

    return row;
  }

  async findAll(): Promise<Adicional[]> {
    const rows = await this.prisma.adicional.findMany({
      where: {
        baja: false,
      },
    });

    return rows;
  }

  async unsubscribe(id: number): Promise<Adicional> {
    const row = await this.prisma.adicional.findFirst({ where: { id } });
    if (!row) {
      throw new NotFoundException();
    }

    return await this.prisma.adicional.update({
      where: {
        id,
      },
      data: {
        baja: true,
      },
    });
  }

  async findOne(id: number): Promise<Adicional> {
    const row = await this.prisma.adicional.findUnique({
      where: {
        id,
      },
    });

    return row;
  }

  async update(data: Adicional): Promise<Adicional> {
    const { id } = data;
    const row = await this.prisma.adicional.findUnique({ where: { id } });
    if (!row) {
      throw new NotFoundException();
    }

    return await this.prisma.adicional.update({
      where: {
        id,
      },
      data,
    });
  }
}
