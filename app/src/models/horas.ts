import { ReactNode } from "react";

export type Horas = {
  id?: number;
  cantidad?: string | number;
  fecha: string | Date;
  empleadoId?: number;
  adicionalId?: number;
};

export type HorasAdicionales = {
  id?: number;
  cantidad?: string | number;
  fecha: string;
  empleadoNombre?: string;
  empleadoApellido?: string;
  novedad?: string;
  title?: string;
  key?: string;
  render?: ReactNode;
  dias?: {
    id?: number;
    cantidad?: string | number;
    fecha: string;
    empleadoNombre?: string;
    empleadoApellido?: string;
    novedad?: string;
    title?: string;
    key?: string;
    render?: ReactNode;
  }[]
};