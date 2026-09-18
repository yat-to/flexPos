# 🚀 FlexPOS - Multi-Industry Modern Point of Sale System

**FlexPOS** adalah sistem kasir (*Point of Sale*) modern, responsif, dan fleksibel yang dirancang untuk mendukung berbagai model bisnis (*multi-industry*). FlexPOS mampu menyesuaikan alur kerja, kategori, dan unit layanan secara adaptif untuk sektor **F&B (Restoran & Kafe)**, **Barbershop & Salon (Jasa)**, **Sport Center (Sewa Lapangan & Alat)**, hingga **Retail (Toko & Minimarket)**.

Aplikasi ini dibangun menggunakan arsitektur monorepo terpisah antara **Frontend** dan **Backend** untuk skalabilitas, kemudahan pemeliharaan, serta performa optimal.

---

## 📑 Daftar Isi

- [Gambaran Umum Aplikasi](#-gambaran-umum-aplikasi)
- [Fitur Utama](#-fitur-utama)
- [Struktur Proyek](#-struktur-proyek)
- [Tech Stack](#-tech-stack)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Struktur Direktori](#-struktur-direktori)
- [Panduan Instalasi & Menjalankan](#-panduan-instalasi--menjalankan)
  - [Frontend](#1-menjalankan-frontend)
  - [Backend](#2-menjalankan-backend)
- [Akun Demo & Simulasi Multi-Bisnis](#-akun-demo--simulasi-multi-bisnis)
- [Roadmap & Pengembangan](#-roadmap--pengembangan)

---

## 💡 Gambaran Umum Aplikasi

Bisnis modern sering kali memiliki model operasional yang berbeda:
- **F&B**: Mengelola meja, varian menu, bahan baku resep, pesanan dapur (*Kitchen Display System*), serta *takeaway/dine-in*.
- **Barbershop & Salon**: Mengelola antrean jasa potong rambut, durasi *treatment*, komisi kapster/stylist, serta produk *grooming*.
- **Sport Center**: Mengelola durasi sewa lapangan (per jam), rental raket/sepatu, serta penjualan minuman energi.
- **Retail**: Penjualan cepat berbasis barcode, kontrol stok opname, serta grosir/eceran.

**FlexPOS** menyatukan kebutuhan tersebut dalam satu ekosistem terpadu dengan preset dinamis yang langsung menyesuaikan tampilan katalog, formulir produk, dan laporan berdasarkan jenis usaha yang dipilih.

---

## ✨ Fitur Utama

- 🛒 **Terminal Kasir Cepat (POS)**: Antarmuka kasir modern dan intuitif dengan fitur keranjang belanja real-time, pencarian instan, filter kategori, kalkulasi diskon/pajak otomatis, dan modal pembayaran (Tunai, QRIS, Transfer).
- 🏢 **Multi-Industry Preset**: Konfigurasi otomatis jenis bisnis (Food & Beverage, Barbershop, Sport Center, Retail) lengkap dengan satuan (porsi, jam, pcs) dan durasi layanan.
- 📦 **Manajemen Katalog & Produk**: Pengelolaan kategori dinamis, varian produk (ukuran, rasa, level kepedasan), serta add-on.
- 🧾 **Riwayat & Laporan Transaksi**: Pencatatan riwayat transaksi lengkap dengan detail struk digital, status pesanan, dan metode pembayaran.
- 📊 **Dashboard Analitik**: Ringkasan performa penjualan harian, tren pendapatan, produk terlaris, serta grafik interaktif berbasis Chart.js.
- 🧑‍🍳 **Kitchen Display System (KDS) / Queue Monitor**: Monitor antrean pesanan real-time untuk dapur atau tim operasional.
- 📦 **Inventori & Stok (Roadmap/WIP)**: Pelacakan stok bahan, kartu stok, HPP resep F&B, dan penyesuaian stok opname.
- 💰 **Keuangan & Kas (Roadmap/WIP)**: Manajemen kas kecil (*cash drawer*), rekap pergantian shift kasir, dan laporan laba/rugi.
- 👥 **Manajemen Pengguna & Staf**: Pembagian hak akses (*Role-based Access*) untuk Admin, Kasir, dan Manajer Toko.

---

## 🏗️ Struktur Proyek

Repositori ini terdiri dari dua direktori utama:

```
flexPos/
├── frontEnd/       # Aplikasi web antarmuka pengguna (Next.js App Router)
└── backEnd/        # Layanan API & Backend service
```

---

## 🛠️ Tech Stack

### Frontend
| Teknologi | Versi | Keterangan |
| :--- | :--- | :--- |
| **[Next.js](https://nextjs.org/)** | 16.x (App Router) | React Framework modern untuk performa tinggi & SSR/SSG |
| **[React](https://react.dev/)** | 19.x | Library komponen antarmuka pengguna |
| **[TypeScript](https://www.typescriptlang.org/)** | 5.x | Keamanan tipe data (*type safety*) di seluruh codebase |
| **[Tailwind CSS](https://tailwindcss.com/)** | 4.x | Utility-first styling framework modern |
| **[Zustand](https://zustand-demo.pmnd.rs/)** | 5.x | State management yang ringan, cepat, dan modular dengan persist middleware |
| **[Chart.js](https://www.chartjs.org/) & [react-chartjs-2](https://react-chartjs-2.js.org/)** | 4.x / 5.x | Visualisasi data analitik dan grafik transaksi |
| **[Lucide React](https://lucide.dev/)** | Terbaru | Icon set vektor modern dan konsisten |
| **[React Hot Toast](https://react-hot-toast.com/)** | 2.x | Notifikasi toast interaktif |

### Backend
| Komponen | Teknologi | Keterangan |
| :--- | :--- | :--- |
| **Framework** | **[NestJS](https://nestjs.com/)** | Framework Node.js progresif berbasis TypeScript dengan arsitektur modular & *enterprise-ready* |
| **Bahasa Pemrograman** | **[TypeScript](https://www.typescriptlang.org/)** | Konsistensi *type-safe* ujung-ke-ujung antara Frontend dan Backend |
| **ORM / Database Layer** | **[Prisma](https://www.prisma.io/) / [TypeORM](https://typeorm.io/)** | Object-Relational Mapping modern untuk pemetaan entitas dan migrasi skema database |
| **Database** | **PostgreSQL / MySQL** | Database relasional untuk menjamin integritas transaksi penjualan (ACID compliant) |
| **Autentikasi & Keamanan** | **Passport.js & JWT (JSON Web Token)** | Autentikasi berbasis token dengan hashing password bcrypt dan Guards |
| **Validasi & Transformasi** | **class-validator & class-transformer** | Validasi DTO (*Data Transfer Object*) otomatis pada setiap *request payload* |
| **Dokumentasi API** | **Swagger / OpenAPI** | Dokumentasi interaktif otomatis untuk seluruh endpoint REST API |

---

## 📂 Struktur Direktori

```text
flexPos/
├── README.md
├── frontEnd/
│   ├── public/                      # Static assets (logo, icons, images)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (main)/              # Halaman ber-layout utama (Sidebar + Navbar)
│   │   │   │   ├── dashboard/       # Dashboard ringkasan & analitik
│   │   │   │   ├── kasir/           # Terminal Kasir (Point of Sale)
│   │   │   │   ├── kategori/        # Kelola Kategori Usaha
│   │   │   │   ├── menu/            # Katalog Menu / Produk
│   │   │   │   ├── produk/          # Modul Produk & Varian
│   │   │   │   └── transaksi/       # Riwayat & Detail Transaksi
│   │   │   ├── components/          # Komponen UI bersama (Navbar, Sidebar, dll)
│   │   │   ├── login/               # Halaman Autentikasi Pengguna
│   │   │   ├── globals.css          # Styling global Tailwind CSS v4
│   │   │   ├── layout.tsx           # Root layout aplikasi
│   │   │   └── page.tsx             # Entry redirect / Landing
│   │   ├── data/                    # Data dummy, preset katalog, & navigasi
│   │   ├── store/                   # Zustand store (authStore, kategori, dll)
│   │   └── types/                   # TypeScript interfaces & types (BusinessType, dll)
│   ├── package.json
│   └── tsconfig.json
│
└── backEnd/                         # Layanan Backend (NestJS Application)
    ├── src/
    │   ├── modules/
    │   │   ├── auth/                # Modul Autentikasi (JWT, Guards, Strategies)
    │   │   ├── users/               # Modul Manajemen Pengguna & Staf
    │   │   ├── categories/          # Modul Kategori Multi-Industri
    │   │   ├── products/            # Modul Produk, Varian & Harga
    │   │   └── transactions/        # Modul Transaksi & Pembayaran Kasir
    │   ├── database/                # Konfigurasi ORM (Prisma Schema / TypeORM Entities & Migrations)
    │   ├── app.module.ts            # Root application module
    │   └── main.ts                  # Entry point aplikasi NestJS (Port 8000)
    ├── package.json
    └── tsconfig.json
```

---

## 🚀 Panduan Instalasi & Menjalankan

### Prasyarat
- **Node.js** versi 18+ atau 20+ LTS
- **Database Server**: PostgreSQL atau MySQL
- Paket manajer: **npm**, **yarn**, atau **pnpm**

---

### 1. Menjalankan Frontend

1. Masuk ke direktori `frontEnd`:
   ```bash
   cd frontEnd
   ```

2. Pasang dependensi proyek:
   ```bash
   npm install
   ```

3. Jalankan server pengembangan (*development server*):
   ```bash
   npm run dev
   ```

4. Buka peramban (*browser*) pada alamat:
   ```
   http://localhost:3000
   ```

---

### 2. Menjalankan Backend (NestJS)

1. Masuk ke direktori `backEnd`:
   ```bash
   cd backEnd
   ```

2. Pasang dependensi NestJS:
   ```bash
   npm install
   ```

3. Buat dan sesuaikan konfigurasi environment pada file `.env`:
   ```env
   PORT=8000
   DATABASE_URL="postgresql://user:password@localhost:5432/flexpos_db?schema=public"
   JWT_SECRET="super-secret-jwt-key"
   JWT_EXPIRES_IN="1d"
   ```

4. Jalankan migrasi database:
   ```bash
   # Jika menggunakan Prisma:
   npx prisma migrate dev --name init

   # Atau jika menggunakan TypeORM:
   npm run migration:run
   ```

5. Jalankan server pengembangan NestJS (*hot-reload*):
   ```bash
   npm run start:dev
   ```

6. API Server aktif pada:
   - Base URL: `http://localhost:8000`
   - Dokumentasi Swagger (jika diaktifkan): `http://localhost:8000/api/docs`

---

## 👤 Akun Demo & Simulasi Multi-Bisnis

Frontend dilengkapi dengan simulasi akun demo langsung di `authStore` sehingga seluruh fitur dapat dicoba tanpa perlu koneksi database aktif:

| Username | Password | Sektor Bisnis | Nama Toko Contoh |
| :--- | :--- | :--- | :--- |
| **admin** | *(bebas)* | **F&B (Food & Drink)** | Resto & Cafe Berkah |
| **barber** | *(bebas)* | **Barbershop & Salon** | Classic Gentleman Barbershop |
| **sport** | *(bebas)* | **Sport Center** | Champion Arena & Sport Center |
| **kasir** | *(bebas)* | **Retail** | FlexPOS Store |

Setiap akun akan secara otomatis menyesuaikan kategori preset dan tata letak layanan sesuai industrinya.

---

## 🗺️ Roadmap & Pengembangan

- [x] Multi-industry preset (F&B, Barbershop, Sport, Retail)
- [x] Terminal POS kasir interaktif dengan keranjang & varian
- [x] Manajemen Kategori & Katalog Produk
- [x] Riwayat Transaksi & Ringkasan Dashboard
- [x] Kitchen Display System (KDS)
- [ ] Integrasi penuh REST API Backend
- [ ] Cetak Struk Thermal via Bluetooth / USB Web Print API
- [ ] Modul Manajemen Stok Opname & Bahan Baku (HPP)
- [ ] Manajemen Shift & Kasir Kas Kecil (*Petty Cash*)
- [ ] Integrasi Payment Gateway QRIS Dinamis

---

## 📄 Lisensi

Proyek ini dikembangkan secara privat / internal untuk solusi sistem kasir terintegrasi. Semua hak cipta dilindungi undang-undang.
