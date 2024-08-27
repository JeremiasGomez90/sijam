import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ReferenciaDto {
  @IsNotEmpty()
  @IsString()
  codigo: string;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsOptional()
  @IsBoolean()
  baja: boolean;
}
