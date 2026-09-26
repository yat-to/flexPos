import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterUserDto } from './dto/register.dto';
import { UserRole } from '../common/enums/role.enum';

@Injectable()
export class RegisterService {
  constructor(private readonly prisma: PrismaService) {}

  // =========================================================================
  // FUNGSI 1: Melihat daftar semua pengguna dari PostgreSQL
  // =========================================================================
  async getAllUsers() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        storeName: true,
        businessType: true,
        role: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      pesan: 'Endpoint registrasi aktif!',
      total: users.length,
      data: users,
    };
  }

  // =========================================================================
  // FUNGSI 2: Menyimpan pendaftaran pengguna baru (Password di-Hash Bcrypt)
  // =========================================================================
  async registerUser(payload: RegisterUserDto) {
    // 1. Validasi: Cek apakah username sudah pernah digunakan
    const existing = await this.prisma.user.findUnique({
      where: { username: payload.username },
    });

    if (existing) {
      throw new BadRequestException('Username sudah terdaftar! Gunakan username lain.');
    }

    // 2. Keamanan: Hash password dengan Bcrypt (Salt rounds = 10)
    const rawPassword = payload.password || '123456';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(rawPassword, salt);

    // 3. Tentukan level akses (Role): default 'merchant' jika tidak ditentukan
    const assignedRole = payload.role || UserRole.MERCHANT;

    // 4. Simpan permanen ke tabel "users" di database PostgreSQL
    const newUser = await this.prisma.user.create({
      data: {
        name: payload.name,
        username: payload.username,
        password: hashedPassword, // 🔒 Tersimpan aman dalam bentuk hash acak
        storeName: payload.storeName || 'FlexPOS Store',
        businessType: payload.businessType || 'food',
        role: assignedRole,
      },
    });

    console.log(`🔒 [SECURITY] Pengguna baru didaftarkan dengan password ter-hash & role "${assignedRole}": ${newUser.username}`);

    return {
      status: 'success',
      message: `Registrasi berhasil untuk: ${newUser.name}!`,
      user: {
        id: newUser.id,
        name: newUser.name,
        username: newUser.username,
        storeName: newUser.storeName,
        businessType: newUser.businessType,
        role: newUser.role,
        createdAt: newUser.createdAt,
      },
    };
  }

  // =========================================================================
  // FUNGSI 3: Verifikasi Login dengan Verifikasi Hash Bcrypt
  // =========================================================================
  async loginUser(credentials: { username: string; password?: string }) {
    if (!credentials.username || !credentials.password) {
      throw new BadRequestException('Username dan password wajib diisi!');
    }

    const user = await this.prisma.user.findUnique({
      where: { username: credentials.username },
    });

    if (!user) {
      throw new UnauthorizedException('Username atau password salah!');
    }

    // Verifikasi password menggunakan bcrypt.compare
    let isPasswordValid = false;
    try {
      isPasswordValid = await bcrypt.compare(credentials.password, user.password);
    } catch {
      isPasswordValid = false;
    }

    // Fallback cerdas: Jika akun lama sebelumnya tersimpan dalam bentuk plain text
    if (!isPasswordValid && user.password === credentials.password) {
      isPasswordValid = true;
      // Otomatis upgrade password lama ke hash bcrypt di database
      const newSalt = await bcrypt.genSalt(10);
      const newHash = await bcrypt.hash(credentials.password, newSalt);
      await this.prisma.user.update({
        where: { id: user.id },
        data: { password: newHash },
      });
      console.log(`🔄 [MIGRATION] Password lama pengguna ${user.username} otomatis di-upgrade ke Bcrypt hash.`);
    }

    if (!isPasswordValid) {
      throw new UnauthorizedException('Username atau password salah!');
    }

    console.log(`✅ [LOGIN SUKSES] User: ${user.username} | Role: ${user.role}`);

    return {
      status: 'success',
      access_token: `jwt_token_${user.id}_${Date.now()}`,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        storeName: user.storeName,
        businessType: user.businessType,
        role: user.role, // Level akses pengguna dikembalikan untuk navigasi frontend
      },
    };
  }
}
