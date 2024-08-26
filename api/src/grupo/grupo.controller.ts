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
import { GrupoService } from './grupo.service';
import { GrupoDto } from './dto';
import { Grupo } from '@prisma/client';

@Controller('grupo')
export class GrupoController {
  constructor(private grupoService: GrupoService) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() dto: GrupoDto): Promise<Grupo> {
    return this.grupoService.create(dto);
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Grupo[]> {
    return this.grupoService.findAll();
  }

  @Put('/unsubscribe/:id')
  @HttpCode(HttpStatus.OK)
  unsubscribe(@Param('id') id: number): Promise<Grupo> {
    return this.grupoService.unsubscribe(id);
  }
  
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: number): Promise<Grupo> {
    return this.grupoService.findOne(id);
  }

  @Put('/upload')
  @HttpCode(HttpStatus.OK)
  update(@Body() data: Grupo): Promise<Grupo> {
    return this.grupoService.update(data);
  }
}
