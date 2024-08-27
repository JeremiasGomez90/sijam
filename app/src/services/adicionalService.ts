import axios from "@/api/axios";
import { handleError } from "../helpers/ErrorHandler";
import { Adicional } from "@/models/adicional";

const api = "/adicional";

export const createAdicional = async (data: Adicional) => {
  try {
    const res = await axios.post(api, data);
    return res;
  } catch (error) {
    handleError(error);
  }
};

export const getAdicionales = async () => {
  try {
    const res = await axios.get(api);
    return res;
  } catch (error) {
    handleError(error);
  }
};

export const bajaAdicional = async (id: number) => {
  try {
    const res = await axios.put(`${api}/unsubscribe/${id}`);
    return res;
  } catch (error) {
    handleError(error);
  }
};

export const getAdicional = async (id: string) => {
  try {
    const res = await axios.get(`${api}/${id}`);
    return res;
  } catch (error) {
    handleError(error);
  }
};

export const updateAdicional = async (data: Adicional) => {
  try {
    const res = await axios.put(`${api}/upload`, data);
    return res;
  } catch (error) {
    handleError(error);
  }
};