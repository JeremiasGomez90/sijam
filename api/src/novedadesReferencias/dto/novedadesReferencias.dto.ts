import { IsNotEmpty, IsNumber } from 'class-validator';

export class NovedadesReferenciasDto {
  @IsNotEmpty()
  @IsNumber()
  novedadId: number;

  @IsNotEmpty()
  @IsNumber()
  referenciaId: number;
}
