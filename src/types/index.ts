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
}