import axios from "axios";
import { handleError } from "../helpers/ErrorHandler";
import { UserProfileToken } from "../models/user";

const api = "http://localhost:8000/auth/";

export const loginAPI = async ({ email, password }: { email: string, password: string}) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "login", {
      email,
      password,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const logoutAPI = async () => {
  try {
    return await axios.post(api + "logout");
  } catch (error) {
    handleError(error);
  }
};

// export const registerAPI = async (
//   email: string,
//   username: string,
//   password: string
// ) => {
//   try {
//     const data = await axios.post<UserProfileToken>(api + "account/register", {
//       email: email,
//       username: username,
//       password: password,
//     });
//     return data;
//   } catch (error) {
//     handleError(error);
//   }
// };