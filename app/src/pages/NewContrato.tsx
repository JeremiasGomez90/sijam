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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useMemo, useState } from "react";
import { getPlantas } from "@/services/plantaService";
import { Planta } from "@/models/planta";
import { createContrato } from "@/services/contratoService";

type Inputs = {
  nombre: string;
  plantaId: string;
};

export default function NewContrato() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(
      z.object({
        nombre: z.string().min(1).max(50),
        plantaId: z.string(),
      })
    ),
    defaultValues: {
      nombre: "",
      plantaId: "",
    },
  });

  const [plantas, setPlantas] = useState([]);

  useEffect(() => {
    getPlantas().then((res) => {
      if (res?.data)
        setPlantas(
          res?.data.map((e: Planta) => {
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
      await createContrato(data);
      toast({ description: "Contrato creada correctamente" });
      navigate("/contratos");
    } catch (error) {
      toast({
        description: "Hubo un error al crear el contrato",
        variant: "destructive",
      });
    }
  };

  const fields: {
    label: string;
    name: "nombre" | "plantaId";
    type?: string;
    options?: { label: string; value: string }[];
  }[] = useMemo(
    () => [
      {
        label: "Nombre",
        name: "nombre",
      },
      {
        label: "Planta",
        name: "plantaId",
        type: "select",
        options: plantas,
      },
    ],
    [plantas]
  );

  return (
    <div className="h-full p-4">
      <div className="flex items-center gap-4 border-b mb-3 pb-3">
        <Button variant="outline" onClick={() => navigate("/contratos")}>
          <ChevronLeft className="h-6 w-6" />
          <span className="text-sm font-semibold">Volver</span>
        </Button>
        <h1 className="text-xl font-bold">Agregar Nuevo Contrato</h1>
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
                                  {field.value}
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
