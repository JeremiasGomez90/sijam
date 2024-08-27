import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";

// Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useEffect, useMemo, useState } from "react";
import { Empleado } from "@/models/empleado";
import { getEmpleado, updateEmpleado } from "@/services/empleadoService";
import { confirmAlert } from "@/utils/alerts";

type Inputs = {
  numero: string;
  cuit: string;
  nombre: string;
  apellido: string;
  telefono: string;
  direccion: string;
};

export default function EditEmpleado() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const params = useParams();
  const [values, setValues] = useState<Empleado>();

  useEffect(() => {
    if (params?.id) {
      getEmpleado(params?.id).then((res) => {
        if (res?.data) {
          setValues(res.data);
        }
      });
    }
  }, [params.id]);

  const form = useForm({
    resolver: zodResolver(
      z.object({
        numero: z
          .string()
          .min(1, { message: "aca podes poner algun mensaje de error" })
          .max(50),
        cuit: z.string().min(1).max(11),
        nombre: z.string().min(1).max(50),
        apellido: z.string().min(1).max(50),
        telefono: z.string().min(1).max(50),
        direccion: z.string().min(1).max(50),
      })
    ),
    defaultValues: {
      numero: '',
      cuit: '',
      nombre: '',
      apellido: '',
      telefono: '',
      direccion: '',
    },
    values: useMemo(() => {
      return values;
    }, [values]),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const alert = await confirmAlert({
        title: "Guardar cambios?",
      });

      if (alert.isConfirmed) {
        if (values) {
          await updateEmpleado({
            id: values.id,
            ...data,
          });

          toast({ description: "Empleado modificado correctamente" });
          navigate("/empleados");
        }
      }
    } catch (error) {
      toast({
        description: "Hubo un error al modificar el empleado",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="h-full p-4">
      <div className="flex items-center gap-4 border-b mb-3 pb-3">
        <Button variant="outline" onClick={() => navigate("/empleados")}>
          <ChevronLeft className="h-6 w-6" />
          <span className="text-sm font-semibold">Volver</span>
        </Button>
        <h1 className="text-xl font-bold">Agregar Nuevo Empleado</h1>
      </div>
      <Form {...form}>
        <form
          className="flex flex-col gap-4 max-w-[500px]"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="numero"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numero Empleado</FormLabel>
                  <FormControl>
                    <Input placeholder="Numero empleado" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="cuit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>C.U.I.T</FormLabel>
                  <FormControl>
                    <Input placeholder="C.U.I.T" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="apellido"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <Input placeholder="Apellido" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="telefono"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefono</FormLabel>
                  <FormControl>
                    <Input placeholder="Telefono" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="direccion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Direccion</FormLabel>
                  <FormControl>
                    <Input placeholder="Direccion" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button
            variant="default"
            className="w-full"
            type="submit"
            disabled={Object.entries(form.formState.errors).length > 0}
          >
            <span className="text-sm font-semibold">Guardar</span>
          </Button>
        </form>
      </Form>
    </div>
  );
}
