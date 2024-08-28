import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class FichadaDto {
  @IsOptional()
  @IsString()
  plantaId: string;

  @IsOptional()
  @IsString()
  nombre_archivo: string;

  @IsOptional()
  @IsString()
  fecha_subida: Date;

  @IsOptional()
  @IsBoolean()
  baja: boolean;
}
