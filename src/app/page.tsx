"use client";

// import { redirect } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  UtensilsCrossed,
  Scissors,
  Trophy,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Zap,
  Printer,
  Smartphone,
  BarChart3,
  Users,
  ChevronRight,
  Sparkles,
  Layers,
  Check,
} from "lucide-react";

export default function RootPage() {
  // Mengarahkan otomatis ke halaman login ketika aplikasi baru dibuka
  // redirect("/login");


  const [activeTab, setActiveTab] = useState<"food" | "barbershop" | "sport" | "retail">("food");

  const businessSolutions = {
    food: {
      badge: "F&B / Kuliner",
      icon: UtensilsCrossed,
      title: "Restoran, Cafe, Warkop & Bakery",
      desc: "Optimalkan perputaran pesanan meja, varian rasa, paket bundling hemat, dan pencatatan kasir tanpa ribet.",
      accentBg: "bg-orange-50 text-orange-700 border-orange-200",
      features: [
        "Manajemen nomor meja & open bill",
        "Varian menu (ukuran, level pedas, topping)",
        "Cetak struk kasir & tiket dapur otomatis",
        "Laporan menu terlaris & profit margin per porsi",
      ],
      mockupData: {
        title: "Pesanan Meja #04 - Cafe & Resto",
        items: [
          { name: "Nasi Goreng Spesial", qty: 2, price: "Rp 50.000" },
          { name: "Es Kopi Susu Aren", qty: 2, price: "Rp 36.000" },
          { name: "French Fries BBQ", qty: 1, price: "Rp 18.000" },
        ],
        total: "Rp 104.000",
      },
    },
    barbershop: {
      badge: "Barbershop & Jasa",
      icon: Scissors,
      title: "Barbershop, Salon & Klinik Perawatan",
      desc: "Hitung otomatis komisi per kapster/stylist, tentukan durasi treatment, dan kelola penjualan produk pomade.",
      accentBg: "bg-blue-50 text-blue-700 border-blue-200",
      features: [
        "Pencatatan komisi kapster / barber otomatis",
        "Manajemen durasi potong rambut & antrean",
        "Penjualan produk grooming (pomade, tonic, vitamin)",
        "Paket kombo hemat (Haircut + Shaving + Creambath)",
      ],
      mockupData: {
        title: "Layanan Stylist: Rian Barber",
        items: [
          { name: "Gentleman Haircut & Wash", qty: 1, price: "Rp 50.000" },
          { name: "Beard Trim & Hot Towel", qty: 1, price: "Rp 25.000" },
          { name: "Oil-based Pomade 100g", qty: 1, price: "Rp 65.000" },
        ],
        total: "Rp 140.000",
      },
    },
    sport: {
      badge: "Sport & Arena Rental",
      icon: Trophy,
      title: "Sewa Lapangan Futsal, Badminton & Billiard",
      desc: "Sistem reservasi slot waktu per jam, sewa peralatan (raket/rompi/bola), serta kasir kantin olahraga.",
      accentBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      features: [
        "Billing sewa lapangan per jam dengan timer otomatis",
        "Sewa peralatan olahraga (raket, kok, rompi, bola)",
        "Kasir kantin terpadu untuk minuman energi & snack",
        "Jadwal reservasi terintegrasi anti-bentrok",
      ],
      mockupData: {
        title: "Arena Lapangan Badminton A (2 Jam)",
        items: [
          { name: "Sewa Lapangan (19:00 - 21:00)", qty: 2, price: "Rp 120.000" },
          { name: "Sewa 2 Raket Pro", qty: 2, price: "Rp 20.000" },
          { name: "Minuman Isotonik Dingin", qty: 3, price: "Rp 21.000" },
        ],
        total: "Rp 161.000",
      },
    },
    retail: {
      badge: "Retail & Toko",
      icon: ShoppingBag,
      title: "Minimarket, Toko Pakaian & Sembako",
      desc: "Scan barcode instan, kontrol ribuan SKU barang, peringatan stok menipis, dan cetak struk kasir cepat.",
      accentBg: "bg-purple-50 text-purple-700 border-purple-200",
      features: [
        "Dukungan barcode scanner & pencarian SKU instan",
        "Peringatan dini stok menipis (Low Stock Alert)",
        "Manajemen harga grosir vs eceran",
        "Multi metode pembayaran (Tunai, QRIS, Transfer)",
      ],
      mockupData: {
        title: "Kasir Transaksi Cepat - Retail Store",
        items: [
          { name: "Kaus Polos Cotton 30s", qty: 2, price: "Rp 110.000" },
          { name: "Minyak Goreng 2 Liter", qty: 1, price: "Rp 34.000" },
          { name: "Snack Keripik Kentang", qty: 2, price: "Rp 24.000" },
        ],
        total: "Rp 168.000",
      },
    },
  };

  const keyFeatures = [
    {
      icon: Zap,
      title: "Kasir Transaksi Cepat",
      desc: "Proses transaksi dalam hitungan detik dengan interface kasir yang responsif dan intuitif.",
    },
    {
      icon: Layers,
      title: "Kategori Usaha Dinamis",
      desc: "Fleksibel berganti dan menyesuaikan modul kategori untuk makanan, jasa, persewaan, maupun retail.",
    },
    {
      icon: BarChart3,
      title: "Laporan Keuangan & Laba",
      desc: "Pantau omset harian, keuntungan bersih, dan grafik tren penjualan real-time di mana saja.",
    },
    {
      icon: Printer,
      title: "Cetak Struk & Multi-Perangkat",
      desc: "Kompatibel dengan printer thermal bluetooth/USB serta dapat diakses lewat laptop, tablet, dan smartphone.",
    },
    {
      icon: Users,
      title: "Hak Akses Kasir & Owner",
      desc: "Lindungi data keuangan dengan pembagian hak akses terpisah antara staf kasir dan pemilik usaha.",
    },
    {
      icon: ShieldCheck,
      title: "Aman & Ramah UMKM",
      desc: "Solusi lengkap dengan biaya yang sangat terjangkau tanpa potongan transaksi tersembunyi.",
    },
  ];

  const pricingPlans = [
    {
      name: "Starter UMKM",
      badge: "Cocok untuk Rintisan",
      price: "Rp 49.000",
      period: "/ bulan",
      desc: "Paket hemat bagi usaha mandiri yang baru merintis pencatatan digital.",
      features: [
        "1 Akun Kasir / Pengguna",
        "Kelola hingga 100 Menu / Produk",
        "Cetak Struk Thermal",
        "Laporan Penjualan Harian",
        "Support via Chat",
      ],
      highlighted: false,
      buttonText: "Pilih Starter",
    },
    {
      name: "Flex Pro",
      badge: "Paling Populer ⭐",
      price: "Rp 99.000",
      period: "/ bulan",
      desc: "Solusi komplit untuk bisnis F&B, Barbershop, Sport Center, dan Retail berkembang.",
      features: [
        "Multi Pengguna (Owner & Kasir)",
        "Produk & Kategori Tanpa Batas",
        "Modul Khusus (Meja, Komisi, Booking Jam)",
        "Laporan Laba/Rugi Real-Time",
        "Manajemen Diskon & Varian",
        "Export Laporan ke Excel/PDF",
      ],
      highlighted: true,
      buttonText: "Mulai Uji Coba Gratis",
    },
    {
      name: "Enterprise Outlet",
      badge: "Multi Cabang",
      price: "Rp 199.000",
      period: "/ bulan",
      desc: "Untuk pemilik usaha yang memiliki lebih dari satu cabang/toko terintegrasi.",
      features: [
        "Semua Fitur Flex Pro",
        "Multi Cabang / Outlet",
        "Sentralisasi Stok Antar Cabang",
        "Laporan Konsolidasi Finansial",
        "Prioritas Dedicated Support",
      ],
      highlighted: false,
      buttonText: "Hubungi Sales",
    },
  ];

  const currentSolution = businessSolutions[activeTab];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* ========================================================================= */}
      {/* 1. TOP NAVBAR (TOMBOL LOGIN DI SUDUT KANAN ATAS)                           */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-2xl overflow-hidden shadow-md shadow-indigo-500/15 flex items-center justify-center bg-indigo-50 transition-transform group-hover:scale-105">
              <Image
                src="/images/icon.png"
                alt="FlexPOS Logo"
                width={44}
                height={44}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-2xl font-black text-slate-900 tracking-tight">Flex</span>
                <span className="text-2xl font-black text-indigo-600 tracking-tight">POS</span>
              </div>
              <p className="text-[10px] text-slate-400 font-semibold tracking-wide uppercase leading-none">
                Smart POS Solution
              </p>
            </div>
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#solusi" className="hover:text-indigo-600 transition-colors">
              Solusi Bisnis
            </a>
            <a href="#fitur" className="hover:text-indigo-600 transition-colors">
              Fitur Unggulan
            </a>
            <a href="#harga" className="hover:text-indigo-600 transition-colors">
              Paket Harga
            </a>
          </nav>

          {/* Right Action: Login to Dashboard Button */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-md shadow-indigo-600/25 hover:shadow-lg hover:shadow-indigo-600/35 transition-all duration-200 active:scale-95"
            >
              <span>Login Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION                                                           */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden bg-gradient-to-b from-white via-indigo-50/30 to-slate-50">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-200/30 rounded-full blur-3xl pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-full text-xs font-bold text-indigo-700 mb-6 shadow-xs animate-in fade-in">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Satu Aplikasi Kasir untuk Segala Jenis Usaha</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] mb-6">
              Kelola Transaksi & Keuangan Lebih Mudah dengan{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
                FlexPOS
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
              Aplikasi kasir pintar serbaguna yang dirancang fleksibel untuk pelaku <strong>UMKM</strong> hingga usaha menengah: mulai dari <strong>F&B / Kuliner</strong>, <strong>Barbershop & Jasa</strong>, <strong>Sport & Rental Arena</strong>, hingga <strong>Retail & Toko</strong>.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3.5 rounded-2xl shadow-xl shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all text-base active:scale-95"
              >
                <span>Coba Sekarang Gratis</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#solusi"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold px-7 py-3.5 rounded-2xl shadow-xs transition-all text-base"
              >
                <span>Lihat Solusi Bisnis</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Interactive Hero Preview Card */}
          <div className="relative max-w-5xl mx-auto rounded-3xl p-3 sm:p-5 bg-gradient-to-b from-indigo-200/50 via-white/80 to-white/90 shadow-2xl border border-indigo-100">
            <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-inner">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="ml-2 text-xs text-slate-400 font-mono">dashboard.flexpos.app</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="text-xs text-emerald-400 font-semibold">Sistem Kasir Aktif</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <span className="text-xs text-slate-400">Total Penjualan Hari Ini</span>
                  <div className="text-2xl font-black text-white mt-1">Rp 3.480.000</div>
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-medium">
                    <TrendingUp className="w-3.5 h-3.5" /> +18.4% dari kemarin
                  </div>
                </div>

                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <span className="text-xs text-slate-400">Jumlah Transaksi</span>
                  <div className="text-2xl font-black text-white mt-1">54 Transaksi</div>
                  <div className="text-[11px] text-indigo-300 mt-1">Rata-rata Rp 64.400 / order</div>
                </div>

                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <span className="text-xs text-slate-400">Status Stok & Kategori</span>
                  <div className="text-2xl font-black text-emerald-400 mt-1">Stok Aman</div>
                  <div className="text-[11px] text-slate-400 mt-1">Semua produk siap dipesan</div>
                </div>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Smartphone className="w-4 h-4 text-indigo-400" />
                  <span>Dapat dibuka di Komputer Kasir, Laptop, Tablet, maupun Smartphone.</span>
                </div>
                <Link
                  href="/login"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 rounded-lg transition-all"
                >
                  Buka Dashboard Sekarang &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. MULTI-BUSINESS SOLUTIONS                                               */}
      {/* ========================================================================= */}
      <section id="solusi" className="py-20 lg:py-28 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-3.5 py-1 rounded-full text-xs font-bold text-indigo-700 uppercase tracking-wider mb-3">
              Solusi Fleksibel
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Satu Aplikasi, Siap untuk Berbagai Bidang Usaha
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Pilih model bisnis Anda dan saksikan bagaimana FlexPOS menyesuaikan alur kerja secara instan.
            </p>
          </div>

          {/* Tabs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto mb-10">
            {(
              [
                { id: "food", label: "F&B / Kuliner", emoji: "🍔" },
                { id: "barbershop", label: "Barbershop & Jasa", emoji: "💈" },
                { id: "sport", label: "Sport & Arena", emoji: "⚽" },
                { id: "retail", label: "Retail & Toko", emoji: "🛍️" },
              ] as const
            ).map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 flex items-center gap-3 ${isSelected
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-600/20 scale-[1.02]"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                >
                  <span className="text-2xl">{tab.emoji}</span>
                  <div>
                    <div className="font-bold text-sm leading-tight">{tab.label}</div>
                    <div className={`text-[11px] ${isSelected ? "text-indigo-200" : "text-slate-400"}`}>
                      Klik untuk simulasi
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Solution Content Card */}
          <div className="max-w-5xl mx-auto bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${currentSolution.accentBg}`}>
                  <span>{currentSolution.badge}</span>
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                  {currentSolution.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {currentSolution.desc}
                </p>
                <div className="space-y-3 pt-2">
                  {currentSolution.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold px-6 py-3 rounded-xl shadow-md transition-all active:scale-95"
                  >
                    <span>Gunakan Template {currentSolution.badge}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Receipt Preview */}
              <div className="lg:col-span-5">
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
                      <span className="font-bold text-xs text-slate-800">
                        {currentSolution.mockupData.title}
                      </span>
                    </div>
                    <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500 font-mono">
                      Struk Kasir
                    </span>
                  </div>

                  <div className="space-y-3 divide-y divide-slate-100 text-xs">
                    {currentSolution.mockupData.items.map((item, idx) => (
                      <div key={idx} className="pt-2 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-slate-800">{item.name}</span>
                          <span className="text-slate-400 block text-[10px]">x{item.qty}</span>
                        </div>
                        <span className="font-semibold text-slate-700">{item.price}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 pt-4 border-t-2 border-dashed border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase">Total Bayar</span>
                    <span className="text-base font-black text-indigo-600">
                      {currentSolution.mockupData.total}
                    </span>
                  </div>

                  <div className="mt-4 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] flex items-center justify-center gap-1.5 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Lunas via QRIS / Tunai</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FITUR UNGGULAN                                                         */}
      {/* ========================================================================= */}
      <section id="fitur" className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-3.5 py-1 rounded-full text-xs font-bold text-indigo-700 uppercase tracking-wider mb-3">
              Fitur Lengkap
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Semua yang Dibutuhkan Kasir & Pemilik Usaha
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Didesain sederhana agar karyawan kasir langsung mahir tanpa perlu training berhari-hari.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyFeatures.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-200 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-200">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. PRICING                                                                */}
      {/* ========================================================================= */}
      <section id="harga" className="py-20 lg:py-28 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-3.5 py-1 rounded-full text-xs font-bold text-indigo-700 uppercase tracking-wider mb-3">
              Harga Transparan
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Investasi Hemat, Manfaat Berlipat untuk Bisnis Anda
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-200 ${plan.highlighted
                  ? "bg-gradient-to-b from-indigo-900 to-slate-900 text-white shadow-2xl ring-2 ring-indigo-500 scale-105"
                  : "bg-slate-50 border border-slate-200 text-slate-900 shadow-sm hover:shadow-md"
                  }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${plan.highlighted
                        ? "bg-indigo-500/30 text-indigo-200 border border-indigo-400/30"
                        : "bg-indigo-50 text-indigo-700 border border-indigo-100"
                        }`}
                    >
                      {plan.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black">{plan.name}</h3>
                  <p className={`text-xs mt-1 mb-6 ${plan.highlighted ? "text-slate-300" : "text-slate-500"}`}>
                    {plan.desc}
                  </p>

                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-black tracking-tight">{plan.price}</span>
                    <span className={`text-xs font-semibold ${plan.highlighted ? "text-slate-300" : "text-slate-500"}`}>
                      {plan.period}
                    </span>
                  </div>

                  <div className="space-y-3 border-t border-slate-200/20 pt-6 mb-8">
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-3 text-xs sm:text-sm">
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 ${plan.highlighted ? "text-indigo-400" : "text-emerald-600"
                            }`}
                        />
                        <span className={plan.highlighted ? "text-slate-200" : "text-slate-700"}>
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href="/login"
                  className={`w-full py-3.5 px-4 rounded-xl text-center font-bold text-sm transition-all duration-200 active:scale-95 ${plan.highlighted
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30"
                    : "bg-slate-900 hover:bg-slate-800 text-white"
                    }`}
                >
                  {plan.buttonText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. FOOTER                                                                 */}
      {/* ========================================================================= */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-sm">
              FP
            </div>
            <div>
              <span className="font-extrabold text-white text-sm">FlexPOS</span>
              <p className="text-[10px] text-slate-500">Satu Aplikasi Kasir untuk Segala Jenis Usaha</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-slate-400">
            <a href="#solusi" className="hover:text-white transition-colors">
              Solusi Bisnis
            </a>
            <a href="#fitur" className="hover:text-white transition-colors">
              Fitur
            </a>
            <a href="#harga" className="hover:text-white transition-colors">
              Harga
            </a>
            <Link href="/login" className="hover:text-white transition-colors">
              Login Admin
            </Link>
          </div>

          <div>
            &copy; {new Date().getFullYear()} FlexPOS. Hak Cipta Dilindungi.
          </div>
        </div>
      </footer>
    </div>
  );
}