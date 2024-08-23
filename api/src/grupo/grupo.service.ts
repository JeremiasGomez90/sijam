import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Grupo } from '@prisma/client';
import { GrupoDto } from './dto';

@Injectable()
export class GrupoService {
  constructor(private prisma: PrismaService) {}
  async create(dto: GrupoDto): Promise<Grupo> {
    const row = await this.prisma.grupo.create({
      data: {
        nombre: dto.nombre,
        contratoId: +dto.contratoId,
      },
    });

    return row;
  }

  async findAll(): Promise<Grupo[]> {
    const rows = await this.prisma.grupo.findMany({
      where: {
        baja: false,
      },
    });

    return rows;
  }

  async unsubscribe(id: number): Promise<Grupo> {
    const row = await this.prisma.grupo.findFirst({ where: { id } });
    if (!row) {
      throw new NotFoundException();
    }

    return await this.prisma.grupo.update({
      where: {
        id,
      },
      data: {
        baja: true,
      },
    });
  }
}
