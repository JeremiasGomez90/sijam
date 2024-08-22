import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { EmpleadoModule } from './empleado/empleado.module';

@Module({
  imports: [AuthModule, PrismaModule, EmpleadoModule],
})
export class AppModule {}
