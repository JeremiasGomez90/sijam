import axios from "@/api/axios";
import { useToast } from "@/components/ui/use-toast";

export const handleError = (error: any) => {
  const { toast } = useToast();
  if (axios.isAxiosError(error)) {
    var err = error.response;
    if (Array.isArray(err?.data.errors)) {
      for (let val of err?.data.errors) {
        toast({ description: val.description });
      }
    } else if (typeof err?.data.errors === "object") {
      for (let e in err?.data.errors) {
        toast({ description: err.data.errors[e][0] });
      }
    } else if (err?.data.message) {
      toast({ description: err.data.message, variant: 'destructive' });
    } else if (err?.status == 401) {
      toast({ description: 'Please login', variant: 'destructive' });
      window.history.pushState({}, "LoginPage", "/login");
    } else if (err?.status == 400) {
      toast({ description: 'Error de servidor', variant: 'destructive' });
    }
  }
};