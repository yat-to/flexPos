export type BusinessType = 'food' | 'barbershop' | 'sport' | 'retail';

export interface UserProfile {
    id: string;
    name: string;
    username: string;
    storeName?: string;
    businessType?: BusinessType;
}

export interface MenuItem {
    id?: string;
    title: string;
    url?: string;
    icon?: string;
    children?: MenuItem[];
}

export interface Kategori {
    id: string;
    uraian: string;
    createdAt: string;
    index: number;
    businessType?: BusinessType;
}

export interface MenuData {
    id: string;
    nama_menu: string;
    harga: number;
    kategori_id: string;
    kategori_nama: string;
    status: boolean;
    foto: string;
    createdAt: string;
    durasi_menit?: number; // Khusus Barbershop atau Sewa Lapangan / Sport
    tipe_satuan?: string; // Porsi / Jam / Paket / Pcs
}