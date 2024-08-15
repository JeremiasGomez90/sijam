import { Button } from "@/components/ui/button";
import { PlusIcon, Info, Trash, Search } from "lucide-react";
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
 
const data = [
  {
    numero: "EMP001",
    nombre: "Jeremias",
    apellido: "Gomez",
    nro_documento: "33333333",
    planta: "Ternium Canning",
  },
  {
    numero: "EMP002",
    nombre: "Juan Pablo",
    apellido: "Mantelli",
    nro_documento: "33333333",
    planta: "Ternium Canning",
  },
  {
    numero: "EMP003",
    nombre: "Jeremias",
    apellido: "Gomez",
    nro_documento: "33333333",
    planta: "Ternium Canning",
  },
]

export default function Empleados() {
  const navigate = useNavigate();
  return (  
    <div className="h-full p-4">
      <div className="w-full flex justify-between items-center border-b mb-3 pb-3">
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="bg-green-600 text-white hover:bg-green-600" onClick={() => navigate("/empleados/create")}>
            <span>Agregar</span>
            <PlusIcon className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Lista de Empleados</h1>
        </div>
        <div className="flex items-center w-full max-w-md gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar empleado..."
              className="w-full pl-12 pr-4 py-2 rounded-md border border-gray-400 focus:border-primary focus:ring-primary bg-background text-foreground"
            />
          </div>
        </div>
      </div>
      <Table >
        <TableHeader>
          <TableRow>
            <TableHead>Numero</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Apellido</TableHead>
            <TableHead>DNI</TableHead>
            <TableHead>Planta</TableHead>
            <TableHead className="text-right pr-[40px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((emp) => (
            <TableRow key={emp.numero}>
              <TableCell className="font-medium py-2">{emp.numero}</TableCell>
              <TableCell className="py-2">{emp.nombre}</TableCell>
              <TableCell className="py-2">{emp.apellido}</TableCell>
              <TableCell className="py-2">{emp.nro_documento}</TableCell>
              <TableCell className="py-2">{emp.planta}</TableCell>
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
                <TooltipProvider delayDuration={0} >
                  <Tooltip disableHoverableContent>
                    <TooltipTrigger>
                      <Button variant="outline" size="sm" disabled className="text-red-600 hover:bg-red-700 hover:text-white disabled:cursor-not-allowed">
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