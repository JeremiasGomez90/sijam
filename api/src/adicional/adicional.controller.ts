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
import { AdicionalService } from './adicional.service';
import { AdicionalDto } from './dto';
import { Adicional } from '@prisma/client';

@Controller('Adicional')
export class AdicionalController {
  constructor(private adicionalService: AdicionalService) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() dto: AdicionalDto): Promise<Adicional> {
    return this.adicionalService.create(dto);
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Adicional[]> {
    return this.adicionalService.findAll();
  }

  @Put('/unsubscribe/:id')
  @HttpCode(HttpStatus.OK)
  unsubscribe(@Param('id') id: number): Promise<Adicional> {
    return this.adicionalService.unsubscribe(id);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: number): Promise<Adicional> {
    return this.adicionalService.findOne(id);
  }

  @Put('/upload')
  @HttpCode(HttpStatus.OK)
  update(@Body() data: Adicional): Promise<Adicional> {
    return this.adicionalService.update(data);
  }
}
