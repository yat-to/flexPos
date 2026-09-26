import { Body, Controller, Post } from '@nestjs/common';
import { RegisterService } from './register.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly registerService: RegisterService) {}

  @Post('login')
  login(@Body() body: { username: string; password?: string }) {
    console.log('\n======================================================');
    console.log('🔑 [BACKEND LOG] PERMINTAAN LOGIN MASUK:');
    console.log('👤 Username:', body.username);
    console.log('⏰ Waktu:', new Date().toLocaleTimeString());
    console.log('======================================================\n');

    return this.registerService.loginUser(body);
  }
}
