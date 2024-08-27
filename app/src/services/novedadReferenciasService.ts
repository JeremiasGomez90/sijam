import axios from "@/api/axios";
import { handleError } from "../helpers/ErrorHandler";

const api = "/novedades-referencias";

export const getNovedadesReferencias = async () => {
  try {
    const res = await axios.get(api);
    return res;
  } catch (error) {
    handleError(error);
  }
};

export const getNovedadReferencia = async (id: string) => {
  try {
    const res = await axios.get(`${api}/${id}`);
    return res;
  } catch (error) {
    handleError(error);
  }
};