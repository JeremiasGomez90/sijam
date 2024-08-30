import { Module } from '@nestjs/common';
import { HorasController } from './Horas.controller';
import { HorasService } from './horas.service';

@Module({
  imports: [],
  controllers: [HorasController],
  providers: [HorasService],
})
export class HorasModule {}
