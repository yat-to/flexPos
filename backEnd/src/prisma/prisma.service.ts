import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
    console.log('✅ [PRISMA] Terhubung sukses ke database PostgreSQL!');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('🔌 [PRISMA] Koneksi database ditutup.');
  }
}
