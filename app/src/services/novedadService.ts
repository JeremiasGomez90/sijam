import axios from "axios";
import { handleError } from "../helpers/ErrorHandler";
import { Novedad } from "@/models/novedad";

const api = "http://localhost:8000/novedad";

export const createNovedad = async (data: Novedad) => {
  try {
    const res = await axios.post(api, data);
    return res;
  } catch (error) {
    handleError(error);
  }
};

export const getNovedades = async () => {
  try {
    const res = await axios.get(api);
    return res;
  } catch (error) {
    handleError(error);
  }
};

export const bajaNovedad = async (id: number) => {
  try {
    const res = await axios.put(`${api}/unsubscribe/${id}`);
    return res;
  } catch (error) {
    handleError(error);
  }
};