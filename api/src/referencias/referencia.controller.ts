import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ReferenciaService } from './referencia.service';
import { ReferenciaDto } from './dto';
import { Referencia } from '@prisma/client';

@Controller('referencia')
export class ReferenciaController {
  constructor(private ReferenciaService: ReferenciaService) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() dto: ReferenciaDto): Promise<Referencia> {
    return this.ReferenciaService.create(dto);
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Referencia[]> {
    return this.ReferenciaService.findAll();
  }

  @Put('/unsubscribe/:id')
  @HttpCode(HttpStatus.OK)
  unsubscribe(@Param('id') id: number): Promise<Referencia> {
    return this.ReferenciaService.unsubscribe(id);
  }
}
