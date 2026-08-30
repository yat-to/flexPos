// src/data/dummyPosData.ts

// ============================================================================
// 15. PROFIL USAHA & STRUK
// ============================================================================
export const DUMMY_PROFIL_TOKO = {
    nama_usaha: "Warung FlexKuliner UMKM",
    slogan: "Spesialis Sushi, Sup Ubi, Ayam Geprek & Nasi Goreng",
    alamat: "Jl. Boulevard Raya No. 88, Makassar",
    telepon: "0812-3456-7890",
    instagram: "@flexkuliner.id",
    header_struk: "Terima kasih atas kunjungan Anda di Warung FlexKuliner!",
    footer_struk: "Barang yang sudah dibeli tidak dapat ditukar. Selamat Menikmati!",
    pajak_persen: 0, // UMKM non-PPN atau opsional PB1 10%
    service_charge: 0,
    logo_url: "/images/icon.png",
};

// ============================================================================
// 5. KATEGORI MENU
// ============================================================================
export const DUMMY_KATEGORI = [
    { id: "kat-1", uraian: "🍱 Sushi Corner", icon: "Utensils", total_produk: 4 },
    { id: "kat-2", uraian: "🍚 Aneka Nasi Goreng", icon: "Flame", total_produk: 3 },
    { id: "kat-3", uraian: "🍲 Sup Ubi Tradisional", icon: "Soup", total_produk: 3 },
    { id: "kat-4", uraian: "🍗 Ayam Geprek Crispy", icon: "Drumstick", total_produk: 3 },
    { id: "kat-5", uraian: "🥤 Minuman Segar & Kopi", icon: "Coffee", total_produk: 4 },
    { id: "kat-6", uraian: "🍟 Extra Topping & Cemilan", icon: "PlusCircle", total_produk: 6 },
];

// ============================================================================
// 6. VARIAN & TAMBAHAN (TOPPING / LEVEL PEDAS)
// ============================================================================
export const DUMMY_VARIAN = [
    {
        id: "var-pedas",
        nama_grup: "Level Pedas Ayam Geprek & Nasi Goreng",
        wajib_pilih: true,
        opsi: [
            { nama: "Level 0 (Tidak Pedas)", biaya_tambahan: 0 },
            { nama: "Level 1 (Pedas Sedang - 3 Cabe)", biaya_tambahan: 0 },
            { nama: "Level 2 (Pedas Nikmat - 7 Cabe)", biaya_tambahan: 0 },
            { nama: "Level 3 (Pedas Nampol - 15 Cabe)", biaya_tambahan: 2000 },
            { nama: "Level 5 (Pedas Gila - 25 Cabe)", biaya_tambahan: 4000 },
        ],
    },
    {
        id: "var-topping",
        nama_grup: "Ekstra Topping",
        wajib_pilih: false,
        opsi: [
            { nama: "Tambah Telur Ceplok / Dadar", biaya_tambahan: 4000 },
            { nama: "Tambah Keju Mozzarella Leleh", biaya_tambahan: 6000 },
            { nama: "Tambah Sambal Korek Ekstra", biaya_tambahan: 3000 },
            { nama: "Tambah Nori Crispy Tabur", biaya_tambahan: 3000 },
            { nama: "Ekstra Nasi Putih Pulen", biaya_tambahan: 5000 },
            { nama: "Kerupuk Bawang Kaleng (2 pcs)", biaya_tambahan: 2000 },
        ],
    },
    {
        id: "var-minuman",
        nama_grup: "Pilihan Es / Gula",
        wajib_pilih: false,
        opsi: [
            { nama: "Dingin (Es Normal)", biaya_tambahan: 0 },
            { nama: "Hangat / Panas", biaya_tambahan: 0 },
            { nama: "Less Sugar (Sedikit Gula)", biaya_tambahan: 0 },
        ],
    },
];

