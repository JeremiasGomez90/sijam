import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NovedadesReferencias } from '@prisma/client';

@Injectable()
export class NovedadesReferenciasService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<NovedadesReferencias[]> {
    const rows = await this.prisma.novedadesReferencias.findMany({
      include: {
        novedad: true,
        referencia: true,
      },
    });

    return rows;
  }

  async findOne(id: number): Promise<NovedadesReferencias> {
    const row = await this.prisma.novedadesReferencias.findUnique({
      include: {
        novedad: true,
        referencia: true,
      },
      where: {
        id,
      },
    });

    return row;
  }
}
