import axios from "axios";
import { toast } from "react-toastify";

export const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    console.log("entro aca")
    var err = error.response;
    console.log(err)
    if (Array.isArray(err?.data.errors)) {
      for (let val of err?.data.errors) {
        toast.warning(val.description);
      }
    } else if (typeof err?.data.errors === "object") {
      for (let e in err?.data.errors) {
        toast.warning(err.data.errors[e][0]);
      }
    } else if (err?.data.message) {
      toast.error(err.data.message);
    } else if (err?.status == 401) {
      toast.error("Please login");
      window.history.pushState({}, "LoginPage", "/login");
    } else if (err?.status == 400) {
      toast.error("Error de servidor");
    }

    console.log("salio aca")
  }
};