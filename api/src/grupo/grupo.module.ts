import { Module } from '@nestjs/common';
import { GrupoController } from './grupo.controller';
import { GrupoService } from './grupo.service';

@Module({
  imports: [],
  controllers: [GrupoController],
  providers: [GrupoService],
})
export class GrupoModule {}
