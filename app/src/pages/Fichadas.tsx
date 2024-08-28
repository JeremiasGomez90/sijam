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
import { uploadFichada } from "@/services/fichadaService";

type Inputs = {
  plantaId: string;
  excel: string;
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
  const [file, setFile] = useState<File>();

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
      const formData = new FormData();
      for(const prop in data){
        formData.append(prop, data[prop as keyof Inputs]);
      }

      if(file){
        formData.append("file", file)
      }
      await uploadFichada(formData);

      // toast({ description: "Fichada creada correctamente" });
      // navigate("/fichadas");
    } catch (error) {
      toast({
        description: "Hubo un error al crear el fichada",
        variant: "destructive",
      });
    }
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

  return (
    <div className="h-full p-4">
      <div className="flex items-center gap-4 border-b mb-3 pb-3">
        <Button variant="outline" onClick={() => navigate("/fichadas")}>
          <ChevronLeft className="h-6 w-6" />
          <span className="text-sm font-semibold">Volver</span>
        </Button>
        <h1 className="text-xl font-bold">Fichadas</h1>
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