// ============================================================================
// 4. DAFTAR PRODUK (FOKUS: SUSHI, NASI GORENG, SUP UBI, AYAM GEPREK)
// ============================================================================
export const DUMMY_PRODUK = [
    // --- SUSHI ---
    {
        id: "prd-01",
        nama_menu: "Salmon Mentai Roll (6 pcs)",
        kategori_id: "kat-1",
        kategori_nama: "Sushi Corner",
        harga_jual: 35000,
        harga_modal: 18000,
        stok: 25,
        status: true,
        foto: "🍣",
        deskripsi: "Nasi sushi gulung isi kani & timun dengan topping potongan salmon segar dibakar saus mentai gurih.",
    },
    {
        id: "prd-02",
        nama_menu: "Crispy Chicken Teriyaki Roll",
        kategori_id: "kat-1",
        kategori_nama: "Sushi Corner",
        harga_jual: 25000,
        harga_modal: 12000,
        stok: 30,
        status: true,
        foto: "🍣",
        deskripsi: "Ayam fillet krispi berbalur saus teriyaki manis gurih dan mayones Jepang.",
    },
    {
        id: "prd-03",
        nama_menu: "Spicy Tuna Maki",
        kategori_id: "kat-1",
        kategori_nama: "Sushi Corner",
        harga_jual: 28000,
        harga_modal: 14000,
        stok: 20,
        status: true,
        foto: "🍣",
        deskripsi: "Tuna cincang pedas gurih dengan taburan wijen sangrai dan nori renyah.",
    },
    {
        id: "prd-04",
        nama_menu: "Kani Crab Mayo Roll",
        kategori_id: "kat-1",
        kategori_nama: "Sushi Corner",
        harga_jual: 22000,
        harga_modal: 10000,
        stok: 28,
        status: true,
        foto: "🍣",
        deskripsi: "Crabstick premium dengan saus mayo creamy dan kyuri timun segar jepang.",
    },

    // --- NASI GORENG ---
    {
        id: "prd-05",
        nama_menu: "Nasi Goreng Spesial + Telur & Ayam",
        kategori_id: "kat-2",
        kategori_nama: "Aneka Nasi Goreng",
        harga_jual: 22000,
        harga_modal: 9500,
        stok: 60,
        status: true,
        foto: "🍚",
        deskripsi: "Nasi goreng bumbu racik khas dengan suwiran ayam, bakso, telur mata sapi, dan acar kerupuk.",
    },
    {
        id: "prd-06",
        nama_menu: "Nasi Goreng Seafood (Udang & Cumi)",
        kategori_id: "kat-2",
        kategori_nama: "Aneka Nasi Goreng",
        harga_jual: 28000,
        harga_modal: 14000,
        stok: 40,
        status: true,
        foto: "🍚",
        deskripsi: "Nasi goreng oriental dengan udang segar, cumi kenyal, dan daun bawang wangi.",
    },
    {
        id: "prd-07",
        nama_menu: "Nasi Goreng Gila Sosis Bakso Pedas",
        kategori_id: "kat-2",
        kategori_nama: "Aneka Nasi Goreng",
        harga_jual: 25000,
        harga_modal: 11000,
        stok: 45,
        status: true,
        foto: "🍚",
        deskripsi: "Nasi goreng ditumpuk tumisan sosis, bakso, dan telur bumbu pedas manis melimpah.",
    },

    // --- SUP UBI ---
    {
        id: "prd-08",
        nama_menu: "Sup Ubi Daging Sapi Spesial",
        kategori_id: "kat-3",
        kategori_nama: "Sup Ubi Tradisional",
        harga_jual: 25000,
        harga_modal: 12500,
        stok: 35,
        status: true,
        foto: "🍲",
        deskripsi: "Sup ubi kayu empuk gurih khas Makassar disajikan dengan irisan daging sapi empuk, soun, tauge, telur rebus & kacang goreng.",
    },
    {
        id: "prd-09",
        nama_menu: "Sup Ubi Ayam Suwir Komplit",
        kategori_id: "kat-3",
        kategori_nama: "Sup Ubi Tradisional",
        harga_jual: 20000,
        harga_modal: 9000,
        stok: 40,
        status: true,
        foto: "🍲",
        deskripsi: "Sup ubi kaldu ayam bening kaya rempah dengan ayam suwir melimpah dan taburan seledri bawang goreng.",
    },
    {
        id: "prd-10",
        nama_menu: "Sup Ubi Paru Goreng Crispy",
        kategori_id: "kat-3",
        kategori_nama: "Sup Ubi Tradisional",
        harga_jual: 27000,
        harga_modal: 13000,
        stok: 25,
        status: true,
        foto: "🍲",
        deskripsi: "Sup ubi hangat dipadukan dengan topping paru sapi goreng bumbu gurih krispi.",
    },

    // --- AYAM GEPREK ---
    {
        id: "prd-11",
        nama_menu: "Paket Ayam Geprek Sambal Korek + Nasi",
        kategori_id: "kat-4",
        kategori_nama: "Ayam Geprek Crispy",
        harga_jual: 18000,
        harga_modal: 8500,
        stok: 70,
        status: true,
        foto: "🍗",
        deskripsi: "Ayam krispi digeprek hancur dengan ulekan cabai rawit bawang panas gurih + nasi putih hangat & lalapan timun.",
    },
    {
        id: "prd-12",
        nama_menu: "Paket Ayam Geprek Sambal Matah Bali + Nasi",
        kategori_id: "kat-4",
        kategori_nama: "Ayam Geprek Crispy",
        harga_jual: 20000,
        harga_modal: 9500,
        stok: 50,
        status: true,
        foto: "🍗",
        deskripsi: "Ayam geprek renyah disiram sambal matah segar serai, daun jeruk, dan perasan jeruk limau.",
    },
    {
        id: "prd-13",
        nama_menu: "Ayam Geprek Mozzarella Leleh (Ala Carte)",
        kategori_id: "kat-4",
        kategori_nama: "Ayam Geprek Crispy",
        harga_jual: 24000,
        harga_modal: 12000,
        stok: 40,
        status: true,
        foto: "🍗",
        deskripsi: "Ayam geprek pedas dibakar dengan lelehan keju mozzarella molor yang gurih mantap.",
    },

    // --- MINUMAN ---
    {
        id: "prd-14",
        nama_menu: "Es Teh Manis Jumbo",
        kategori_id: "kat-5",
        kategori_nama: "Minuman Segar & Kopi",
        harga_jual: 5000,
        harga_modal: 1500,
        stok: 150,
        status: true,
        foto: "🥤",
        deskripsi: "Teh melati wangi diseduh segar dengan es batu melimpah ukuran jumbo 22oz.",
    },
    {
        id: "prd-15",
        nama_menu: "Es Jeruk Peras Murni",
        kategori_id: "kat-5",
        kategori_nama: "Minuman Segar & Kopi",
        harga_jual: 8000,
        harga_modal: 3000,
        stok: 80,
        status: true,
        foto: "🍊",
        deskripsi: "Perasan jeruk manis asli segar kaya vitamin C.",
    },
    {
        id: "prd-16",
        nama_menu: "Lemon Tea Segar Dingin",
        kategori_id: "kat-5",
        kategori_nama: "Minuman Segar & Kopi",
        harga_jual: 10000,
        harga_modal: 3500,
        stok: 60,
        status: true,
        foto: "🍋",
        deskripsi: "Kombinasi teh wangi dengan irisan lemon asli menyegarkan dahaga.",
    },
    {
        id: "prd-17",
        nama_menu: "Ocha Dingin Jepang (Free Refill)",
        kategori_id: "kat-5",
        kategori_nama: "Minuman Segar & Kopi",
        harga_jual: 6000,
        harga_modal: 1200,
        stok: 100,
        status: true,
        foto: "🍵",
        deskripsi: "Teh hijau khas Jepang tanpa gula pendamping pas makan Sushi.",
    },
];

