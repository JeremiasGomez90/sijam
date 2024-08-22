import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EmpleadoDto {
  @IsNotEmpty()
  @IsString()
  numero: string;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  apellido: string;

  @IsNotEmpty()
  @IsString()
  telefono: string;

  direccion: string;

  @IsOptional()
  @IsString()
  plantaId: number;
}
