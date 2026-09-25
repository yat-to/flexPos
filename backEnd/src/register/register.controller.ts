import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterUserDto } from './dto/register.dto';

// '@Controller('register')' berarti controller ini menangani URL:
// http://localhost:8000/register
@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  // 1. GET: http://localhost:8000/register (Bisa dibuka langsung di Browser)
  @Get()
  checkRegister() {
    console.log('\n👀 [BACKEND LOG] Ada request GET /register masuk dari browser / frontend!');
    return this.registerService.getAllUsers();
  }

  // 2. POST: http://localhost:8000/register (Menerima input dari register)
  @Post()
  register(@Body() body: RegisterUserDto ) {
    console.log('\n======================================================');
    console.log('🔔 [BACKEND LOG] ADA REQUEST REGISTER MASUK DARI FRONTEND NIH!');
    console.log('⏰ Waktu Diterima:', new Date().toLocaleTimeString());
    console.log('📦 Data dari Frontend:');
    console.log(JSON.stringify(body));
    console.log('======================================================\n');

    return this.registerService.registerUser(body);
  }
}
