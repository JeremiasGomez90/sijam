import { Module } from '@nestjs/common';
import { NovedadController } from './novedad.controller';
import { NovedadService } from './novedad.service';

@Module({
  imports: [],
  controllers: [NovedadController],
  providers: [NovedadService],
})
export class NovedadModule {}
