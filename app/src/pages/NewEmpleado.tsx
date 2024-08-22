import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { createEmpleado } from "@/services/empleadoService";

type Inputs = {
  numero: string;
  cuit: string;
  nombre: string;
  apellido: string;
  telefono: string;
  direccion: string;
}

export default function NewEmpleado() {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(
      z.object({
        numero: z.string().min(1, { message: "aca podes poner algun mensaje de error" }).max(50),
        cuit: z.string().min(1).max(11),
        nombre: z.string().min(1).max(50),
        apellido: z.string().min(1).max(50),
        telefono: z.string().min(1).max(50),
        direccion: z.string().min(1).max(50),
        // planta: z.string().min(1).max(50),
      }),
    ),
    defaultValues: {
      numero: '',
      cuit: '',
      nombre: '',
      apellido: '',
      telefono: '',
      direccion: '',
    }
  });

  const onSubmit: SubmitHandler<Inputs>  = async (data) => {
    const res = await createEmpleado(data);
    console.log(res);
  }
  
  return (
    <div className="h-full p-4">
      <div className="flex items-center gap-4 border-b mb-3 pb-3">
        <Button variant="outline" onClick={() => navigate("/empleados")}>
          <ChevronLeft className="h-6 w-6"/>
          <span className="text-sm font-semibold">Volver</span>
        </Button>
        <h1 className="text-xl font-bold">Agregar Nuevo Empleado</h1>
      </div>
      <Form {...form}>
        <form className="flex flex-col gap-4 max-w-[500px]" onSubmit={form.handleSubmit(onSubmit)}>
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
          {/* <div className="space-y-2">
            <FormField
              control={form.control}
              name="planta"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Planta</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una planta" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="m@example.com">m@example.com</SelectItem>
                      <SelectItem value="m@google.com">m@google.com</SelectItem>
                      <SelectItem value="m@support.com">m@support.com</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div> */}
          <Button variant="default" className="w-full" type="submit" disabled={Object.entries(form.formState.errors).length > 0}>
            <span className="text-sm font-semibold">Guardar</span>
          </Button>
        </form>
      </Form>
    </div>
  );
}
