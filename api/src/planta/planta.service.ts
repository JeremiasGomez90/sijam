import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Planta } from '@prisma/client';
import { PlantaDto } from './dto';

@Injectable()
export class PlantaService {
  constructor(private prisma: PrismaService) {}
  async create(dto: PlantaDto): Promise<Planta> {
    const row = await this.prisma.planta.create({
      data: dto,
    });

    return row;
  }

  async findAll(): Promise<Planta[]> {
    const rows = await this.prisma.planta.findMany({
      where: {
        baja: false,
      },
    });

    return rows;
  }

  async unsubscribe(id: number): Promise<Planta> {
    const row = await this.prisma.planta.findFirst({ where: { id } });
    if (!row) {
      throw new NotFoundException();
    }

    return await this.prisma.planta.update({
      where: {
        id,
      },
      data: {
        baja: true,
      },
    });
  }
}
