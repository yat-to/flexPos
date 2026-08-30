export const menu = [
    {
        id: '1',
        title: 'Dashboard',
        url: '/dashboard',
        icon: 'LayoutDashboard'
    },

    {
        id: '2',
        title: 'Kasir (POS)',
        url: '/kasir',
        icon: 'ShoppingCart'
    },

    {
        id: '3',
        title: 'Transaksi',
        url: '',
        icon: 'Receipt',
        children: [
            { title: 'Riwayat Transaksi', url: '/transaksi' },
            { title: 'Pesanan Aktif / Meja', url: '/transaksi/aktif' } // Mendukung F&B & Rental Lapangan
        ]
    },

    {
        id: '4',
        title: 'Katalog & Produk', // Netral untuk F&B, Jasa, & Sport
        url: '',
        icon: 'Package',
        children: [
            { title: 'Daftar Produk & Layanan', url: '/produk' },
            { title: 'Kategori', url: '/produk/kategori' },
            { title: 'Varian & Tambahan', url: '/produk/varian' } // Topping / Durasi Sewa / Pilihan Service
        ]
    },

    {
        id: '5',
        title: 'Inventori & Stok',
        url: '',
        icon: 'Boxes',
        children: [
            { title: 'Stok Barang', url: '/inventori/stok' },
            { title: 'Bahan Baku / Resep', url: '/inventori/resep' }, // HPP F&B / Pemakaian Barbershop
            { title: 'Penyesuaian Stok (Opname)', url: '/inventori/opname' }
        ]
    },

    {
        id: '6',
        title: 'Keuangan & Kas',
        url: '',
        icon: 'Wallet',
        children: [
            { title: 'Arus Kas (Masuk/Keluar)', url: '/keuangan/arus-kas' },
            { title: 'Rekap Kasir (Shift)', url: '/keuangan/shift' }
        ]
    },

    {
        id: '7',
        title: 'Laporan & Analitik',
        url: '',
        icon: 'BarChart3',
        children: [
            { title: 'Laporan Penjualan', url: '/laporan/penjualan' },
            { title: 'Laporan Laba Rugi', url: '/laporan/laba-rugi' },
            { title: 'Komisi Karyawan', url: '/laporan/komisi' } // Sangat penting untuk Barbershop/Salon
        ]
    },

    {
        id: '8',
        title: 'Pengaturan',
        url: '',
        icon: 'Settings',
        children: [
            { title: 'Profil Usaha & Struk', url: '/pengaturan/toko' },
            { title: 'Manajemen Staf / Kasir', url: '/pengaturan/users' },
            { title: 'Metode Pembayaran / QRIS', url: '/pengaturan/pembayaran' }
        ]
    },
];