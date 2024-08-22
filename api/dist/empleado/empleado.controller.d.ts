import { EmpleadoService } from './empleado.service';
import { EmpleadoDto } from './dto';
import { Empleado } from '@prisma/client';
export declare class EmpleadoController {
    private empleadoService;
    constructor(empleadoService: EmpleadoService);
    register(dto: EmpleadoDto): Promise<Empleado>;
    findAll(): Promise<Empleado[]>;
}
