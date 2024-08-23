import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
import { createPlanta } from "@/services/plantaService";

type Inputs = {
  nombre: string;
};

export default function NewPlanta() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(
      z.object({
        nombre: z.string().min(1).max(50),
      })
    ),
    defaultValues: {
      nombre: "",
      test: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await createPlanta(data);
      toast({ description: "Planta creada correctamente" });
      navigate("/plantas");
    } catch (error) {
      toast({
        description: "Hubo un error al crear el empleado",
        variant: "destructive",
      });
    }
  };

  const fields: { label: string, name: "nombre" }[] = [
    {
      label: "Nombre",
      name: "nombre",
    },
  ];

  return (
    <div className="h-full p-4">
      <div className="flex items-center gap-4 border-b mb-3 pb-3">
        <Button variant="outline" onClick={() => navigate("/plantas")}>
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
          {fields.map((e) => (
            <div key={e.name} className="space-y-2">
              <FormField
                control={form.control}
                name={e.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{e.label}</FormLabel>
                    <FormControl>
                      <Input placeholder={e.label} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          ))}

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
