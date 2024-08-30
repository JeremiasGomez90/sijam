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
import { ReactNode, useEffect, useMemo, useState } from "react";
import { getPlantas } from "@/services/plantaService";
import { Planta } from "@/models/planta";
import { uploadFichada } from "@/services/fichadaService";
import { Horas, HorasAdicionales } from "@/models/horas";
import { buscarHoras } from "@/services/horasService";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getReferencias } from "@/services/referenciaService";
import { Referencia } from "@/models/referencia";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Inputs = {
  plantaId: string;
  excel: string;
};

type Column = {
  title: string;
  key: string;
  render?: (e: HorasAdicionales) => ReactNode;
};

export default function Fichadas() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(
      z.object({
        plantaId: z.string(),
        excel: z.string(),
      })
    ),
    defaultValues: {
      plantaId: "",
      excel: "",
    },
  });
  const [plantas, setPlantas] = useState([]);
  const [referencias, setReferencias] = useState([]);
  const [file, setFile] = useState<File>();
  const [horasIds, setHorasIds] = useState([]);
  const [horas, setHoras] = useState<HorasAdicionales[]>([]);
  const [calcular, setCalcular] = useState(true);

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
    getReferencias().then((res) => {
      if (res?.data)
        setReferencias(
          res?.data.map((e: Referencia) => {
            return {
              ...e,
              title: e.codigo,
              key: e.codigo,
            };
          })
        );
    });
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const formData = new FormData();
      for (const prop in data) {
        formData.append(prop, data[prop as keyof Inputs]);
      }

      if (file) {
        formData.append("file", file);
      }
      const response = await uploadFichada(formData);

      setHorasIds(response.map((e: Horas) => e.id));

      toast({ description: "Ficha cargada correctamente" });
    } catch (error) {
      toast({
        description: "Hubo un error al crear el fichada",
        variant: "destructive",
      });
    }
  };

  const handleCalculate = async () => {
    const res = await buscarHoras({ ids: horasIds });

    setHoras(res);

    form.reset();
    setCalcular(false);
  };

  const fields: {
    label: string;
    name: "plantaId" | "excel";
    type?: string;
    options?: { label: string; value: string }[];
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }[] = useMemo(
    () => [
      {
        label: "Planta",
        name: "plantaId",
        type: "select",
        options: plantas,
      },
      {
        label: "Cargar Excel",
        name: "excel",
        type: "file",
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          if (e?.target?.files?.length) {
            setFile(e?.target?.files[0]);
          } else {
            setFile(undefined);
          }
        },
      },
    ],
    [plantas]
  );

  const columns: Column[] = useMemo(() => {
    return [
      {
        title: "Empleado",
        key: "empleado",
      },
      {
        title: "Novedad",
        key: "novedad",
      },
      ...referencias,
    ];
  }, [referencias]);

  const columnAccordion: Column[] = useMemo(() => {
    return [
      {
        title: "Fecha",
        key: "fecha",
        render: (row: HorasAdicionales) => {
          const fechaSplited = row?.fecha ? row?.fecha?.split("T") : null;
          const fecha = fechaSplited ? fechaSplited[0].split("-") : null;

          return (
            <span>
              {fecha?.length ? `${fecha[2]}/${fecha[1]}/${fecha[0]}` : ""}
            </span>
          );
        },
      },
      {
        title: "Novedad",
        key: "novedad",
      },
      ...referencias,
    ];
  }, [referencias]);

  return (
    <div className="h-full p-4">
      <div className="flex items-center gap-4 border-b mb-3 pb-3">
        <Button variant="outline" onClick={() => navigate("/fichadas")}>
          <ChevronLeft className="h-6 w-6" />
          <span className="text-sm font-semibold">Volver</span>
        </Button>
        <h1 className="text-xl font-bold">Fichadas</h1>
      </div>
      {calcular ? (
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
                      rules={{ required: true }}
                      render={({ field }) => {
                        const value = e.options?.find(
                          (a) => +a.value === +field.value
                        );

                        return (
                          <FormItem>
                            <FormLabel>{e.label}</FormLabel>
                            <FormControl>
                              <Select
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
                      rules={{ required: true }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{e.label}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type={e.type}
                              placeholder={e.label}
                              onChange={(event) => {
                                field.onChange(event);
                                if (e.onChange) {
                                  e.onChange(event);
                                }
                              }}
                              required
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
              <span className="text-sm font-semibold">Subir archivo</span>
            </Button>
            <Button
              variant="default"
              className="w-full"
              type="button"
              onClick={handleCalculate}
              disabled={!horasIds?.length}
            >
              <span className="text-sm font-semibold">Calcular</span>
            </Button>
          </form>
        </Form>
      ) : (
        <div className="flex flex-col gap-4 max-w-[500px]">
          <Button
            variant="default"
            className="w-full"
            type="button"
            onClick={() => setCalcular(true)}
          >
            <span className="text-sm font-semibold">Volver a subir excel</span>
          </Button>
        </div>
      )}

      {!calcular && horas?.length ? (
        <div className="p-4">
          {horas.map((h) => (
            <Accordion
              className="AccordionRoot"
              type="single"
              collapsible
              key={h.id}
            >
              <AccordionItem className="AccordionItem" value={`${h.id}`}>
                <AccordionTrigger>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {columns.map((e) => {
                          return <TableHead key={e.key}>{e.title}</TableHead>;
                        })}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow >
                        {columns.map((e) => {
                          return (
                            <TableCell key={`${h.id}_${e.key}`}>
                              {e.render
                                ? e.render(h)
                                : h[e.key as keyof Column]}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    </TableBody>
                  </Table>
                </AccordionTrigger>
                <AccordionContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {columnAccordion.map((e) => {
                          return <TableHead key={e.key}>{e.title}</TableHead>;
                        })}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {h.dias?.map((h) => (
                        <TableRow key={h.id}>
                          {columnAccordion.map((e) => {
                            return (
                              <TableCell key={`${h.id}_${e.key}`}>
                                {e.render
                                  ? e.render(h)
                                  : h[e.key as keyof Column]}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      ) : null}
    </div>
  );
}
