import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";

// Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { createEmpleado } from "@/services/empleadoService";
import { useEffect, useMemo, useState } from "react";
import { getGrupos } from "@/services/grupoService";
import { Grupo } from "@/models/grupo";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Inputs = {
  numero: string;
  cuit: string;
  nombre: string;
  apellido: string;
  telefono: string;
  direccion: string;
  grupoId: string;
}

export default function NewEmpleado() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [grupos, setGrupos] = useState([]);

  const form = useForm({
    resolver: zodResolver(
      z.object({
        numero: z.string().min(1, { message: "aca podes poner algun mensaje de error" }).max(50),
        cuit: z.string().min(1).max(11),
        nombre: z.string().min(1).max(50),
        apellido: z.string().min(1).max(50),
        telefono: z.string().min(1).max(50),
        direccion: z.string(),
        grupoId: z.string(),
      }),
    ),
    defaultValues: {
      numero: '',
      cuit: '',
      nombre: '',
      apellido: '',
      telefono: '',
      direccion: '',
      grupoId: '',
    }
  });

  useEffect(() => {
    getGrupos().then((res) => {
      if (res?.data)
        setGrupos(
          res?.data.map((e: Grupo) => {
            return {
              ...e,
              label: e.nombre,
              value: e.id,
            };
          })
        );
    });
  }, []);
  
  const onSubmit: SubmitHandler<Inputs>  = async (data) => {
    try {
      await createEmpleado(data);
      toast({ description: "Empleado creado correctamente" });
      navigate("/empleados");
    } catch (error) {
      toast({ description: "Hubo un error al crear el empleado", variant: "destructive" });
    }
  }
  
  const fields: {
    label: string;
    name: "numero" | "cuit" | "nombre" | "apellido" | "telefono" | "direccion" | "grupoId";
    type?: string;
    options?: { label: string; value: string }[];
  }[] = useMemo(
    () => [
      {
        label: "Numero Empleado",
        name: "numero",      
      },
      {
        label: "C.U.I.T",
        name: "cuit",      
      },
      {
        label: "Nombre",
        name: "nombre",      
      },
      {
        label: "Apellido",
        name: "apellido",      
      },
      {
        label: "Telefono",
        name: "telefono",      
      },
      {
        label: "Dirección",
        name: "direccion",      
      },
      {
        label: "Grupo",
        name: "grupoId",
        type: "select",
        options: grupos,
      }
    ],
    [grupos]
  );

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
        {fields.map((e) => {
            if (e.type === "select") {
              return (
                <div key={e.name} className="space-y-2">
                  <FormField
                    control={form.control}
                    name={e.name}
                    render={({ field }) => {
                      const value = e.options?.find(a => field.value && +a.value === +field.value);

                      return (
                        <FormItem>
                          <FormLabel>{e.label}</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                              name={field.name}
                              required
                            >
                              <SelectTrigger>
                                <SelectValue
                                  onBlur={field.onBlur}
                                  ref={field.ref}
                                >
                                   {value?.label || field.value}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {e.options?.map((o, i) => {
                                    return (
                                      <SelectItem
                                        key={`${e.name}-option-${i}`}
                                        value={o.value}
                                      >
                                        {o.label}
                                      </SelectItem>
                                    );
                                  })}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </div>
              );
            } else {
              return (
                <div key={e.name} className="space-y-2">
                  <FormField
                    control={form.control}
                    name={e.name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{e.label}</FormLabel>
                        <FormControl>
                          <Input placeholder={e.label} type={e.type} {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              );
            }
          })}
          <Button variant="default" className="w-full" type="submit" disabled={Object.entries(form.formState.errors).length > 0}>
            <span className="text-sm font-semibold">Guardar</span>
          </Button>
        </form>
      </Form>
    </div>
  );
}
