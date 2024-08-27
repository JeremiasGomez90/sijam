import { Novedad } from "./novedad";
import { Referencia } from "./referencia";

export type NovedadReferencia = {
  id?: number;
  novedadId?: number;
  referenciaId?: number;
  novedad?: Novedad;
  referencia?: Referencia
};