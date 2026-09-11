"use client";

import React, { useState } from "react";
import {
    Plus,
    Search,
    Edit3,
    Trash2,
    Layers,
    Boxes,
    Package,
    ArrowRight,
    X,
    Check,
    Grid,
    List,
    TrendingUp,
    Utensils,
    Flame,
    Coffee,
    Sparkles
} from "lucide-react";
import Link from "next/link";
import { DUMMY_KATEGORI, DUMMY_PRODUK } from "@/data/dummy";

interface CategoryItem {
    id: string;
    uraian: string;
    icon: string;
    total_produk: number;
    deskripsi?: string;
}

export default function KategoriProdukPage() {
    const [categories, setCategories] = useState<CategoryItem[]>(DUMMY_KATEGORI);
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

    // Modal States
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        uraian: "",
        iconEmoji: "🍱",
        deskripsi: "",
    });

    // Hitung total produk secara dinamis berdasarkan DUMMY_PRODUK
    const getProductCountByCategory = (catId: string) => {
        return DUMMY_PRODUK.filter((p) => p.kategori_id === catId).length;
    };

    // Filter Kategori
    const filteredCategories = categories.filter((cat) =>
        cat.uraian.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Buka Modal Tambah
    const handleOpenAdd = () => {
        setFormData({
            uraian: "",
            iconEmoji: "🍱",
            deskripsi: "",
        });
        setIsAddModalOpen(true);
    };

    // Buka Modal Edit
    const handleOpenEdit = (cat: CategoryItem) => {
        setSelectedCategory(cat);
        // Ekstrak emoji jika ada di awal nama
        const emojiMatch = cat.uraian.match(/^(\p{Emoji_Presentation}|\p{Extended_Pictographic})/u);
        const emoji = emojiMatch ? emojiMatch[0] : "🍱";
        const cleanName = cat.uraian.replace(/^[^\w\s]+/, "").trim();

        setFormData({
            uraian: cleanName,
            iconEmoji: emoji,
            deskripsi: cat.deskripsi || "",
        });
        setIsEditModalOpen(true);
    };

    // Buka Modal Hapus
    const handleOpenDelete = (cat: CategoryItem) => {
        setSelectedCategory(cat);
        setIsDeleteModalOpen(true);
    };

    // Simpan Kategori Baru
    const handleSaveAdd = (e: React.FormEvent) => {
        e.preventDefault();
        const newCategory: CategoryItem = {
            id: `kat-${Date.now()}`,
            uraian: `${formData.iconEmoji} ${formData.uraian}`,
            icon: "Utensils",
            total_produk: 0,
            deskripsi: formData.deskripsi,
        };

        setCategories([...categories, newCategory]);
        setIsAddModalOpen(false);
    };

    // Simpan Perubahan Edit
    const handleSaveEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCategory) return;

        setCategories((prev) =>
            prev.map((c) =>
                c.id === selectedCategory.id
                    ? {
                        ...c,
                        uraian: `${formData.iconEmoji} ${formData.uraian}`,
                        deskripsi: formData.deskripsi,
                    }
                    : c
            )
        );
        setIsEditModalOpen(false);
    };

    // Konfirmasi Hapus
    const handleConfirmDelete = () => {
        if (!selectedCategory) return;
        setCategories((prev) => prev.filter((c) => c.id !== selectedCategory.id));
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
                        <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-black">
                            <Layers size={22} />
                        </div>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                                Kategori Menu & Produk
                            </h1>
                            <p className="text-xs text-slate-500 font-medium">
                                Kelola pengelompokan menu kasir, ikon visual, dan struktur katalog usaha Anda
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2.5">
                    <button
                        onClick={handleOpenAdd}
                        className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2"
                    >
                        <Plus size={16} />
                        <span>Tambah Kategori Baru</span>
                    </button>
                </div>
            </div>

            {/* ========================================================================= */}
            {/* SEARCH & VIEW CONTROLS                                                    */}
            {/* ========================================================================= */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="w-full sm:w-80 relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari kategori menu..."
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

                <div className="flex items-center gap-2 self-end sm:self-center">
                    <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden p-0.5 bg-slate-50">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`p-1.5 rounded-lg transition-all ${
                                viewMode === "grid" ? "bg-white text-indigo-600 shadow-xs font-bold" : "text-slate-400 hover:text-slate-600"
                            }`}
                            title="Tampilan Kartu"
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

            {/* ========================================================================= */}
            {/* KONTEN KATEGORI (GRID / TABLE)                                            */}
            {/* ========================================================================= */}
            {filteredCategories.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                    <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                        <Layers size={26} />
                    </div>
                    <h3 className="text-base font-bold text-slate-800">Tidak ada kategori ditemukan</h3>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                        Coba periksa kata kunci pencarian Anda.
                    </p>
                </div>
            ) : viewMode === "grid" ? (
                /* ----------------- MODE GRID (KARTU KATEGORI) ----------------- */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredCategories.map((cat, index) => {
                        const productCount = getProductCountByCategory(cat.id);

                        return (
                            <div
                                key={cat.id}
                                className="bg-white rounded-2xl border border-slate-200/90 hover:border-indigo-300 hover:shadow-md transition-all duration-200 p-5 flex flex-col justify-between group"
                            >
                                <div>
                                    <div className="flex items-start justify-between">
                                        <div className="w-14 h-14 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-center text-3xl shadow-xs">
                                            {cat.uraian.match(/^(\p{Emoji_Presentation}|\p{Extended_Pictographic})/u)?.[0] || "📁"}
                                        </div>

                                        <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleOpenEdit(cat)}
                                                className="p-1.5 hover:bg-indigo-50 hover:text-indigo-600 text-slate-400 rounded-lg transition-colors"
                                                title="Edit Kategori"
                                            >
                                                <Edit3 size={15} />
                                            </button>
                                            <button
                                                onClick={() => handleOpenDelete(cat)}
                                                className="p-1.5 hover:bg-red-50 hover:text-red-600 text-slate-400 rounded-lg transition-colors"
                                                title="Hapus Kategori"
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <h3 className="font-extrabold text-base text-slate-800">
                                            {cat.uraian.replace(/^[^\w\s]+/, "").trim()}
                                        </h3>
                                        <p className="text-xs text-slate-400 mt-0.5">
                                            Urutan Tampilan: #{index + 1} di Tab Kasir
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                                    <span className="text-xs font-bold text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                                        {productCount} Menu Terdaftar
                                    </span>

                                    <Link
                                        href="/produk"
                                        className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
                                    >
                                        <span>Kelola Menu</span>
                                        <ArrowRight size={13} />
                                    </Link>
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
                                    <th className="py-3.5 px-4 w-12 text-center">#</th>
                                    <th className="py-3.5 px-4">Nama Kategori & Ikon</th>
                                    <th className="py-3.5 px-4 text-center">Jumlah Produk</th>
                                    <th className="py-3.5 px-4 text-center">Posisi Kasir</th>
                                    <th className="py-3.5 px-4 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                                {filteredCategories.map((cat, index) => (
                                    <tr key={cat.id} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="py-3.5 px-4 text-center font-bold text-slate-400">
                                            {index + 1}
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl">
                                                    {cat.uraian.match(/^(\p{Emoji_Presentation}|\p{Extended_Pictographic})/u)?.[0] || "📁"}
                                                </span>
                                                <span className="font-bold text-slate-900 text-sm">
                                                    {cat.uraian.replace(/^[^\w\s]+/, "").trim()}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3.5 px-4 text-center">
                                            <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-xs">
                                                {getProductCountByCategory(cat.id)} Produk
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4 text-center">
                                            <span className="text-xs font-semibold text-slate-500">
                                                Tab #{index + 1}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4 text-center">
                                            <div className="flex items-center justify-center gap-1.5">
                                                <button
                                                    onClick={() => handleOpenEdit(cat)}
                                                    className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit3 size={15} />
                                                </button>
                                                <button
                                                    onClick={() => handleOpenDelete(cat)}
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
            {/* MODAL TAMBAH KATEGORI                                                     */}
            {/* ========================================================================= */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-md w-full border border-slate-100 shadow-2xl p-6 animate-in zoom-in-95">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <div>
                                <h3 className="text-lg font-black text-slate-900">Tambah Kategori Baru</h3>
                                <p className="text-xs text-slate-500">Kategori akan langsung menjadi tab filter di Kasir POS</p>
                            </div>
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleSaveAdd} className="space-y-4 mt-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">
                                    Ikon / Emoji Kategori
                                </label>
                                <div className="grid grid-cols-6 gap-2">
                                    {["🍱", "🍚", "🍲", "🍗", "🥤", "☕", "🍟", "🥗", "🥩", "🍰", "💈", "⚽"].map((emoji) => (
                                        <button
                                            key={emoji}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, iconEmoji: emoji })}
                                            className={`p-2.5 rounded-xl border text-xl flex items-center justify-center transition-all ${
                                                formData.iconEmoji === emoji
                                                    ? "bg-indigo-50 border-indigo-500 ring-2 ring-indigo-500/20"
                                                    : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                                            }`}
                                        >
                                            {emoji}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">
                                    Nama Kategori <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.uraian}
                                    onChange={(e) => setFormData({ ...formData, uraian: e.target.value })}
                                    placeholder="Contoh: Aneka Jus Buah"
                                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">
                                    Deskripsi (Opsional)
                                </label>
                                <textarea
                                    rows={2}
                                    value={formData.deskripsi}
                                    onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                                    placeholder="Keterangan singkat kategori..."
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
                                    Simpan Kategori
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ========================================================================= */}
            {/* MODAL EDIT KATEGORI                                                       */}
            {/* ========================================================================= */}
            {isEditModalOpen && selectedCategory && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-md w-full border border-slate-100 shadow-2xl p-6 animate-in zoom-in-95">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <div>
                                <h3 className="text-lg font-black text-slate-900">Edit Kategori</h3>
                                <p className="text-xs text-slate-500">Perbarui nama atau ikon kategori</p>
                            </div>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleSaveEdit} className="space-y-4 mt-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">
                                    Ikon / Emoji Kategori
                                </label>
                                <div className="grid grid-cols-6 gap-2">
                                    {["🍱", "🍚", "🍲", "🍗", "🥤", "☕", "🍟", "🥗", "🥩", "🍰", "💈", "⚽"].map((emoji) => (
                                        <button
                                            key={emoji}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, iconEmoji: emoji })}
                                            className={`p-2.5 rounded-xl border text-xl flex items-center justify-center transition-all ${
                                                formData.iconEmoji === emoji
                                                    ? "bg-indigo-50 border-indigo-500 ring-2 ring-indigo-500/20"
                                                    : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                                            }`}
                                        >
                                            {emoji}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">
                                    Nama Kategori <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.uraian}
                                    onChange={(e) => setFormData({ ...formData, uraian: e.target.value })}
                                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">
                                    Deskripsi (Opsional)
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
            {/* MODAL HAPUS KATEGORI                                                      */}
            {/* ========================================================================= */}
            {isDeleteModalOpen && selectedCategory && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-sm w-full border border-slate-100 shadow-2xl p-6 text-center animate-in zoom-in-95">
                        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3">
                            <Trash2 size={24} />
                        </div>
                        <h3 className="text-base font-black text-slate-900">Hapus Kategori?</h3>
                        <p className="text-xs text-slate-500 mt-1">
                            Apakah kamu yakin ingin menghapus kategori <strong>"{selectedCategory.uraian}"</strong>?
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
