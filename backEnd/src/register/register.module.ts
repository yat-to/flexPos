import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';

@Module({
  controllers: [RegisterController], // Daftarkan Controller
  providers: [RegisterService],       // Daftarkan Service
  exports: [RegisterService],
})
export class RegisterModule {}
