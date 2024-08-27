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
import { createGrupo } from "@/services/grupoService";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useMemo, useState } from "react";
import { getContratos } from "@/services/contratoService";
import { Contrato } from "@/models/contrato";

type Inputs = {
  nombre: string;
};

export default function NewGrupo() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(
      z.object({
        nombre: z.string().min(1).max(50),
        contratoId: z.string(),
      })
    ),
    defaultValues: {
      nombre: "",
      contratoId: "",
    },
  });

  const [contratos, setContratos] = useState([]);

  useEffect(() => {
    getContratos().then((res) => {
      if (res?.data)
        setContratos(
          res?.data.map((e: Contrato) => {
            return {
              ...e,
              label: e.nombre,
              value: e.id,
            };
          })
        );
    });
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await createGrupo(data);
      toast({ description: "Grupo creada correctamente" });
      navigate("/grupos");
    } catch (error) {
      toast({
        description: "Hubo un error al crear el grupo",
        variant: "destructive",
      });
    }
  };

  const fields: {
    label: string;
    name: "nombre" | "contratoId";
    type?: string;
    options?: { label: string; value: string }[];
  }[] = useMemo(
    () => [
      {
        label: "Nombre",
        name: "nombre",
      },
      {
        label: "Contrato",
        name: "contratoId",
        type: "select",
        options: contratos,
      },
    ],
    [contratos]
  );

  return (
    <div className="h-full p-4">
      <div className="flex items-center gap-4 border-b mb-3 pb-3">
        <Button variant="outline" onClick={() => navigate("/grupos")}>
          <ChevronLeft className="h-6 w-6" />
          <span className="text-sm font-semibold">Volver</span>
        </Button>
        <h1 className="text-xl font-bold">Agregar Nuevo Grupo</h1>
      </div>
      <Form {...form}>
        <form
          className="flex flex-col gap-4 max-w-[500px]"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {fields.map((e) => {
            if (e.type) {
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
                          <Input placeholder={e.label} {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              );
            }
          })}

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
