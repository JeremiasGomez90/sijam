import axios from "axios";
import { handleError } from "../helpers/ErrorHandler";
import { Referencia } from "@/models/referencia";

const api = "http://localhost:8000/Referencia";

export const createReferencia = async (data: Referencia) => {
  try {
    const res = await axios.post(api, data);
    return res;
  } catch (error) {
    handleError(error);
  }
};

export const getReferencias = async () => {
  try {
    const res = await axios.get(api);
    return res;
  } catch (error) {
    handleError(error);
  }
};

export const bajaReferencia = async (id: number) => {
  try {
    const res = await axios.put(`${api}/unsubscribe/${id}`);
    return res;
  } catch (error) {
    handleError(error);
  }
};