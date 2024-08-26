import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AdicionalDto {
  @IsNotEmpty()
  @IsString()
  valor: string;

  @IsNotEmpty()
  @IsString()
  grupoId: number;

  @IsNotEmpty()
  @IsString()
  novedadReferenciaId: number;

  @IsOptional()
  @IsBoolean()
  baja: boolean;
}
