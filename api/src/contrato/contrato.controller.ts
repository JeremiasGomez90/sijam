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
import { ContratoService } from './contrato.service';
import { ContratoDto } from './dto';
import { Contrato } from '@prisma/client';

@Controller('contrato')
export class ContratoController {
  constructor(private contratoService: ContratoService) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() dto: ContratoDto): Promise<Contrato> {
    return this.contratoService.create(dto);
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Contrato[]> {
    return this.contratoService.findAll();
  }

  @Put('/unsubscribe/:id')
  @HttpCode(HttpStatus.OK)
  unsubscribe(@Param('id') id: number): Promise<Contrato> {
    return this.contratoService.unsubscribe(id);
  }
}
