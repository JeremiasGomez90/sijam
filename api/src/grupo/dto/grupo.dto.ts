import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GrupoDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  contratoId: number;

  @IsOptional()
  @IsBoolean()
  baja: boolean;
}
