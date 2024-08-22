import { PrismaService } from 'src/prisma/prisma.service';
import { Empleado } from '@prisma/client';
import { EmpleadoDto } from './dto';
export declare class EmpleadoService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: EmpleadoDto): Promise<Empleado>;
    findAll(): Promise<Empleado[]>;
}
