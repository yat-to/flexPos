"use client";
import React, { useState, useRef } from "react";
import {
    Plus,
    Trash2,
    X,
    ChevronLeft,
    ChevronRight,
    Eye,
    Ellipsis,
    Edit
} from "lucide-react";

import { menuData } from "@/data/menuData";
import { MenuData } from "@/types";

export default function Page() {
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [detailModal, setDetailModal] = useState(false);
    
    const [selectedProduct, setSelectedProduct] = useState<MenuData | null>(null);
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

    const toggleDropdown = (id: string) => {
        setOpenDropdownId(openDropdownId === id ? null : id);
    };

    const openAdd = () => {
        setSelectedProduct(null);
        setAddModal(true);
    };

    const openEdit = (item: MenuData) => {
        setSelectedProduct(item);
        setEditModal(true);
    };

    const openDeleteModal = (item: MenuData) => {
        setSelectedProduct(item);
        setDeleteOpen(true);
    };

    const openDetail = (item: MenuData) => {
        setSelectedProduct(item);
        setDetailModal(true);
    };

    return (
        <div className="space-y-6 pb-10 min-h-screen">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Menu</h1>
                </div>

                <button onClick={() => openAdd()} className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-md transition-all active:scale-95">
                    <Plus size={18} />
                    <span>Tambah Data</span>
                </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="p-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 bg-gray-50/50">
                        {menuData.map((data: MenuData) => (
                            <div key={data.id} className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all relative overflow-hidden group flex flex-col">
                                {/* Gambar & Badge Top */}
                                <div className="relative h-48 w-full bg-gray-100">
                                    <img
                                        src={data.foto}
                                        alt={data.nama_menu}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-3 left-3">
                                        <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-[10px] font-bold px-2.5 py-1.5 rounded-md shadow-sm uppercase tracking-wider">
                                            {data.kategori_nama || "Kategori"}
                                        </span>
                                    </div>

                                    <div className="absolute bottom-3 left-3">
                                        <span className={`backdrop-blur-md text-[10px] font-bold px-2.5 py-1.5 rounded-md shadow-sm uppercase tracking-wider flex items-center gap-1.5 ${
                                            data.status === true 
                                            ? 'bg-green-100/90 text-green-700' 
                                            : 'bg-red-100/90 text-red-700'
                                        }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${data.status === true ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                            {data.status === true ? 'Tersedia' : 'Tidak Tersedia'}
                                        </span>
                                    </div>
                                    
                                    <div className="absolute top-3 right-3">
                                        <div className="relative">
                                            <button
                                                onClick={() => toggleDropdown(data.id)}
                                                className="p-1.5 bg-white/90 backdrop-blur-sm hover:bg-white rounded-md text-gray-700 shadow-sm transition-colors focus:outline-none"
                                            >
                                                <Ellipsis size={18} />
                                            </button>

                                            {openDropdownId === data.id && (
                                                <>
                                                    <div
                                                        className="fixed inset-0 z-40"
                                                        onClick={() => setOpenDropdownId(null)}
                                                    ></div>

                                                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in duration-150 origin-top-right">
                                                        <button
                                                            onClick={() => { openDetail(data); setOpenDropdownId(null); }}
                                                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                                                        >
                                                            <Eye size={16} /> Detail
                                                        </button>

                                                        <button
                                                            onClick={() => { openEdit(data); setOpenDropdownId(null); }}
                                                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                                                        >
                                                            <Edit size={16} /> Edit
                                                        </button>

                                                        <hr className="my-1 border-gray-100" />

                                                        <button
                                                            onClick={() => { openDeleteModal(data); setOpenDropdownId(null); }}
                                                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors"
                                                        >
                                                            <Trash2 size={16} /> Hapus
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 flex-grow flex flex-col">
                                    <h3 className={`text-base font-bold leading-snug mb-2 line-clamp-2 ${data.status === true ? 'text-gray-800' : 'text-gray-400'}`}>
                                        {data.nama_menu}
                                    </h3>
                                    <div className="mt-auto">
                                        <div className={`text-xl font-black mb-4 ${data.status === true ? 'text-gray-900' : 'text-gray-400 line-through'}`}>
                                            Rp{(data.harga || 0).toLocaleString("id-ID")}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="px-6 py-4 border-t border-gray-200 bg-white flex justify-between items-center">
                    <span className="text-xs text-gray-500 hidden sm:block">Halaman 1 dari 1</span>
                    <div className="flex items-center gap-2 mx-auto sm:mx-0">
                        <button className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 transition-all disabled:opacity-50">
                            <ChevronLeft size={16} />
                        </button>
                        <button className="w-9 h-9 bg-blue-600 text-white text-xs font-bold rounded-lg shadow-sm shadow-blue-200">
                            1
                        </button>
                        <button className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 transition-all disabled:opacity-50">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>

                {addModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="font-bold text-gray-800 text-lg">
                                    {selectedProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
                                </h3>
                                <button onClick={() => setAddModal(false)} className="text-gray-400 hover:text-gray-600">
                                    <X size={20} />
                                </button>
                            </div>

                            <form className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 tracking-wider">Kategori</label>
                                    <select
                                        defaultValue={selectedProduct?.kategori_id || ''}
                                    className="w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm transition-all"
                                    >
                                        <option value="">Pilih Kategori</option>
                                        <option value="1">Makanan</option>
                                        <option value="2">Minuman</option>
                                        <option value="3">Snack</option>
                                        <option value="4">Desert</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 tracking-wider">Nama Menu</label>
                                    <input
                                        type="text"
                                        defaultValue={selectedProduct?.nama_menu || ''}
                                        className="w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 tracking-wider">Harga</label>
                                    <input
                                        type="number"
                                        defaultValue={selectedProduct?.harga || ''}
                                        className="w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 tracking-wider">URL Foto Produk</label>
                                    <input
                                        type="text"
                                        placeholder="https://..."
                                        defaultValue={selectedProduct?.foto || ''}
                                    className="w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm transition-all"
                                    />
                                </div>

                                {/* TAMBAHAN: Pilih Status di Form */}
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 tracking-wider">Status Menu</label>
                                    <select
                                        defaultValue={selectedProduct?.status === false ? 'false' : 'true'}
                                    className="w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm transition-all"
                                    >
                                        <option value="true">Aktif</option>
                                        <option value="false">Tidak Tersedia</option>
                                    </select>
                                </div>

                                <div className="flex gap-3 pt-4 border-t border-gray-50">
                                    <button
                                        type="button"
                                        onClick={() => setAddModal(false)}
                                        className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-lg text-sm font-bold hover:bg-gray-50 transition-all"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 shadow-md shadow-blue-100 transition-all"
                                    >
                                        {selectedProduct ? 'Simpan Perubahan' : 'Tambah Produk'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {editModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="font-bold text-gray-800 text-lg">
                                    Edit Produk
                                </h3>
                                <button onClick={() => setEditModal(false)} className="text-gray-400 hover:text-gray-600">
                                    <X size={20} />
                                </button>
                            </div>

                            <form className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 tracking-wider">Kategori</label>
                                    <select
                                        defaultValue={selectedProduct?.kategori_id || ''}
                                    className="w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm transition-all"
                                    >
                                        <option value="">Pilih Kategori</option>
                                        <option value="1">Makanan</option>
                                        <option value="2">Minuman</option>
                                        <option value="3">Snack</option>
                                        <option value="4">Desert</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 tracking-wider">Nama Menu</label>
                                    <input
                                        type="text"
                                        defaultValue={selectedProduct?.nama_menu || ''}
                                        className="w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 tracking-wider">Harga</label>
                                    <input
                                        type="number"
                                        defaultValue={selectedProduct?.harga || ''}
                                        className="w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 tracking-wider">URL Foto Produk</label>
                                    <input
                                        type="text"
                                        placeholder="https://..."
                                        defaultValue={selectedProduct?.foto || ''}
                                    className="w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm transition-all"
                                    />
                                </div>

                                {/* TAMBAHAN: Pilih Status di Form */}
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 tracking-wider">Status Menu</label>
                                    <select
                                        defaultValue={selectedProduct?.status === false ? 'false' : 'true'}
                                    className="w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm transition-all"
                                    >
                                        <option value="true">Aktif</option>
                                        <option value="false">Tidak Tersedia</option>
                                    </select>
                                </div>

                                <div className="flex gap-3 pt-4 border-t border-gray-50">
                                    <button
                                        type="button"
                                        onClick={() => setAddModal(false)}
                                        className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-lg text-sm font-bold hover:bg-gray-50 transition-all"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 shadow-md shadow-blue-100 transition-all"
                                    >
                                        {selectedProduct ? 'Simpan Perubahan' : 'Tambah Produk'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {deleteOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 animate-in fade-in zoom-in duration-200">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                                    <Trash2 size={24} />
                                </div>
                                <h3 className="font-bold text-gray-800 text-lg">Hapus Data?</h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    Anda akan menghapus data <span className="font-bold text-gray-800">{selectedProduct?.nama || selectedProduct?.uraian_kategori}</span>. Tindakan ini tidak dapat dibatalkan.
                                </p>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setDeleteOpen(false)}
                                    className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-50"
                                >
                                    Batal
                                </button>
                                <button
                                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 shadow-md shadow-red-200"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal Detail Produk */}
                {detailModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                            <div className="relative h-56 w-full bg-gray-100">
                                <img
                                    src={selectedProduct?.foto || "/placeholder-image.jpg"}
                                    alt={selectedProduct?.nama || selectedProduct?.uraian_kategori}
                                    className="w-full h-full object-cover"
                                />
                                <button 
                                    onClick={() => setDetailModal(false)} 
                                    className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                            <div className="p-6">
                                <div className="flex gap-2 mb-3">
                                    <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                                        {selectedProduct?.kategori || "Kategori"}
                                    </span>
                                    {/* === TAMBAHAN: STATUS DI DETAIL === */}
                                    <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${
                                        selectedProduct?.status === true ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                        {selectedProduct?.status === true ? 'Aktif' : 'Tidak Tersedia'}
                                    </span>
                                    {/* ================================ */}
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 mb-2">
                                    {selectedProduct?.nama || selectedProduct?.uraian_kategori}
                                </h2>
                                <p className="text-sm text-gray-600 mb-6 text-justify leading-relaxed">
                                    {selectedProduct?.keterangan || "Tidak ada keterangan tersedia."}
                                </p>
                                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Harga Jual</p>
                                        <p className="text-lg font-black text-gray-900">
                                            Rp{(selectedProduct?.harga_jual || 0).toLocaleString("id-ID")}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Stok Tersedia</p>
                                        <p className="text-lg font-black text-blue-600">
                                            {selectedProduct?.stok || 0}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}