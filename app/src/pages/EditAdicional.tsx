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
import { getAdicional, updateAdicional } from "@/services/adicionalService";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useMemo, useState } from "react";
import { Adicional } from "@/models/adicional";
import { getNovedadesReferencias } from "@/services/novedadReferenciasService";
import { getGrupos } from "@/services/grupoService";
import { Grupo } from "@/models/grupo";
import { NovedadReferencia } from "@/models/novedadReferencia";
import { confirmAlert } from "@/utils/alerts";

export default function EditAdicional() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const params = useParams();
  const [values, setValues] = useState<Adicional>();
  const [grupos, setGrupos] = useState([]);
  const [novedadesReferencias, setNovedadesReferencias] = useState([]);

  const form = useForm({
    resolver: zodResolver(
      z.object({
        valor: z.string(),
        grupoId: z.string(),
        novedadReferenciaId: z.string(),
      })
    ),
    defaultValues: {
      valor: "",
      grupoId: "",
      novedadReferenciaId: "",
    },
    values: useMemo(() => {
      return values;
    }, [values]),
  });

  useEffect(() => {
    const getData = async () => {
      await getGrupos().then((res) => {
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

      await getNovedadesReferencias().then((res) => {
        if (res?.data)
          setNovedadesReferencias(
            res?.data.map((e: NovedadReferencia) => {
              return {
                ...e,
                label: `${e.novedad?.nombre} - ${e.referencia?.nombre}`,
                value: e.id,
              };
            })
          );
      });

      if (params?.id) {
        await getAdicional(params?.id).then((res) => {
          if (res?.data) {
            setValues(res.data);
          }
        });
      }
    };

    getData();
  }, [params.id]);

  const onSubmit: SubmitHandler<Adicional> = async (data) => {
    try {
      const alert = await confirmAlert({
        title: "Guardar cambios?",
      });

      if (alert.isConfirmed) {
        if (values) {
          await updateAdicional({
            id: values.id,
            ...data,
          });

          toast({ description: "Adicional creada correctamente" });
          navigate("/adicionales");
        }
      }
    } catch (error) {
      toast({
        description: "Hubo un error al crear el Adicional",
        variant: "destructive",
      });
    }
  };

  const fields: {
    label: string;
    name: "valor" | "grupoId" | "novedadReferenciaId";
    type?: string;
    options?: { label: string; value: string }[];
  }[] = useMemo(
    () => [
      {
        label: "Valor",
        name: "valor",
        type: "number",
      },
      {
        label: "Grupo",
        name: "grupoId",
        type: "select",
        options: grupos,
      },
      {
        label: "Novedad y Referencia",
        name: "novedadReferenciaId",
        type: "select",
        options: novedadesReferencias,
      },
    ],
    [grupos, novedadesReferencias]
  );

  return (
    <div className="h-full p-4">
      <div className="flex items-center gap-4 border-b mb-3 pb-3">
        <Button variant="outline" onClick={() => navigate("/adicionales")}>
          <ChevronLeft className="h-6 w-6" />
          <span className="text-sm font-semibold">Volver</span>
        </Button>
        <h1 className="text-xl font-bold">Editar Adicional</h1>
      </div>
      <Form {...form}>
        <form
          className="flex flex-col gap-4 max-w-[500px]"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {fields.map((e) => {
            if (e.type === "select") {
              return (
                <div key={e.name} className="space-y-2">
                  <FormField
                    control={form.control}
                    name={e.name}
                    render={({ field }) => {
                      const value = e.options?.find(
                        (a) => field.value && +a.value === +field.value
                      );

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
                          <Input
                            placeholder={e.label}
                            type={e.type}
                            {...field}
                          />
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
