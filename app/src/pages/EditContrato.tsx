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
import { getContrato, updateContrato } from "@/services/contratoService";
import { Contrato } from "@/models/contrato";
import { confirmAlert } from "@/utils/alerts";

export default function EditContrato() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const params = useParams();
  const [values, setValues] = useState<Contrato>();
  const [plantas, setPlantas] = useState([]);

  const form = useForm({
    resolver: zodResolver(
      z.object({
        nombre: z.string().min(1).max(50),
        plantaId: z.string(),
      })
    ),
    values: useMemo(() => {
      return values;
    }, [values]),
  });

  
  useEffect(() => {
    if (params?.id) {
      getContrato(params?.id).then((res) => {
        if (res?.data) {
          setValues(res.data);
        }
      });
    }
  }, [params.id]);


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

  const onSubmit: SubmitHandler<Contrato> = async (data) => {
    try {
      const alert = await confirmAlert({
        title: "Guardar cambios?",
      });

      if (alert.isConfirmed) {
        if (values) {
          await updateContrato({
            id: values.id,
            ...data,
          });
        }
      }
      toast({ description: "Contrato modificado correctamente" });
      navigate("/contratos");
    } catch (error) {
      toast({
        description: "Hubo un error al modificar el contrato",
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
        <h1 className="text-xl font-bold">Editar Contrato</h1>
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
