import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FichadaService } from './fichada.service';
import { Fichada } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('fichada')
export class FichadaController {
  constructor(private fichadaService: FichadaService) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('file'))
  register(@UploadedFile() file, @Body() body) {
    return this.fichadaService.create(body, file);
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Fichada[]> {
    return this.fichadaService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: number): Promise<Fichada> {
    return this.fichadaService.findOne(id);
  }
}
