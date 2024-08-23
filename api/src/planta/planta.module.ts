import { Module } from '@nestjs/common';
import { PlantaController } from './planta.controller';
import { PlantaService } from './planta.service';

@Module({
  imports: [],
  controllers: [PlantaController],
  providers: [PlantaService],
})
export class PlantaModule {}
