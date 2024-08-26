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
import { EmpleadoService } from './empleado.service';
import { EmpleadoDto } from './dto';
import { Empleado } from '@prisma/client';

@Controller('empleado')
export class EmpleadoController {
  constructor(private empleadoService: EmpleadoService) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() dto: EmpleadoDto): Promise<Empleado> {
    return this.empleadoService.create(dto);
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Empleado[]> {
    return this.empleadoService.findAll();
  }

  @Put('/unsubscribe/:id')
  @HttpCode(HttpStatus.OK)
  unsubscribe(@Param('id') id: number): Promise<Empleado> {
    return this.empleadoService.unsubscribe(id);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: number): Promise<Empleado> {
    return this.empleadoService.findOne(id);
  }

  @Put('/upload')
  @HttpCode(HttpStatus.OK)
  update(@Body() data: Empleado): Promise<Empleado> {
    return this.empleadoService.update(data);
  }
}
