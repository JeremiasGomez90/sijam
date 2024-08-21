import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusIcon, Info, Trash, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
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

const data = [
  {
    id: 1,
    nombre: "Ternium Canning",
  },
  {
    id: 2,
    nombre: "Ternium Haedo",
  },
  {
    id: 3,
    nombre: "Ternium San Nicolas",
  },
  {
    id: 4,
    nombre: "Ternium Rosario",
  },
  {
    id: 5,
    nombre: "Taller",
  },
  {
    id: 6,
    nombre: "Acindar",
  }
]

export default function Plantas() {
  const navigate = useNavigate();
  return (
    <div className="h-full p-4">
      <div className="w-full flex justify-between items-center border-b mb-3 pb-3">
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="bg-green-600 text-white hover:bg-green-600" onClick={() => navigate("/")}>
            <span>Agregar</span>
            <PlusIcon className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Plantas</h1>
        </div>
        <div className="flex items-center w-full max-w-md gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar planta..."
              className="w-full pl-12 pr-4 py-2 rounded-md border border-gray-400 focus:border-primary focus:ring-primary bg-background text-foreground"
            />
          </div>
        </div>
      </div>
      <Table >
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Numero</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead className="text-right pr-[40px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((p) => (
            <TableRow key={p.id}>
              <TableCell className="font-medium py-2">{p.id}</TableCell>
              <TableCell className="py-2">{p.nombre}</TableCell>
              <TableCell className="flex gap-2 py-2 justify-end">
                <TooltipProvider delayDuration={0}>
                  <Tooltip disableHoverableContent>
                    <TooltipTrigger>
                      <Button variant="outline" size="sm" className="text-blue-600 hover:bg-blue-700 hover:text-white">
                        <Info className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Informacion</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider delayDuration={0} >
                  <Tooltip disableHoverableContent>
                    <TooltipTrigger>
                      <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-700 hover:text-white">
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