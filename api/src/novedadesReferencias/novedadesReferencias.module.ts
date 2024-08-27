import { Module } from '@nestjs/common';
import { NovedadesReferenciasService } from './novedadesReferencias.service';
import { NovedadesReferenciasController } from './novedadesReferencias.controller';

@Module({
  imports: [],
  controllers: [NovedadesReferenciasController],
  providers: [NovedadesReferenciasService],
})
export class NovedadesReferenciasModule {}
