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
import { createNovedad } from "@/services/novedadService";
import { Textarea } from "@/components/ui/textarea";

type Inputs = {
  codigo: string;
  nombre: string;
  descripcion: string;
};

export default function NewNovedad() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(
      z.object({
        codigo: z.string(),
        nombre: z.string(),
        descripcion: z.string(),
      })
    ),
    defaultValues: {
      codigo: "",
      nombre: "",
      descripcion: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await createNovedad(data);
      toast({ description: "Novedad creada correctamente" });
      navigate("/novedades");
    } catch (error) {
      toast({
        description: "Hubo un error al crear la novedad",
        variant: "destructive",
      });
    }
  };

  const fields: { label: string; name: "codigo" | "nombre" | "descripcion", type?: string; }[] =
    [
      {
        label: "Codigo",
        name: "codigo",
      },
      {
        label: "Nombre",
        name: "nombre",
      },
      {
        label: "Descripción",
        name: "descripcion",
        type: "textarea"
      },
    ];

  return (
    <div className="h-full p-4">
      <div className="flex items-center gap-4 border-b mb-3 pb-3">
        <Button variant="outline" onClick={() => navigate("/novedades")}>
          <ChevronLeft className="h-6 w-6" />
          <span className="text-sm font-semibold">Volver</span>
        </Button>
        <h1 className="text-xl font-bold">Agregar Nuevo Novedad</h1>
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
                     {e.type === "textarea" ? <Textarea placeholder={e.label} {...field} /> : <Input placeholder={e.label} {...field} />}
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
