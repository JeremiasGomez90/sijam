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
import { PlantaService } from './planta.service';
import { PlantaDto } from './dto';
import { Planta } from '@prisma/client';

@Controller('planta')
export class PlantaController {
  constructor(private plantaService: PlantaService) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() dto: PlantaDto): Promise<Planta> {
    return this.plantaService.create(dto);
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Planta[]> {
    return this.plantaService.findAll();
  }

  @Put('/unsubscribe/:id')
  @HttpCode(HttpStatus.OK)
  unsubscribe(@Param('id') id: number): Promise<Planta> {
    return this.plantaService.unsubscribe(id);
  }
}
