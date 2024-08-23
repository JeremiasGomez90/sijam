import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ContratoDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  plantaId: number;

  @IsOptional()
  @IsBoolean()
  baja: boolean;
}
