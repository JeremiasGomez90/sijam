import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PlantaDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  locacion: string;

  @IsOptional()
  @IsBoolean()
  baja: boolean;
}