// ============================================================================
// 8. BAHAN BAKU (RAW MATERIALS / RESEP HPP)
// ============================================================================
export const DUMMY_BAHAN_BAKU = [
    { id: "bb-01", nama: "Daging Ayam Potong Segar", stok_kg: 25.5, satuan: "Kg", min_stok: 10, harga_satuan: 34000 },
    { id: "bb-02", nama: "Beras Pulen Premium", stok_kg: 75.0, satuan: "Kg", min_stok: 20, harga_satuan: 14500 },
    { id: "bb-03", nama: "Ubi Kayu Kupas Bersih", stok_kg: 30.0, satuan: "Kg", min_stok: 10, harga_satuan: 8000 },
    { id: "bb-04", nama: "Daging Sapi Rawon/Sup", stok_kg: 12.0, satuan: "Kg", min_stok: 5, harga_satuan: 120000 },
    { id: "bb-05", nama: "Fillet Salmon Fresh", stok_kg: 4.5, satuan: "Kg", min_stok: 2, harga_satuan: 220000 },
    { id: "bb-06", nama: "Lembaran Nori Sushi (Isi 50)", stok_kg: 8, satuan: "Pack", min_stok: 3, harga_satuan: 65000 },
    { id: "bb-07", nama: "Cabai Rawit Merah Setan", stok_kg: 6.2, satuan: "Kg", min_stok: 3, harga_satuan: 45000 },
    { id: "bb-08", nama: "Minyak Goreng Jerigen 5L", stok_kg: 6, satuan: "Jerigen", min_stok: 2, harga_satuan: 78000 },
    { id: "bb-09", nama: "Telur Ayam Ras (Piring/Rak)", stok_kg: 10, satuan: "Rak", min_stok: 3, harga_satuan: 52000 },
    { id: "bb-10", nama: "Keju Mozzarella Block 1Kg", stok_kg: 5.0, satuan: "Kg", min_stok: 2, harga_satuan: 98000 },
];

