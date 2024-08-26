import { Module } from '@nestjs/common';
import { AdicionalController } from './adicional.controller';
import { AdicionalService } from './adicional.service';

@Module({
  imports: [],
  controllers: [AdicionalController],
  providers: [AdicionalService],
})
export class AdicionalModule {}
