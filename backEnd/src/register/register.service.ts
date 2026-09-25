import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register.dto';

@Injectable()
export class RegisterService {
  // Array sementara untuk simulasi penyimpanan data sebelum kita hubungkan ke database
  private users: any[] = [];

  // Fungsi 1: Melihat daftar pengguna yang sudah mendaftar (bisa langsung dites di browser)
  getAllUsers() {
    return {
      pesan: 'Endpoint registrasi aktif!',
      total: this.users.length,
      data: this.users,
    };
  }

  // Fungsi 2: Memproses data pendaftaran baru
  registerUser(payload: RegisterUserDto) {
    const newUser = {
      id: payload.id,
      name: payload.name,
      username: payload.username,
      password: payload.password,
      businessType: payload.businessType,
      storeName: payload.storeName,
      createdAt: new Date().toISOString(),

    };

    // Simpan ke array
    this.users.push(newUser);

    return {
      status: 'success',
      message: `Registrasi berhasil untuk: ${newUser.name}!`,
      user: newUser,
    };
  }
}
