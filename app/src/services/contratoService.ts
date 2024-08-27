import axios from "@/api/axios";
import { handleError } from "../helpers/ErrorHandler";
import { Contrato } from "@/models/contrato";

const api = "/contrato";

export const createContrato = async (data: Contrato) => {
  try {
    const res = await axios.post(api, data);
    return res;
  } catch (error) {
    handleError(error);
  }
};

export const getContratos = async () => {
  try {
    const res = await axios.get(api);
    return res;
  } catch (error) {
    handleError(error);
  }
};

export const bajaContrato = async (id: number) => {
  try {
    const res = await axios.put(`${api}/unsubscribe/${id}`);
    return res;
  } catch (error) {
    handleError(error);
  }
};


export const getContrato = async (id: string) => {
  try {
    const res = await axios.get(`${api}/${id}`);
    return res;
  } catch (error) {
    handleError(error);
  }
};

export const updateContrato = async (data: Contrato) => {
  try {
    const res = await axios.put(`${api}/upload`, data);
    return res;
  } catch (error) {
    handleError(error);
  }
};