import { BadRequestException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJenisUsahaDto, UpdateJenisUsahaDto } from './dto/jenisUsaha.dto';

@Injectable()
export class JenisUsahaService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  // Auto-seed data default jika belum ada data jenis usaha di database
  async onModuleInit() {
    const count = await this.prisma.businessType.count();
    if (count === 0) {
      console.log('🌱 [SEED] Mengisi data awal Jenis Usaha ke PostgreSQL...');
      await this.prisma.businessType.createMany({
        data: [
          {
            code: 'food',
            name: 'F&B / Kuliner',
            description: 'Resto, Cafe, Warkop, Bakery',
            icon: 'UtensilsCrossed',
          },
          {
            code: 'barbershop',
            name: 'Barbershop & Salon',
            description: 'Potong Rambut, Styling, Treatment, Spa',
            icon: 'Scissors',
          },
          {
            code: 'sport',
            name: 'Sport & Arena Rental',
            description: 'Sewa Lapangan Futsal, Badminton, Gym, Alat',
            icon: 'Trophy',
          },
          {
            code: 'retail',
            name: 'Retail & Toko Kelontong',
            description: 'Fashion, Sembako, Gadget, Aksesoris',
            icon: 'ShoppingBag',
          },
        ],
      });
      console.log('✅ [SEED] 4 Jenis Usaha awal berhasil ditambahkan!');
    }
  }

  // 1. Ambil Semua Jenis Usaha
  async findAll() {
    return this.prisma.businessType.findMany({
      orderBy: { createdAt: 'asc' },
    });
  }

  // 2. Ambil 1 Jenis Usaha berdasarkan ID
  async findOne(id: string) {
    const item = await this.prisma.businessType.findUnique({
      where: { id },
    });
    if (!item) {
      throw new NotFoundException(`Jenis usaha dengan ID ${id} tidak ditemukan.`);
    }
    return item;
  }

  // 3. Tambah Jenis Usaha Baru
  async create(dto: CreateJenisUsahaDto) {
    if (!dto.name) {
      throw new BadRequestException('Nama jenis usaha wajib diisi!');
    }

    // Generate code otomatis dari nama jika tidak diisi
    const generatedCode = dto.code
      ? dto.code.trim().toLowerCase().replace(/\s+/g, '-')
      : dto.name.trim().toLowerCase().replace(/[^a-z0-9]/g, '-');

    // Cek duplikasi code
    const existing = await this.prisma.businessType.findUnique({
      where: { code: generatedCode },
    });
    if (existing) {
      throw new BadRequestException(`Kode jenis usaha "${generatedCode}" sudah ada!`);
    }

    return this.prisma.businessType.create({
      data: {
        code: generatedCode,
        name: dto.name,
        description: dto.description || '',
        icon: dto.icon || 'Store',
      },
    });
  }

  // 4. Update Jenis Usaha
  async update(id: string, dto: UpdateJenisUsahaDto) {
    await this.findOne(id); // Pastikan ada

    // Jika ganti code, cek apakah bentrok dengan data lain
    if (dto.code) {
      const codeCheck = await this.prisma.businessType.findFirst({
        where: {
          code: dto.code.trim().toLowerCase(),
          NOT: { id },
        },
      });
      if (codeCheck) {
        throw new BadRequestException(`Kode "${dto.code}" sudah dipakai oleh jenis usaha lain.`);
      }
    }

    return this.prisma.businessType.update({
      where: { id },
      data: {
        ...(dto.name && { name: dto.name }),
        ...(dto.code && { code: dto.code.trim().toLowerCase() }),
        ...(dto.description !== undefined && { description: dto.description }),
        ...(dto.icon !== undefined && { icon: dto.icon }),
      },
    });
  }

  // 5. Hapus Jenis Usaha
  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.businessType.delete({
      where: { id },
    });
  }
}
