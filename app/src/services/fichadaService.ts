import axios from "@/api/axios";
import { handleError } from "../helpers/ErrorHandler";

const api = "/fichada";

export const uploadFichada = async (data: FormData) => {
  try {
    const res = await axios.post(api, data);
    console.log({ data })
    return res;
  } catch (error) {
    handleError(error);
  }
};