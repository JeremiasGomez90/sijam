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
  constructor(private referenciaService: ReferenciaService) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() dto: ReferenciaDto): Promise<Referencia> {
    return this.referenciaService.create(dto);
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Referencia[]> {
    return this.referenciaService.findAll();
  }

  @Put('/unsubscribe/:id')
  @HttpCode(HttpStatus.OK)
  unsubscribe(@Param('id') id: number): Promise<Referencia> {
    return this.referenciaService.unsubscribe(id);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: number): Promise<Referencia> {
    return this.referenciaService.findOne(id);
  }

  @Put('/upload')
  @HttpCode(HttpStatus.OK)
  update(@Body() data: Referencia): Promise<Referencia> {
    return this.referenciaService.update(data);
  }
}
