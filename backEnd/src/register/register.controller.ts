import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterService } from './register.service';

// '@Controller('register')' berarti controller ini menangani URL:
// http://localhost:8000/register
@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  // 1. GET: http://localhost:8000/register (Bisa dibuka langsung di Browser)
  @Get()
  checkRegister() {
    return this.registerService.getAllUsers();
  }

  // 2. POST: http://localhost:8000/register (Menerima input dari formulir pendaftaran)
  @Post()
  register(@Body() body: { name: string; username: string; password?: string }) {
    return this.registerService.registerUser(body);
  }
}
