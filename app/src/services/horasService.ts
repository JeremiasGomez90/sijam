import axios from "@/api/axios";
import { handleError } from "../helpers/ErrorHandler";

const api = "/horas";

export const buscarHoras = async (data: {
  fecha?: string;
  empleadoId?: number | string;
  ids?: number[];
}) => {
  try {
    const res = await axios.post(api, data);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};
