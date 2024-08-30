import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { HorasService } from './horas.service';
import { Horas } from '@prisma/client';

@Controller('horas')
export class HorasController {
  constructor(private horasService: HorasService) {}

  @Post('')
  @HttpCode(HttpStatus.OK)
  findAll(@Body() body): Promise<Horas[]> {
    return this.horasService.findAll(body);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: number): Promise<Horas> {
    return this.horasService.findOne(id);
  }
}
