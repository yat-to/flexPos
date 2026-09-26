"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Edit, Trash2, X, Store, Search, Layers, RefreshCw } from 'lucide-react';
import { BusinessTypeItem } from '@/types';
import { API_ENDPOINTS } from '@/services/api';
import toast, { Toaster } from 'react-hot-toast';

export default function JenisUsahaPage() {
    const [listData, setListData] = useState<BusinessTypeItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>('');

    // Modal State
    const [modalAddOpen, setModalAddOpen] = useState(false);
    const [modalEditOpen, setModalEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const [form, setForm] = useState({
        id: '',
        name: '',
        code: '',
        description: '',
        icon: 'Store',
    });

    // ============================================================
    // FETCH DATA LANGSUNG KE BACKEND
    // ============================================================
    const fetchBusinessTypes = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(API_ENDPOINTS.JENIS_USAHA);
            if (!res.ok) {
                throw new Error(`Gagal memuat jenis usaha (${res.status})`);
            }
            const data = await res.json();
            setListData(Array.isArray(data) ? data : []);
        } catch (err) {
            const msg = err instanceof Error ? err.message : 'Terjadi kesalahan saat memuat data';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBusinessTypes();
    }, [fetchBusinessTypes]);

    // ============================================================
    // MODAL HANDLERS
    // ============================================================
    const openAddModal = () => {
        setForm({
            id: '',
            name: '',
            code: '',
            description: '',
            icon: 'Store',
        });
        setModalAddOpen(true);
    };

    const openEditModal = (item: BusinessTypeItem) => {
        setForm({
            id: item.id,
            name: item.name,
            code: item.code,
            description: item.description || '',
            icon: item.icon || 'Store',
        });
        setModalEditOpen(true);
    };

    const openDeleteModal = (item: BusinessTypeItem) => {
        setForm({
            id: item.id,
            name: item.name,
            code: item.code,
            description: item.description || '',
            icon: item.icon || 'Store',
        });
        setDeleteOpen(true);
    };

    // ============================================================
    // CRUD HANDLERS KE BACKEND
    // ============================================================
    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name.trim()) {
            toast.error('Nama jenis usaha wajib diisi!');
            return;
        }

        const toastId = toast.loading('Menyimpan jenis usaha baru...');
        try {
            const res = await fetch(API_ENDPOINTS.JENIS_USAHA, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: form.name.trim(),
                    code: form.code.trim() || undefined,
                    description: form.description.trim(),
                    icon: form.icon.trim() || 'Store',
                }),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Gagal menambah jenis usaha');
            }

            toast.success('Jenis usaha berhasil ditambahkan!', { id: toastId });
            setModalAddOpen(false);
            fetchBusinessTypes();
        } catch (err) {
            const msg = err instanceof Error ? err.message : 'Gagal menyimpan data';
            toast.error(msg, { id: toastId });
        }
    };

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        const toastId = toast.loading('Memperbarui data...');
        try {
            const res = await fetch(`${API_ENDPOINTS.JENIS_USAHA}/${form.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: form.name.trim(),
                    code: form.code.trim() || undefined,
                    description: form.description.trim(),
                    icon: form.icon.trim() || 'Store',
                }),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Gagal memperbarui jenis usaha');
            }

            toast.success('Jenis usaha berhasil diperbarui!', { id: toastId });
            setModalEditOpen(false);
            fetchBusinessTypes();
        } catch (err) {
            const msg = err instanceof Error ? err.message : 'Gagal memperbarui data';
            toast.error(msg, { id: toastId });
        }
    };

    const handleDelete = async () => {
        const toastId = toast.loading('Menghapus jenis usaha...');
        try {
            const res = await fetch(`${API_ENDPOINTS.JENIS_USAHA}/${form.id}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.message || 'Gagal menghapus jenis usaha');
            }

            toast.success('Jenis usaha berhasil dihapus!', { id: toastId });
            setDeleteOpen(false);
            fetchBusinessTypes();
        } catch (err) {
            const msg = err instanceof Error ? err.message : 'Gagal menghapus data';
            toast.error(msg, { id: toastId });
        }
    };

    // Filter data berdasarkan search
    const filteredList = listData.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="space-y-6 pb-12">
            <Toaster position="top-center" />

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                            <Layers size={22} />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">Master Jenis Usaha</h1>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                        Kelola jenis usaha dinamis yang menjadi pilihan utama saat pengguna mendaftarkan akun di FlexPOS.
                    </p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={fetchBusinessTypes}
                        className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2.5 rounded-xl text-sm font-semibold shadow-xs transition-all"
                        title="Muat Ulang"
                    >
                        <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                        <span>Refresh</span>
                    </button>
                    <button
                        onClick={openAddModal}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all"
                    >
                        <Plus size={18} />
                        <span>Tambah Jenis Usaha</span>
                    </button>
                </div>
            </div>

            {/* PENCARIAN & STATISTIK */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="relative w-full sm:w-80">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                        <Search size={16} />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari jenis usaha / kode..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 text-gray-900 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    />
                </div>
                <div className="text-xs text-gray-500 font-medium">
                    Total: <span className="font-bold text-indigo-600">{listData.length}</span> jenis usaha aktif
                </div>
            </div>

            {/* TABEL DATA */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse border-spacing-0">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center w-16">NO</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">JENIS USAHA</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-40">KODE SISTEM</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">KETERANGAN / DESKRIPSI</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center w-28">AKSI</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-500">
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                                            <span>Memuat data dari database PostgreSQL...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredList.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-500">
                                        Tidak ada data jenis usaha yang ditemukan.
                                    </td>
                                </tr>
                            ) : (
                                filteredList.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                                        <td className="px-6 py-4 text-center text-xs font-semibold text-gray-500">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                                                    <Store size={18} />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-gray-900">{item.name}</div>
                                                    <div className="text-[11px] text-gray-400">ID: {item.id.slice(0, 8)}...</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-block px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono font-semibold rounded-lg">
                                                {item.code}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-gray-600">
                                            {item.description || <span className="text-gray-400 italic">- Tidak ada deskripsi -</span>}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-1.5">
                                                <button
                                                    onClick={() => openEditModal(item)}
                                                    className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg transition-all"
                                                    title="Edit"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => openDeleteModal(item)}
                                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                    title="Hapus"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODAL TAMBAH */}
            {modalAddOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-indigo-50/50">
                            <h3 className="font-bold text-gray-800 text-base">Tambah Jenis Usaha Baru</h3>
                            <button onClick={() => setModalAddOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleAdd} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                                    Nama Usaha <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    placeholder="Contoh: Petshop & Vet, Carwash, Laundry"
                                    required
                                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-gray-900"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                                    Kode Sistem (Opsional)
                                </label>
                                <input
                                    type="text"
                                    value={form.code}
                                    onChange={(e) => setForm({ ...form, code: e.target.value })}
                                    placeholder="Kosongkan untuk otomatis (contoh: petshop)"
                                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-gray-900"
                                />
                                <span className="text-[10px] text-gray-400 mt-0.5 block">
                                    Digunakan sistem sebagai identifikasi jenis operasional.
                                </span>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                                    Deskripsi / Sub-label
                                </label>
                                <textarea
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    placeholder="Contoh: Makanan hewan, perawatan, grooming"
                                    rows={3}
                                    className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-gray-900"
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setModalAddOpen(false)}
                                    className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-xs font-semibold hover:bg-gray-50"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs"
                                >
                                    Simpan Jenis Usaha
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL EDIT */}
            {modalEditOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-amber-50/50">
                            <h3 className="font-bold text-gray-800 text-base">Edit Jenis Usaha</h3>
                            <button onClick={() => setModalEditOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleEdit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                                    Nama Usaha
                                </label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    required
                                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-gray-900"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                                    Kode Sistem
                                </label>
                                <input
                                    type="text"
                                    value={form.code}
                                    onChange={(e) => setForm({ ...form, code: e.target.value })}
                                    required
                                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-gray-900"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                                    Deskripsi / Sub-label
                                </label>
                                <textarea
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    rows={3}
                                    className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-gray-900"
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setModalEditOpen(false)}
                                    className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-xs font-semibold hover:bg-gray-50"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold shadow-xs"
                                >
                                    Perbarui
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL HAPUS */}
            {deleteOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-4">
                                <Trash2 size={24} />
                            </div>
                            <h3 className="font-bold text-gray-900 text-base">Hapus Jenis Usaha?</h3>
                            <p className="text-xs text-gray-500 mt-1">
                                Anda akan menghapus jenis usaha <span className="font-bold text-gray-800">{form.name}</span> (<code className="text-xs">{form.code}</code>). Tindakan ini tidak dapat dibatalkan.
                            </p>
                        </div>
                        <div className="flex gap-2 mt-6">
                            <button
                                type="button"
                                onClick={() => setDeleteOpen(false)}
                                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-xs font-semibold hover:bg-gray-50"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold shadow-xs"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