// ============================================================================
// 9. PENYESUAIAN STOK (OPNAME)
// ============================================================================
export const DUMMY_OPNAME = [
    {
        id: "opn-01",
        tanggal: "2026-08-28 22:30",
        item: "Daging Ayam Potong Segar",
        stok_sistem: 28.0,
        stok_fisik: 25.5,
        selisih: -2.5,
        satuan: "Kg",
        alasan: "Penyusutan pembersihan lemak & tulang ayam",
        petugas: "Chef Rudi (Dapur)",
    },
    {
        id: "opn-02",
        tanggal: "2026-08-28 22:35",
        item: "Fillet Salmon Fresh",
        stok_sistem: 5.0,
        stok_fisik: 4.5,
        selisih: -0.5,
        satuan: "Kg",
        alasan: "Trimming kulit salmon",
        petugas: "Chef Rudi (Dapur)",
    },
    {
        id: "opn-03",
        tanggal: "2026-08-27 22:00",
        item: "Telur Ayam Ras",
        stok_sistem: 11,
        stok_fisik: 10,
        selisih: -1,
        satuan: "Rak",
        alasan: "Pecah 4 butir saat pengiriman",
        petugas: "Siti Rahma (Kasir)",
    },
];

// ============================================================================
// 17. METODE PEMBAYARAN
// ============================================================================
export const DUMMY_METODE_BAYAR = [
    { id: "pay-cash", nama: "Tunai / Cash", tipe: "CASH", biaya_admin: 0, aktif: true, icon: "Banknote" },
    { id: "pay-qris", nama: "QRIS All Payment (BCA/Gopay/OVO/ShopeePay)", tipe: "QRIS", biaya_admin: 0.007, aktif: true, icon: "QrCode" },
    { id: "pay-bca", nama: "Transfer / Debit BCA", tipe: "DEBIT", biaya_admin: 0, aktif: true, icon: "CreditCard" },
    { id: "pay-mandiri", nama: "Transfer Bank Mandiri", tipe: "TRANSFER", biaya_admin: 0, aktif: true, icon: "Building" },
];

// ============================================================================
// 16. MANAJEMEN STAF / USERS
// ============================================================================
export const DUMMY_STAFF = [
    { id: "usr-1", nama: "Hendra Wijaya", username: "owner", role: "Owner / Pengelola", pin: "1234", status: "Aktif", shift: "Semua Shift" },
    { id: "usr-2", nama: "Siti Rahmawati", username: "kasir_pagi", role: "Kasir", pin: "1122", status: "Aktif", shift: "Shift Pagi (09:00 - 16:00)" },
    { id: "usr-3", nama: "Dimas Pratama", username: "kasir_malam", role: "Kasir", pin: "3344", status: "Aktif", shift: "Shift Malam (16:00 - 23:00)" },
    { id: "usr-4", nama: "Rudi Hartono", username: "chef_rudi", role: "Kepala Dapur (Kitchen)", pin: "5566", status: "Aktif", shift: "Shift Full" },
];

// ============================================================================
// 14. BONUS & KOMISI KARYAWAN (INSENTIF TARGET OMSET)
// ============================================================================
export const DUMMY_KOMISI_STAFF = [
    {
        staf_id: "usr-2",
        nama: "Siti Rahmawati (Kasir Pagi)",
        total_transaksi_ditangani: 184,
        omset_tercapai: 4850000,
        target_omset: 4000000,
        bonus_persen: "1.5%",
        total_bonus_didapat: 72750,
        status_cair: "Siap Dicairkan",
    },
    {
        staf_id: "usr-3",
        nama: "Dimas Pratama (Kasir Malam)",
        total_transaksi_ditangani: 242,
        omset_tercapai: 6920000,
        target_omset: 5500000,
        bonus_persen: "1.5%",
        total_bonus_didapat: 103800,
        status_cair: "Siap Dicairkan",
    },
    {
        staf_id: "usr-4",
        nama: "Rudi Hartono (Chef Dapur)",
        total_porsi_dimasak: 560,
        omset_tercapai: 11770000,
        target_omset: 10000000,
        bonus_persen: "2.0%",
        total_bonus_didapat: 235400,
        status_cair: "Siap Dicairkan",
    },
];

