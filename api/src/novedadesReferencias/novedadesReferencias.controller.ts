import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { NovedadesReferencias } from '@prisma/client';
import { NovedadesReferenciasService } from './novedadesReferencias.service';

@Controller('novedades-referencias')
export class NovedadesReferenciasController {
  constructor(
    private novedadesReferenciasService: NovedadesReferenciasService,
  ) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<NovedadesReferencias[]> {
    return this.novedadesReferenciasService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: number): Promise<NovedadesReferencias> {
    return this.novedadesReferenciasService.findOne(id);
  }
}
