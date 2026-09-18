import { Injectable } from '@nestjs/common';

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
  registerUser(payload: { name: string; username: string; password?: string }) {
    const newUser = {
      id: this.users.length + 1,
      name: payload.name || 'Pengguna Baru',
      username: payload.username || 'user',
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
