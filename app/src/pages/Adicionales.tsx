import { Button } from "@/components/ui/button";
import { PlusIcon, Info, Trash, Search, Edit } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { bajaAdicional, getAdicionales } from "@/services/adicionalService";
import { confirmAlert } from "@/utils/alerts";
import { Adicional } from "@/models/adicional";

export default function Adicionales() {
  const navigate = useNavigate();
  const [data, setData] = useState<Adicional[]>([]);

  useEffect(() => {
    getAdicionales()
      .then((res) => {
        if (res?.data) setData(res?.data);
      })
  }, []);

  const eliminar = async (id: number) => {
    const alert = await confirmAlert({
      title: "¿Eliminar Adicional?",
    });

    if (alert.isConfirmed) {
      bajaAdicional(id)
        .then((res) => {
          if (res) {
            getAdicionales().then((res) => {
              if (res?.data) setData(res?.data);
            });
          }
        })
    }
  };

  return (  
    <div className="h-full p-4">
      <div className="w-full flex justify-between items-center border-b mb-3 pb-3">
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="bg-green-600 text-white hover:bg-green-600" onClick={() => navigate("/Adicionales/crear")}>
            <span>Agregar</span>
            <PlusIcon className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Lista de Adicionales</h1>
        </div>
        <div className="flex items-center w-full max-w-md gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar Adicional..."
              className="w-full pl-12 pr-4 py-2 rounded-md border border-gray-400 focus:border-primary focus:ring-primary bg-background text-foreground"
            />
          </div>
        </div>
      </div>
      <Table >
        <TableHeader>
          <TableRow>
            <TableHead>Valor</TableHead>
            <TableHead>Grupo</TableHead>
            <TableHead>Novedad - Referencia</TableHead>
            <TableHead className="text-right pr-[40px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((e) => (
            <TableRow key={e.id}>
              <TableCell className="font-medium py-2">{e.valor}</TableCell>
              <TableCell className="py-2">{e.grupoId}</TableCell>
              <TableCell className="py-2">{e.novedadReferenciaId}</TableCell>
              <TableCell className="flex gap-2 py-2 justify-end">
                <TooltipProvider delayDuration={0}>
                  <Tooltip disableHoverableContent>
                    <TooltipTrigger>
                      <Button variant="outline" size="sm" disabled className="text-blue-600 hover:bg-blue-700 hover:text-white cursor-not-allowed">
                        <Info className="text-blue-600 hover:bg-blue-700 hover:text-white cursor-not-allowed" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Informacion</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider delayDuration={0}>
                  <Tooltip disableHoverableContent>
                    <TooltipTrigger>
                      <Button variant="outline" size="sm" className="text-yellow-600 hover:bg-yellow-700 hover:text-white" onClick={() => navigate(`/adicional/${e.id}`)}>
                        <Edit className="text-yellow-600 hover:bg-ye;low-700 hover:text-white"/>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Modificar</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider delayDuration={0} >
                  <Tooltip disableHoverableContent>
                    <TooltipTrigger>
                      <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-700 hover:text-white disabled:cursor-not-allowed" onClick={() => eliminar(e.id || 0)}>
                        <Trash className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Eliminar</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}