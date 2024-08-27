import axios from "@/api/axios";
import { handleError } from "../helpers/ErrorHandler";
import { Planta } from "@/models/planta";

const api = "/planta";

export const createPlanta = async (data: Planta) => {
  try {
    const res = await axios.post(api, data);
    return res;
  } catch (error) {
    handleError(error);
  }
};

export const getPlantas = async () => {
  try {
    const res = await axios.get(api);
    return res;
  } catch (error) {
    handleError(error);
  }
};

export const bajaPlanta = async (id: number | string) => {
  try {
    const res = await axios.put(`${api}/unsubscribe/${id}`);
    return res;
  } catch (error) {
    handleError(error);
  }
};

export const getPlanta = async (id: string) => {
  try {
    const res = await axios.get(`${api}/${id}`);
    return res;
  } catch (error) {
    handleError(error);
  }
};

export const updatePlanta = async (data: Planta) => {
  try {
    const res = await axios.put(`${api}/upload`, data);
    return res;
  } catch (error) {
    handleError(error);
  }
};