"use client";

import React, { useState } from "react";
import {
    Plus,
    Search,
    Filter,
    Edit3,
    Trash2,
    Eye,
    CheckCircle2,
    XCircle,
    AlertTriangle,
    TrendingUp,
    Package,
    Layers,
    DollarSign,
    Boxes,
    X,
    Check,
    Grid,
    List,
    SlidersHorizontal,
    ArrowUpDown,
    Flame,
    ShoppingBag,
    ChefHat,
    Image as ImageIcon
} from "lucide-react";
import Link from "next/link";
import { DUMMY_PRODUK, DUMMY_KATEGORI, DUMMY_VARIAN } from "@/data/dummy";

interface ProductItem {
    id: string;
    nama_menu: string;
    kategori_id: string;
    kategori_nama: string;
    harga_jual: number;
    harga_modal: number;
    stok: number;
    status: boolean;
    foto: string;
    deskripsi: string;
    varian_ids?: string[];
}

export default function ProdukPage() {
    // State Data Produk
    const [products, setProducts] = useState<ProductItem[]>(DUMMY_PRODUK);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive" | "low_stock">("all");
    const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

    // Modal States
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

    // Form State (Untuk Tambah & Edit)
    const [formData, setFormData] = useState({
        nama_menu: "",
        kategori_id: DUMMY_KATEGORI[0]?.id || "",
        harga_jual: 0,
        harga_modal: 0,
        stok: 50,
        status: true,
        foto: "🍱",
        deskripsi: "",
    });

    // Perhitungan Statistik Cepat (KPI)
    const totalProducts = products.length;
    const activeProducts = products.filter((p) => p.status).length;
    const lowStockProducts = products.filter((p) => p.stok < 10).length;
    const totalAssetValue = products.reduce((acc, p) => acc + p.harga_modal * p.stok, 0);

    // Filter Produk
    const filteredProducts = products.filter((item) => {
        const matchSearch = item.nama_menu.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.kategori_nama.toLowerCase().includes(searchQuery.toLowerCase());
        const matchCategory = selectedCategory === "all" || item.kategori_id === selectedCategory;
        
        let matchStatus = true;
        if (statusFilter === "active") matchStatus = item.status === true;
        if (statusFilter === "inactive") matchStatus = item.status === false;
        if (statusFilter === "low_stock") matchStatus = item.stok < 10;

        return matchSearch && matchCategory && matchStatus;
    });

    // Handler Buka Modal Tambah
    const handleOpenAdd = () => {
        setFormData({
            nama_menu: "",
            kategori_id: DUMMY_KATEGORI[0]?.id || "kat-1",
            harga_jual: 0,
            harga_modal: 0,
            stok: 50,
            status: true,
            foto: "🍱",
            deskripsi: "",
        });
        setIsAddModalOpen(true);
    };

    // Handler Buka Modal Edit
    const handleOpenEdit = (product: ProductItem) => {
        setSelectedProduct(product);
        setFormData({
            nama_menu: product.nama_menu,
            kategori_id: product.kategori_id,
            harga_jual: product.harga_jual,
            harga_modal: product.harga_modal,
            stok: product.stok,
            status: product.status,
            foto: product.foto,
            deskripsi: product.deskripsi,
        });
        setIsEditModalOpen(true);
    };

    // Handler Buka Modal Detail
    const handleOpenDetail = (product: ProductItem) => {
        setSelectedProduct(product);
        setIsDetailModalOpen(true);
    };

    // Handler Buka Modal Hapus
    const handleOpenDelete = (product: ProductItem) => {
        setSelectedProduct(product);
        setIsDeleteModalOpen(true);
    };

    // Toggle Status Langsung (Tersedia / Habis)
    const handleToggleStatus = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setProducts((prev) =>
            prev.map((p) => (p.id === id ? { ...p, status: !p.status } : p))
        );
    };

    // Simpan Produk Baru
    const handleSaveAdd = (e: React.FormEvent) => {
        e.preventDefault();
        const selectedKat = DUMMY_KATEGORI.find((k) => k.id === formData.kategori_id);
        const newProduct: ProductItem = {
            id: `prd-${Date.now()}`,
            nama_menu: formData.nama_menu,
            kategori_id: formData.kategori_id,
            kategori_nama: selectedKat ? selectedKat.uraian.replace(/^[^\w\s]+/, '').trim() : "Umum",
            harga_jual: Number(formData.harga_jual),
            harga_modal: Number(formData.harga_modal),
            stok: Number(formData.stok),
            status: formData.status,
            foto: formData.foto || "🍱",
            deskripsi: formData.deskripsi,
        };

        setProducts([newProduct, ...products]);
        setIsAddModalOpen(false);
    };

    // Simpan Perubahan Edit
    const handleSaveEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedProduct) return;

        const selectedKat = DUMMY_KATEGORI.find((k) => k.id === formData.kategori_id);
        setProducts((prev) =>
            prev.map((p) =>
                p.id === selectedProduct.id
                    ? {
                        ...p,
                        nama_menu: formData.nama_menu,
                        kategori_id: formData.kategori_id,
                        kategori_nama: selectedKat ? selectedKat.uraian.replace(/^[^\w\s]+/, '').trim() : p.kategori_nama,
                        harga_jual: Number(formData.harga_jual),
                        harga_modal: Number(formData.harga_modal),
                        stok: Number(formData.stok),
                        status: formData.status,
                        foto: formData.foto,
                        deskripsi: formData.deskripsi,
                    }
                    : p
            )
        );
        setIsEditModalOpen(false);
    };

    // Hapus Produk
    const handleConfirmDelete = () => {
        if (!selectedProduct) return;
        setProducts((prev) => prev.filter((p) => p.id !== selectedProduct.id));
        setIsDeleteModalOpen(false);
    };

    return (
        <div className="space-y-6 font-sans pb-12">

            {/* ========================================================================= */}
            {/* HEADER & ACTION BUTTONS                                                   */}
            {/* ========================================================================= */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black">
                            <Package size={22} />
                        </div>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                                Daftar Produk & Layanan
                            </h1>
                            <p className="text-xs text-slate-500 font-medium">
                                Kelola katalog menu, harga jual, estimasi HPP, dan stok yang terhubung ke Kasir POS
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tombol Aksi Cepat */}
                <div className="flex items-center gap-2.5">
                    <Link
                        href="/produk/varian"
                        className="px-3.5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                    >
                        <Layers size={15} className="text-indigo-600" />
                        <span>Kelola Varian</span>
                    </Link>

                    <button
                        onClick={handleOpenAdd}
                        className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2"
                    >
                        <Plus size={16} />
                        <span>Tambah Produk Baru</span>
                    </button>
                </div>
            </div>

            {/* ========================================================================= */}
            {/* METRICS & RINGKASAN PRODUK                                                */}
            {/* ========================================================================= */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                    <div>
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Produk</p>
                        <p className="text-xl font-black text-slate-900 mt-0.5">{totalProducts} Item</p>
                        <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">● {activeProducts} Tersedia di Kasir</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                        <Boxes size={20} />
                    </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                    <div>
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Stok Menipis</p>
                        <p className={`text-xl font-black mt-0.5 ${lowStockProducts > 0 ? "text-amber-600" : "text-slate-900"}`}>
                            {lowStockProducts} Menu
                        </p>
                        <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Perlu restok segera</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                        <AlertTriangle size={20} />
                    </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                    <div>
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Nilai Aset Stok (HPP)</p>
                        <p className="text-xl font-black text-slate-900 mt-0.5">Rp {(totalAssetValue / 1000).toFixed(0)}k</p>
                        <p className="text-[10px] text-indigo-600 font-semibold mt-0.5">Modal bahan baku tercatat</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                        <DollarSign size={20} />
                    </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                    <div>
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Kategori Menu</p>
                        <p className="text-xl font-black text-slate-900 mt-0.5">{DUMMY_KATEGORI.length} Kategori</p>
                        <Link href="/produk/kategori" className="text-[10px] text-indigo-600 font-bold hover:underline mt-0.5 block">
                            Atur Kategori →
                        </Link>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                        <Layers size={20} />
                    </div>
                </div>
            </div>

            {/* ========================================================================= */}
            {/* SEARCH, FILTER & VIEW CONTROLS                                            */}
            {/* ========================================================================= */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3.5">
                <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                    {/* Search Bar */}
                    <div className="w-full md:w-80 relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari nama menu, sushi, sup ubi..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>

                    {/* Filter Status & View Mode */}
                    <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
                        {/* Filter Status Dropdown */}
                        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                            <button
                                onClick={() => setStatusFilter("all")}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                    statusFilter === "all" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-700"
                                }`}
                            >
                                Semua
                            </button>
                            <button
                                onClick={() => setStatusFilter("active")}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                    statusFilter === "active" ? "bg-white text-emerald-600 shadow-xs" : "text-slate-500 hover:text-slate-700"
                                }`}
                            >
                                Tersedia
                            </button>
                            <button
                                onClick={() => setStatusFilter("low_stock")}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                    statusFilter === "low_stock" ? "bg-white text-amber-600 shadow-xs" : "text-slate-500 hover:text-slate-700"
                                }`}
                            >
                                Stok Tipis
                            </button>
                        </div>

                        {/* View Switcher (Grid vs Table) */}
                        <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden p-0.5 bg-slate-50">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`p-1.5 rounded-lg transition-all ${
                                    viewMode === "grid" ? "bg-white text-indigo-600 shadow-xs font-bold" : "text-slate-400 hover:text-slate-600"
                                }`}
                                title="Tampilan Grid"
                            >
                                <Grid size={16} />
                            </button>
                            <button
                                onClick={() => setViewMode("table")}
                                className={`p-1.5 rounded-lg transition-all ${
                                    viewMode === "table" ? "bg-white text-indigo-600 shadow-xs font-bold" : "text-slate-400 hover:text-slate-600"
                                }`}
                                title="Tampilan Tabel"
                            >
                                <List size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Filter Kategori (Pills) */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-1 border-t border-slate-100">
                    <button
                        onClick={() => setSelectedCategory("all")}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                            selectedCategory === "all"
                                ? "bg-indigo-600 text-white shadow-xs"
                                : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100"
                        }`}
                    >
                        Semua Kategori ({products.length})
                    </button>
                    {DUMMY_KATEGORI.map((kat) => (
                        <button
                            key={kat.id}
                            onClick={() => setSelectedCategory(kat.id)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                                selectedCategory === kat.id
                                    ? "bg-indigo-600 text-white shadow-xs"
                                    : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100"
                            }`}
                        >
                            <span>{kat.uraian}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* ========================================================================= */}
            {/* KONTEN UTAMA: GRID ATAU TABEL                                             */}
            {/* ========================================================================= */}
            {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                        <Package size={28} />
                    </div>
                    <h3 className="text-base font-bold text-slate-800">Tidak ada produk ditemukan</h3>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                        Coba sesuaikan kata kunci pencarian atau ganti filter kategori menu di atas.
                    </p>
                    <button
                        onClick={() => {
                            setSearchQuery("");
                            setSelectedCategory("all");
                            setStatusFilter("all");
                        }}
                        className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
                    >
                        Reset Semua Filter
                    </button>
                </div>
            ) : viewMode === "grid" ? (
                /* ----------------- MODE GRID (KARTU PRODUK) ----------------- */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredProducts.map((product) => {
                        const marginNominal = product.harga_jual - product.harga_modal;
                        const marginPercent = product.harga_jual > 0 ? Math.round((marginNominal / product.harga_jual) * 100) : 0;

                        return (
                            <div
                                key={product.id}
                                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col justify-between hover:shadow-md ${
                                    product.status
                                        ? "border-slate-200/90 hover:border-indigo-300"
                                        : "border-slate-200 bg-slate-50/50 opacity-75"
                                }`}
                            >
                                <div>
                                    {/* Header Kartu: Emoji / Icon & Badges */}
                                    <div className="p-4 bg-gradient-to-b from-slate-50/80 to-transparent flex items-start justify-between">
                                        <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-3xl shrink-0">
                                            {product.foto}
                                        </div>

                                        <div className="flex flex-col items-end gap-1.5">
                                            {/* Status Badge & Toggle Button */}
                                            <button
                                                onClick={(e) => handleToggleStatus(product.id, e)}
                                                className={`px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all ${
                                                    product.status
                                                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                                                        : "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
                                                }`}
                                                title="Klik untuk mengubah status di kasir"
                                            >
                                                <span className={`w-1.5 h-1.5 rounded-full ${product.status ? "bg-emerald-500" : "bg-red-500"}`}></span>
                                                <span>{product.status ? "Tersedia" : "Habis"}</span>
                                            </button>

                                            {/* Stok Badge */}
                                            <span
                                                className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                                    product.stok < 10
                                                        ? "bg-amber-100 text-amber-800"
                                                        : "bg-slate-100 text-slate-600"
                                                }`}
                                            >
                                                Stok: {product.stok}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Konten Menu */}
                                    <div className="px-4 pb-3">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                                            {product.kategori_nama}
                                        </span>
                                        <h3 className="font-extrabold text-sm text-slate-800 mt-1.5 line-clamp-1">
                                            {product.nama_menu}
                                        </h3>
                                        <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                                            {product.deskripsi || "Menu favorit pelanggan yang disajikan segar."}
                                        </p>
                                    </div>
                                </div>

                                {/* Bagian Bawah: Harga & Tombol Aksi */}
                                <div className="px-4 py-3 bg-slate-50/70 border-t border-slate-100">
                                    <div className="flex items-baseline justify-between mb-2">
                                        <div>
                                            <p className="text-[10px] text-slate-400 font-semibold">Harga Jual</p>
                                            <p className="text-base font-black text-slate-900">
                                                Rp {product.harga_jual.toLocaleString("id-ID")}
                                            </p>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-[10px] text-slate-400 font-semibold">Margin Untung</p>
                                            <p className="text-xs font-bold text-emerald-600">
                                                +{marginPercent}% (Rp {(marginNominal / 1000).toFixed(0)}k)
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-1.5 pt-2 border-t border-slate-200/60">
                                        <button
                                            onClick={() => handleOpenDetail(product)}
                                            className="flex-1 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1"
                                        >
                                            <Eye size={13} />
                                            <span>Detail</span>
                                        </button>
                                        <button
                                            onClick={() => handleOpenEdit(product)}
                                            className="p-1.5 bg-white border border-slate-200 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 rounded-lg transition-all"
                                            title="Edit Menu"
                                        >
                                            <Edit3 size={14} />
                                        </button>
                                        <button
                                            onClick={() => handleOpenDelete(product)}
                                            className="p-1.5 bg-white border border-slate-200 hover:bg-red-50 hover:text-red-600 text-slate-700 rounded-lg transition-all"
                                            title="Hapus Menu"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                /* ----------------- MODE TABEL ----------------- */
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                    <th className="py-3.5 px-4">Menu & Produk</th>
                                    <th className="py-3.5 px-4">Kategori</th>
                                    <th className="py-3.5 px-4 text-right">Harga Modal (HPP)</th>
                                    <th className="py-3.5 px-4 text-right">Harga Jual</th>
                                    <th className="py-3.5 px-4 text-center">Stok</th>
                                    <th className="py-3.5 px-4 text-center">Status Kasir</th>
                                    <th className="py-3.5 px-4 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                                {filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="py-3.5 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-xl shrink-0">
                                                    {product.foto}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900">{product.nama_menu}</p>
                                                    <p className="text-[11px] text-slate-400 line-clamp-1">{product.deskripsi}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold text-[11px]">
                                                {product.kategori_nama}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4 text-right font-semibold text-slate-500">
                                            Rp {product.harga_modal.toLocaleString("id-ID")}
                                        </td>
                                        <td className="py-3.5 px-4 text-right font-black text-slate-900">
                                            Rp {product.harga_jual.toLocaleString("id-ID")}
                                        </td>
                                        <td className="py-3.5 px-4 text-center">
                                            <span className={`px-2 py-1 rounded-md font-bold text-xs ${
                                                product.stok < 10 ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-700"
                                            }`}>
                                                {product.stok}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4 text-center">
                                            <button
                                                onClick={(e) => handleToggleStatus(product.id, e)}
                                                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold inline-flex items-center gap-1.5 transition-all ${
                                                    product.status
                                                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                                        : "bg-red-50 text-red-700 border border-red-200"
                                                }`}
                                            >
                                                <span className={`w-1.5 h-1.5 rounded-full ${product.status ? "bg-emerald-500" : "bg-red-500"}`}></span>
                                                <span>{product.status ? "Tersedia" : "Habis"}</span>
                                            </button>
                                        </td>
                                        <td className="py-3.5 px-4 text-center">
                                            <div className="flex items-center justify-center gap-1">
                                                <button
                                                    onClick={() => handleOpenDetail(product)}
                                                    className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                    title="Detail"
                                                >
                                                    <Eye size={15} />
                                                </button>
                                                <button
                                                    onClick={() => handleOpenEdit(product)}
                                                    className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit3 size={15} />
                                                </button>
                                                <button
                                                    onClick={() => handleOpenDelete(product)}
                                                    className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Hapus"
                                                >
                                                    <Trash2 size={15} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* ========================================================================= */}
            {/* MODAL TAMBAH PRODUK                                                       */}
            {/* ========================================================================= */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-slate-100 shadow-2xl p-6 animate-in zoom-in-95">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                            <div>
                                <h3 className="text-lg font-black text-slate-900">Tambah Produk Baru</h3>
                                <p className="text-xs text-slate-500">Isi data produk untuk ditampilkan di Kasir POS</p>
                            </div>
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleSaveAdd} className="space-y-4 mt-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">
                                    Nama Menu / Layanan <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.nama_menu}
                                    onChange={(e) => setFormData({ ...formData, nama_menu: e.target.value })}
                                    placeholder="Contoh: Nasi Goreng Spesial Telur"
                                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:border-indigo-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Kategori <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={formData.kategori_id}
                                        onChange={(e) => setFormData({ ...formData, kategori_id: e.target.value })}
                                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500"
                                    >
                                        {DUMMY_KATEGORI.map((kat) => (
                                            <option key={kat.id} value={kat.id}>
                                                {kat.uraian}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Ikon / Emoji Produk
                                    </label>
                                    <select
                                        value={formData.foto}
                                        onChange={(e) => setFormData({ ...formData, foto: e.target.value })}
                                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500"
                                    >
                                        <option value="🍱">🍱 Sushi / Bento</option>
                                        <option value="🍣">🍣 Salmon / Maki</option>
                                        <option value="🍚">🍚 Nasi Goreng</option>
                                        <option value="🍲">🍲 Sup Ubi / Kuah</option>
                                        <option value="🍗">🍗 Ayam Geprek</option>
                                        <option value="🥤">🥤 Minuman Es</option>
                                        <option value="☕">☕ Kopi / Teh</option>
                                        <option value="🍟">🍟 Snack / Kentang</option>
                                        <option value="💈">💈 Jasa / Cukur</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Harga Modal HPP (Rp)
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.harga_modal || ""}
                                        onChange={(e) => setFormData({ ...formData, harga_modal: Number(e.target.value) })}
                                        placeholder="12000"
                                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-indigo-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Harga Jual (Rp) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        value={formData.harga_jual || ""}
                                        onChange={(e) => setFormData({ ...formData, harga_jual: Number(e.target.value) })}
                                        placeholder="25000"
                                        className="w-full px-3.5 py-2.5 bg-white border border-indigo-300 rounded-xl text-xs font-black text-indigo-900 focus:outline-none focus:border-indigo-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Stok Awal
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.stok}
                                        onChange={(e) => setFormData({ ...formData, stok: Number(e.target.value) })}
                                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-indigo-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Status Ketersediaan
                                    </label>
                                    <select
                                        value={formData.status ? "true" : "false"}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value === "true" })}
                                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500"
                                    >
                                        <option value="true">✅ Langsung Tersedia di Kasir</option>
                                        <option value="false">❌ Non-aktif / Habis</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">
                                    Deskripsi Produk
                                </label>
                                <textarea
                                    rows={2}
                                    value={formData.deskripsi}
                                    onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                                    placeholder="Tuliskan komposisi atau keunggulan menu..."
                                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-indigo-500"
                                />
                            </div>

                            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="px-4 py-2.5 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl transition-all"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition-all"
                                >
                                    Simpan Produk
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ========================================================================= */}
            {/* MODAL EDIT PRODUK                                                         */}
            {/* ========================================================================= */}
            {isEditModalOpen && selectedProduct && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-slate-100 shadow-2xl p-6 animate-in zoom-in-95">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                            <div>
                                <h3 className="text-lg font-black text-slate-900">Edit Data Produk</h3>
                                <p className="text-xs text-slate-500">Perbarui harga, stok, atau status menu</p>
                            </div>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleSaveEdit} className="space-y-4 mt-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">
                                    Nama Menu / Layanan <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.nama_menu}
                                    onChange={(e) => setFormData({ ...formData, nama_menu: e.target.value })}
                                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:border-indigo-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Kategori
                                    </label>
                                    <select
                                        value={formData.kategori_id}
                                        onChange={(e) => setFormData({ ...formData, kategori_id: e.target.value })}
                                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500"
                                    >
                                        {DUMMY_KATEGORI.map((kat) => (
                                            <option key={kat.id} value={kat.id}>
                                                {kat.uraian}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Ikon / Emoji
                                    </label>
                                    <select
                                        value={formData.foto}
                                        onChange={(e) => setFormData({ ...formData, foto: e.target.value })}
                                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500"
                                    >
                                        <option value="🍱">🍱 Sushi / Bento</option>
                                        <option value="🍣">🍣 Salmon / Maki</option>
                                        <option value="🍚">🍚 Nasi Goreng</option>
                                        <option value="🍲">🍲 Sup Ubi / Kuah</option>
                                        <option value="🍗">🍗 Ayam Geprek</option>
                                        <option value="🥤">🥤 Minuman Es</option>
                                        <option value="☕">☕ Kopi / Teh</option>
                                        <option value="🍟">🍟 Snack / Kentang</option>
                                        <option value="💈">💈 Jasa / Cukur</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Harga Modal HPP (Rp)
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.harga_modal}
                                        onChange={(e) => setFormData({ ...formData, harga_modal: Number(e.target.value) })}
                                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-indigo-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Harga Jual (Rp) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        value={formData.harga_jual}
                                        onChange={(e) => setFormData({ ...formData, harga_jual: Number(e.target.value) })}
                                        className="w-full px-3.5 py-2.5 bg-white border border-indigo-300 rounded-xl text-xs font-black text-indigo-900 focus:outline-none focus:border-indigo-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Stok
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.stok}
                                        onChange={(e) => setFormData({ ...formData, stok: Number(e.target.value) })}
                                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-indigo-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Status
                                    </label>
                                    <select
                                        value={formData.status ? "true" : "false"}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value === "true" })}
                                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500"
                                    >
                                        <option value="true">✅ Tersedia di Kasir</option>
                                        <option value="false">❌ Non-aktif / Habis</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">
                                    Deskripsi
                                </label>
                                <textarea
                                    rows={2}
                                    value={formData.deskripsi}
                                    onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-indigo-500"
                                />
                            </div>

                            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-4 py-2.5 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl transition-all"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition-all"
                                >
                                    Simpan Perubahan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ========================================================================= */}
            {/* MODAL DETAIL PRODUK                                                       */}
            {/* ========================================================================= */}
            {isDetailModalOpen && selectedProduct && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-md w-full border border-slate-100 shadow-2xl p-6 animate-in zoom-in-95">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <h3 className="text-base font-black text-slate-900">Detail Produk</h3>
                            <button
                                onClick={() => setIsDetailModalOpen(false)}
                                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="mt-4 space-y-4">
                            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-4xl shadow-xs shrink-0">
                                    {selectedProduct.foto}
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md uppercase">
                                        {selectedProduct.kategori_nama}
                                    </span>
                                    <h4 className="font-black text-base text-slate-900 mt-1">
                                        {selectedProduct.nama_menu}
                                    </h4>
                                    <p className={`text-xs font-bold mt-0.5 ${selectedProduct.status ? "text-emerald-600" : "text-red-500"}`}>
                                        ● {selectedProduct.status ? "Tersedia di Kasir" : "Stok Habis / Nonaktif"}
                                    </p>
                                </div>
                            </div>

                            <p className="text-xs text-slate-600 bg-slate-50/50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                                {selectedProduct.deskripsi || "Tidak ada deskripsi tambahan."}
                            </p>

                            <div className="grid grid-cols-2 gap-2.5">
                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase">Harga Modal (HPP)</p>
                                    <p className="text-sm font-bold text-slate-700 mt-0.5">
                                        Rp {selectedProduct.harga_modal.toLocaleString("id-ID")}
                                    </p>
                                </div>
                                <div className="bg-indigo-50/60 p-3 rounded-xl border border-indigo-100">
                                    <p className="text-[10px] text-indigo-500 font-bold uppercase">Harga Jual</p>
                                    <p className="text-sm font-black text-indigo-900 mt-0.5">
                                        Rp {selectedProduct.harga_jual.toLocaleString("id-ID")}
                                    </p>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase">Sisa Stok</p>
                                    <p className="text-sm font-bold text-slate-800 mt-0.5">
                                        {selectedProduct.stok} Porsi / Item
                                    </p>
                                </div>
                                <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-100">
                                    <p className="text-[10px] text-emerald-600 font-bold uppercase">Margin Profit</p>
                                    <p className="text-sm font-black text-emerald-800 mt-0.5">
                                        +Rp {(selectedProduct.harga_jual - selectedProduct.harga_modal).toLocaleString("id-ID")}
                                    </p>
                                </div>
                            </div>

                            <div className="pt-2">
                                <Link
                                    href="/kasir"
                                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
                                >
                                    <ShoppingBag size={14} />
                                    <span>Buka di Layanan Kasir (POS)</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ========================================================================= */}
            {/* MODAL HAPUS PRODUK                                                        */}
            {/* ========================================================================= */}
            {isDeleteModalOpen && selectedProduct && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-sm w-full border border-slate-100 shadow-2xl p-6 text-center animate-in zoom-in-95">
                        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3">
                            <Trash2 size={24} />
                        </div>
                        <h3 className="text-base font-black text-slate-900">Hapus Produk?</h3>
                        <p className="text-xs text-slate-500 mt-1">
                            Apakah kamu yakin ingin menghapus <strong>"{selectedProduct.nama_menu}"</strong> dari katalog? Tindakan ini tidak dapat dibatalkan.
                        </p>

                        <div className="flex items-center justify-center gap-2.5 mt-5">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="flex-1 py-2.5 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl transition-all"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-md transition-all"
                            >
                                Ya, Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
