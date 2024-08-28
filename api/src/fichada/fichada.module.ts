import { Module } from '@nestjs/common';
import { FichadaController } from './fichada.controller';
import { FichadaService } from './fichada.service';

@Module({
  imports: [],
  controllers: [FichadaController],
  providers: [FichadaService],
})
export class FichadaModule {}
