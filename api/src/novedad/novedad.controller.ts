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
import { NovedadService } from './novedad.service';
import { NovedadDto } from './dto';
import { Novedad } from '@prisma/client';

@Controller('novedad')
export class NovedadController {
  constructor(private novedadService: NovedadService) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() dto: NovedadDto): Promise<Novedad> {
    return this.novedadService.create(dto);
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Novedad[]> {
    return this.novedadService.findAll();
  }

  @Put('/unsubscribe/:id')
  @HttpCode(HttpStatus.OK)
  unsubscribe(@Param('id') id: number): Promise<Novedad> {
    return this.novedadService.unsubscribe(id);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: number): Promise<Novedad> {
    return this.novedadService.findOne(id);
  }

  @Put('/upload')
  @HttpCode(HttpStatus.OK)
  update(@Body() data: Novedad): Promise<Novedad> {
    return this.novedadService.update(data);
  }
}