// ============================================================================
// 3. RIWAYAT TRANSAKSI & PESANAN AKTIF
// ============================================================================
export const DUMMY_TRANSAKSI = [
    {
        id: "TRX-20260829-001",
        nomor_meja: "Meja #03 (Dine In)",
        waktu: "2026-08-29 12:15",
        kasir: "Siti Rahmawati",
        metode_bayar: "QRIS",
        items: [
            { nama: "Salmon Mentai Roll (6 pcs)", qty: 2, harga: 35000, subtotal: 70000 },
            { nama: "Ocha Dingin (Free Refill)", qty: 2, harga: 6000, subtotal: 12000 },
        ],
        subtotal: 82000,
        diskon: 0,
        total_bayar: 82000,
        status: "Lunas",
    },
    {
        id: "TRX-20260829-002",
        nomor_meja: "Takeaway / Bungkus #01",
        waktu: "2026-08-29 12:28",
        kasir: "Siti Rahmawati",
        metode_bayar: "Tunai",
        items: [
            { nama: "Paket Ayam Geprek Sambal Korek + Nasi (Level 3)", qty: 3, harga: 20000, subtotal: 60000 },
            { nama: "Es Teh Manis Jumbo", qty: 3, harga: 5000, subtotal: 15000 },
            { nama: "Kerupuk Bawang Kaleng", qty: 2, harga: 2000, subtotal: 4000 },
        ],
        subtotal: 79000,
        diskon: 0,
        total_bayar: 79000,
        uang_diterima: 100000,
        kembalian: 21000,
        status: "Lunas",
    },
    {
        id: "TRX-20260829-003",
        nomor_meja: "Meja #07 (Dine In)",
        waktu: "2026-08-29 13:05",
        kasir: "Siti Rahmawati",
        metode_bayar: "Debit BCA",
        items: [
            { nama: "Sup Ubi Daging Sapi Spesial", qty: 2, harga: 25000, subtotal: 50000 },
            { nama: "Nasi Goreng Spesial + Telur", qty: 1, harga: 22000, subtotal: 22000 },
            { nama: "Es Jeruk Peras Murni", qty: 3, harga: 8000, subtotal: 24000 },
        ],
        subtotal: 96000,
        diskon: 5000, // Promo Voucher
        total_bayar: 91000,
        status: "Lunas",
    },
    {
        id: "TRX-20260829-004",
        nomor_meja: "Meja #02 (Dine In)",
        waktu: "2026-08-29 13:40",
        kasir: "Siti Rahmawati",
        metode_bayar: "Belum Bayar (Open Bill)",
        items: [
            { nama: "Spicy Tuna Maki", qty: 1, harga: 28000, subtotal: 28000 },
            { nama: "Ayam Geprek Mozzarella", qty: 1, harga: 24000, subtotal: 24000 },
            { nama: "Lemon Tea Segar Dingin", qty: 2, harga: 10000, subtotal: 20000 },
        ],
        subtotal: 72000,
        diskon: 0,
        total_bayar: 72000,
        status: "Proses Dapur / Aktif",
    },
];

// ============================================================================
// 10. ARUS KAS MASUK / KELUAR (CASHFLOW)
// ============================================================================
export const DUMMY_ARUS_KAS = [
    { id: "kas-01", waktu: "2026-08-29 08:30", tipe: "MASUK", kategori: "Modal Awal Kasir", uraian: "Uang kembalian laci pagi", nominal: 300000, pj: "Siti Rahma" },
    { id: "kas-02", waktu: "2026-08-29 09:15", tipe: "KELUAR", kategori: "Belanja Bahan Segar", uraian: "Beli Es Batu Balok 2 kantong & Jeruk Peras Pasar", nominal: 45000, pj: "Chef Rudi" },
    { id: "kas-03", waktu: "2026-08-29 10:00", tipe: "KELUAR", kategori: "Operasional", uraian: "Isi Ulang Gas LPG 3Kg (2 Tabung)", nominal: 44000, pj: "Chef Rudi" },
    { id: "kas-04", waktu: "2026-08-29 11:30", tipe: "KELUAR", kategori: "Perlengkapan", uraian: "Kertas Struk Kasir Thermal 58mm (1 Pack)", nominal: 25000, pj: "Siti Rahma" },
];

