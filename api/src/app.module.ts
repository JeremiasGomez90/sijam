import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { EmpleadoModule } from './empleado/empleado.module';
import { PlantaModule } from './planta/planta.module';
import { GrupoModule } from './grupo/grupo.module';
import { NovedadModule } from './novedad/novedad.module';
import { ReferenciaModule } from './referencia/referencia.module';
import { ContratoModule } from './contrato/contrato.module';
import { AdicionalModule } from './adicional/adicional.module';
import { NovedadesReferenciasModule } from './novedadesReferencias/novedadesReferencias.module';
import { FichadaModule } from './fichada/fichada.module';
import { HorasModule } from './horas/horas.module';

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
    NovedadesReferenciasModule,
    AdicionalModule,
    FichadaModule,
    HorasModule,
  ],
})
export class AppModule {}
