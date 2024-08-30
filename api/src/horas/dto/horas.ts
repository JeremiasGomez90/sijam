import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class HorasDto {
  @IsOptional()
  @IsString()
  cantidad: string;

  @IsOptional()
  @IsString()
  empleadoId: string;

  @IsOptional()
  @IsString()
  adicionalId: string;

  @IsOptional()
  @IsString()
  fecha: Date;

  @IsOptional()
  @IsBoolean()
  baja: boolean;
}