// ============================================================================
// 11. REKAP KASIR PER SHIFT
// ============================================================================
export const DUMMY_SHIFT_KASIR = {
    shift_id: "SHF-20260829-01",
    nama_kasir: "Siti Rahmawati",
    waktu_buka: "2026-08-29 08:30",
    waktu_tutup: "2026-08-29 16:00",
    kas_awal: 300000,
    total_penjualan_tunai: 1450000,
    total_penjualan_qris: 1820000,
    total_penjualan_debit: 650000,
    total_omset_shift: 3920000,
    total_kas_keluar_operasional: 114000,
    saldo_kas_laci_seharusnya: 1636000, // (Kas Awal + Tunai - Kas Keluar)
    saldo_kas_fisik_hitung: 1636000,
    selisih: 0, // Pas (Match)
    status: "Shift Selesai (Disetujui)",
};

// ============================================================================
// 12. LAPORAN PENJUALAN
// ============================================================================
export const DUMMY_LAPORAN_PENJUALAN = {
    periode: "Bulan Agustus 2026",
    total_transaksi: 1420,
    total_porsi_terjual: 3150,
    total_omset: 48650000,
    rata_rata_per_hari: 1621666,
    jam_teramai: "12:00 - 14:00 (Makan Siang) & 19:00 - 21:00 (Makan Malam)",
    penjualan_per_kategori: [
        { kategori: "Ayam Geprek Crispy", porsi: 1050, omset: 19950000, porsi_persen: 33.3 },
        { kategori: "Aneka Nasi Goreng", porsi: 820, omset: 18860000, porsi_persen: 26.0 },
        { kategori: "Sup Ubi Tradisional", porsi: 540, omset: 12960000, porsi_persen: 17.1 },
        { kategori: "Sushi Corner", porsi: 420, omset: 11760000, porsi_persen: 13.3 },
        { kategori: "Minuman & Topping", porsi: 1320, omset: 8120000, porsi_persen: 10.3 },
    ],
};

// ============================================================================
// 13. LAPORAN LABA RUGI (PROFIT & LOSS)
// ============================================================================
export const DUMMY_LABA_RUGI = {
    periode: "Bulan Agustus 2026",
    pendapatan_kotor: 48650000,
    hpp_bahan_baku: 21890000, // ~45% Food Cost
    laba_kotor: 26760000,
    beban_operasional: [
        { nama: "Gaji & Insentif Karyawan (4 Orang)", nominal: 9500000 },
        { nama: "Sewa Tempat / Ruko (Proporsional)", nominal: 2500000 },
        { nama: "Listrik, Air & WiFi", nominal: 1100000 },
        { nama: "Gas LPG 3Kg", nominal: 450000 },
        { nama: "Plastik, Kotak Takeaway & Kertas Struk", nominal: 750000 },
    ],
    total_beban_operasional: 14300000,
    laba_bersih: 12460000, // Net Profit bersih masuk kantong UMKM
    persentase_margin_bersih: "25.6%",
};

// ============================================================================
// 1. DASHBOARD OVERVIEW METRICS & TOP 5 MENU
// ============================================================================
export const DUMMY_DASHBOARD = {
    ringkasan_hari_ini: {
        total_omset: 3480000,
        pertumbuhan_omset: "+18.4%",
        total_transaksi: 54,
        total_porsi: 118,
        laba_bersih_estimasi: 980000,
    },
    top_5_menu_terlaris: [
        { ranking: 1, nama: "Paket Ayam Geprek Sambal Korek", porsi: 38, omset: 684000, tren: "🔥 Best Seller" },
        { ranking: 2, nama: "Nasi Goreng Spesial + Telur", porsi: 26, omset: 572000, tren: "⭐ Populer" },
        { ranking: 3, nama: "Salmon Mentai Roll (6 pcs)", porsi: 18, omset: 630000, tren: "⭐ Populer" },
        { ranking: 4, nama: "Sup Ubi Daging Sapi Spesial", porsi: 16, omset: 400000, tren: "📈 Meningkat" },
        { ranking: 5, nama: "Es Teh Manis Jumbo", porsi: 44, omset: 220000, tren: "🥤 Top Drink" },
    ],
    stok_menipis_alert: [
        { nama: "Cabai Rawit Merah", sisa: "1.2 Kg", batas_min: "3.0 Kg", status: "Perlu Belanja" },
        { nama: "Fillet Salmon Fresh", sisa: "1.0 Kg", batas_min: "2.0 Kg", status: "Perlu Belanja" },
    ],
};
