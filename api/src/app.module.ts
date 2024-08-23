import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { EmpleadoModule } from './empleado/empleado.module';
import { PlantaModule } from './planta/planta.module';
import { GrupoModule } from './grupo/grupo.module';
import { NovedadModule } from './novedad/novedad.module';
import { ReferenciaModule } from './referencias/referencia.module';
import { ContratoModule } from './contrato/contrato.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    EmpleadoModule,
    ContratoModule,
    PlantaModule,
    GrupoModule,
    NovedadModule,
    ReferenciaModule,
  ],
})
export class AppModule {}
