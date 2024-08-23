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
  constructor(private GrupoService: GrupoService) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() dto: GrupoDto): Promise<Grupo> {
    return this.GrupoService.create(dto);
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Grupo[]> {
    return this.GrupoService.findAll();
  }

  @Put('/unsubscribe/:id')
  @HttpCode(HttpStatus.OK)
  unsubscribe(@Param('id') id: number): Promise<Grupo> {
    return this.GrupoService.unsubscribe(id);
  }
}
