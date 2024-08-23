import axios from "axios";
import { handleError } from "../helpers/ErrorHandler";
import { Planta } from "@/models/planta";

const api = "http://localhost:8000/planta";

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

export const bajaPlanta = async (id: number) => {
  try {
    const res = await axios.put(`${api}/unsubscribe/${id}`);
    return res;
  } catch (error) {
    handleError(error);
  }
};