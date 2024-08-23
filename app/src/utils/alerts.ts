import Swal, { SweetAlertOptions } from "sweetalert2";

export async function confirmAlert({ title = "", text = "", icon = "warning" }: SweetAlertOptions) {
  return Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Aceptar",
    cancelButtonText: "Cancelar"
  });
}

export async function successAlert() {
  return Swal.fire({
    title: "Éxito",
    icon: "success",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Aceptar",
  });
}

export async function errorAlert({ text }: { text?: string }) {
  return Swal.fire({
    title: "Error",
    text,
    icon: "error",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Aceptar",
  });
}