export type JenisUsaha = 'food' | 'barbershop' | 'sport' | 'retail' | string;
export type BusinessType = JenisUsaha; // Alias backward-compatibility

export interface JenisUsahaItem {
    id: string;
    code: string;
    name: string;
    description?: string;
    icon?: string;
    createdAt?: string;
    updatedAt?: string;
}
export type BusinessTypeItem = JenisUsahaItem; // Alias backward-compatibility

export interface UserProfile {
    id: string;
    name: string;
    username: string;
    storeName?: string;
    businessType?: JenisUsaha;
    role?: 'superadmin' | 'merchant' | string;
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
    businessType?: JenisUsaha;
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