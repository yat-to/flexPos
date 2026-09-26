import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegisterModule } from './register/register.module';
import { PrismaModule } from './prisma/prisma.module';
import { JenisUsahaModule } from './jenisUsaha/jenisUsaha.module';

@Module({
  imports: [PrismaModule, RegisterModule, JenisUsahaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
