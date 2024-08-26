import axios from "axios";
import { handleError } from "../helpers/ErrorHandler";
import { Referencia } from "@/models/referencia";

const api = "http://localhost:8000/referencia";

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

export const getReferencia = async (id: string) => {
  try {
    const res = await axios.get(`${api}/${id}`);
    return res;
  } catch (error) {
    handleError(error);
  }
};

export const updateReferencia = async (data: Referencia) => {
  try {
    const res = await axios.put(`${api}/upload`, data);
    return res;
  } catch (error) {
    handleError(error);
  }
};