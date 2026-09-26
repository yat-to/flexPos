import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { AuthController } from './auth.controller';
import { RegisterService } from './register.service';

@Module({
  controllers: [RegisterController, AuthController], // Daftarkan RegisterController dan AuthController
  providers: [RegisterService],                       // Daftarkan Service
  exports: [RegisterService],
})
export class RegisterModule {}
