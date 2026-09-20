"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { Plus, ChevronLeft, ChevronRight, Edit, Trash2, X } from 'lucide-react';
import { Kategori, BusinessType } from '@/types';
import { useAuthStore } from '@/store/authStore';
import { API_ENDPOINTS } from '@/services/api';
import toast, { Toaster } from 'react-hot-toast';

export default function Page() {
    // Ambil auth state (user & token) dari useAuthStore
    const user = useAuthStore((state) => state.user);
    const token = useAuthStore((state) => state.token);

    // State data lokal di halaman Kategori
    const [list_kategori, setListKategori] = useState<Kategori[]>([]);
    const [jml_data, setJmlData] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedBusinessType, setSelectedBusinessType] = useState<BusinessType>(
        user?.businessType || 'food'
    );

    // Paginasi
    const [page_first, setPageFirst] = useState(1);
    const limit = 10;

    // Modal State
    const [modalAddOpen, setModalAddOpen] = useState(false);
    const [modalEditOpen, setModalEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const [form, setForm] = useState({
        id: '',
        uraian: '',
    });

    // ============================================================
    // FUNGSI TANGKAP DATA LANGSUNG DARI BACKEND DI HALAMAN INI
    // ============================================================
    const fetchKategori = useCallback(async (page: number = 1, search: string = "") => {
        setLoading(true);
        setError(null);

        try {
            const queryParams = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
                search,
                businessType: selectedBusinessType,
            });

            const res = await fetch(`${API_ENDPOINTS.CATEGORIES}?${queryParams}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                },
            });

            if (!res.ok) {
                // Jika backend belum menyediakan endpoint atau error
                if (res.status === 404) {
                    console.warn(`[KATEGORI PAGE] Endpoint ${API_ENDPOINTS.CATEGORIES} belum siap di backend.`);
                    setListKategori([]);
                    setJmlData(1);
                    return;
                }
                throw new Error(`Gagal mengambil data dari server (${res.status})`);
            }

            const data = await res.json();

            // Tangani variasi format respon dari backend (apakah array langsung atau paginated object)
            if (Array.isArray(data)) {
                setListKategori(data);
                setJmlData(Math.ceil(data.length / limit) || 1);
            } else if (data && data.items) {
                setListKategori(data.items);
                setJmlData(data.totalPages || 1);
            } else {
                setListKategori([]);
                setJmlData(1);
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Terjadi kesalahan saat memuat data';
            setError(message);
        } finally {
            setLoading(false);
        }
    }, [token, limit, selectedBusinessType]);

    // Load data setiap kali halaman atau tipe bisnis berganti
    useEffect(() => {
        fetchKategori(page_first, "");
    }, [page_first, fetchKategori]);

    // ============================================================
    // MODAL HANDLERS
    // ============================================================
    const openAddModal = () => {
        setForm({
            id: '',
            uraian: '',
        });
        setModalAddOpen(true);
    };

    const openEditModal = (data: Kategori) => {
        setForm({
            id: data.id,
            uraian: data.uraian,
        });
        setModalEditOpen(true);
    };

    const openDeleteModal = (data: Kategori) => {
        setForm({
            id: data.id,
            uraian: data.uraian,
        });
        setDeleteOpen(true);
    };

    // ============================================================
    // PAGINASI HANDLERS
    // ============================================================
    const handleNext = () => {
        setPageFirst((prev) => prev + 1);
    };

    const handlePrev = () => {
        setPageFirst((prev) => Math.max(prev - 1, 1));
    };

    const indexing = (index: number) => {
        return (page_first - 1) * limit + index + 1;
    };

    // ============================================================
    // AKSI CRUD LANGSUNG KE BACKEND
    // ============================================================
    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(API_ENDPOINTS.CATEGORIES, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                },
                body: JSON.stringify({
                    uraian: form.uraian,
                    businessType: selectedBusinessType,
                }),
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.message || 'Gagal menambah kategori');
            }

            toast.success('Sukses Tambah Data!');
            setModalAddOpen(false);
            fetchKategori(page_first, "");
        } catch (err) {
            const msg = err instanceof Error ? err.message : 'Gagal menambah data';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${API_ENDPOINTS.CATEGORIES}/${form.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                },
                body: JSON.stringify({
                    uraian: form.uraian,
                }),
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.message || 'Gagal memperbarui kategori');
            }

            toast.success('Sukses Edit Data!');
            setModalEditOpen(false);
            fetchKategori(page_first, "");
        } catch (err) {
            const msg = err instanceof Error ? err.message : 'Gagal memperbarui data';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        setLoading(true);

        try {
            const res = await fetch(`${API_ENDPOINTS.CATEGORIES}/${form.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                },
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.message || 'Gagal menghapus kategori');
            }

            toast.success('Berhasil dihapus!');
            setDeleteOpen(false);
            fetchKategori(page_first, "");
        } catch (err) {
            const msg = err instanceof Error ? err.message : 'Gagal menghapus data';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    const getPageNumbers = () => {
        const maxButtons = 4;
        let startPage = Math.max(1, page_first - Math.floor(maxButtons / 2));
        let endPage = startPage + maxButtons - 1;

        if (endPage > jml_data) {
            endPage = jml_data;
            startPage = Math.max(1, endPage - maxButtons + 1);
        }

        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="space-y-6 pb-10">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Manajemen Kategori FlexPOS</h1>
                    <p className="text-xs text-gray-500 mt-0.5">
                        Kategori produk/layanan dinamis yang disesuaikan dengan jenis operasional bisnis Anda.
                    </p>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => openAddModal()} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all">
                        <Plus size={18} />
                        <span>Tambah Kategori</span>
                    </button>
                </div>
            </div>

            {/* Quick Industry Switcher Tabs */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                    <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                        Template Kategori Industri:
                    </span>
                    <span className="text-xs text-indigo-600 font-semibold">
                        Toko Aktif: {user?.storeName || "FlexPOS"}
                    </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                        { id: 'food' as BusinessType, label: '🍔 F&B / Kuliner', desc: 'Resto, Cafe, Warkop' },
                        { id: 'barbershop' as BusinessType, label: '💈 Barbershop & Jasa', desc: 'Styling, Shaving, Spa' },
                        { id: 'sport' as BusinessType, label: '⚽ Sport & Arena', desc: 'Sewa Lapangan & Alat' },
                        { id: 'retail' as BusinessType, label: '🛍️ Retail & Toko', desc: 'Fashion, Sembako, SKU' },
                    ].map((item) => {
                        const isActive = selectedBusinessType === item.id;
                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => {
                                    setSelectedBusinessType(item.id);
                                    toast.success(`Beralih ke template kategori ${item.label.split(' ')[1]}`);
                                }}
                                className={`p-2.5 rounded-xl border text-left transition-all ${
                                    isActive
                                        ? "bg-indigo-50/80 border-indigo-300 text-indigo-900 ring-2 ring-indigo-500/20 shadow-xs"
                                        : "bg-gray-50/70 border-gray-200 text-gray-600 hover:bg-white hover:border-gray-300"
                                }`}
                            >
                                <div className="text-xs font-bold">{item.label}</div>
                                <div className="text-[10px] text-gray-400 mt-0.5">{item.desc}</div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                    ⚠️ {error}
                </div>
            )}

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse border-spacing-0 table-fixed">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center border-b border-r border-gray-200 w-16">NO</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center border-b border-r border-gray-200">URAIAN</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center border-b border-gray-200 w-32">AKSI</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">
                                        Memuat data...
                                    </td>
                                </tr>
                            ) : list_kategori.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">
                                        Tidak ada data kategori.
                                    </td>
                                </tr>
                            ) : (
                                list_kategori.map((data, index) => (
                                    <tr key={data.id || index} className="hover:bg-blue-50/30 transition-colors group">
                                        <td className="px-6 py-4 text-center border-b border-r border-gray-200">
                                            <span className="text-sm text-gray-800">{indexing(index)}</span>
                                        </td>
                                        <td className="px-6 py-4 border-b border-r border-gray-200">
                                            <span className="text-sm text-gray-800">{data.uraian}</span>
                                        </td>
                                        <td className="px-6 py-4 border-b border-gray-200">
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => openEditModal(data)} className="p-2 text-yellow-600 rounded-lg" title="Edit">
                                                    <Edit size={16} />
                                                </button>
                                                <button onClick={() => openDeleteModal(data)} className="p-2 text-red-600 rounded-lg" title="Hapus">
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

                <div className="px-6 py-4 border-t border-gray-200 bg-white flex flex-col items-center gap-3">
                    <div className="flex items-center gap-1">
                        <button
                            onClick={handlePrev}
                            disabled={page_first <= 1 || loading}
                            className="p-1.5 mr-1 border border-gray-200 rounded-md text-gray-400 hover:bg-gray-50 hover:text-blue-600 transition-all disabled:opacity-30"
                        >
                            <ChevronLeft size={16} />
                        </button>

                        <div className="flex gap-1">
                            {getPageNumbers().map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setPageFirst(page)}
                                    className={`w-8 h-8 flex items-center justify-center rounded-md border text-xs font-bold transition-all ${
                                        page_first === page
                                            ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                                            : "border-transparent text-gray-500 hover:border-gray-200 hover:bg-gray-50"
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={handleNext}
                            disabled={page_first >= (jml_data || 1) || loading}
                            className="p-1.5 ml-1 border border-gray-200 rounded-md text-gray-400 hover:bg-gray-50 hover:text-blue-600 transition-all disabled:opacity-30"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {modalAddOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-none p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="font-bold text-gray-800 text-lg">
                                Tambah data
                            </h3>
                            <button onClick={() => setModalAddOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>

                        <form className="p-6 space-y-4" onSubmit={handleAdd}>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Kategori</label>
                                <input
                                    type="text"
                                    value={form.uraian}
                                    onChange={(e) => setForm({ ...form, uraian: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm transition-all"
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-4 border-t border-gray-50">
                                <button
                                    type="button"
                                    onClick={() => setModalAddOpen(false)}
                                    className="px-4 py-2 border border-gray-200 text-gray-500 text-xs font-semibold hover:bg-gray-100 rounded-lg transition-all"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            <span>Proses...</span>
                                        </div>
                                    ) : 'Simpan Data'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {modalEditOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="px-6 py-4 border-b bg-orange-400 flex justify-between items-center text-white">
                            <h3 className="font-bold text-lg">Edit Data</h3>
                            <button onClick={() => setModalEditOpen(false)} className="text-white hover:opacity-70"><X size={20} /></button>
                        </div>
                        <form onSubmit={handleEdit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Uraian</label>
                                <input type="text" required value={form.uraian} onChange={(e) => setForm({ ...form, uraian: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-50 text-gray-900 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm transition-all"
                                />
                            </div>
                            <div className="flex justify-end gap-2 pt-4 border-t border-gray-50">
                                <button type="button" onClick={() => setModalEditOpen(false)} className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-50">Batal</button>
                                <button type="submit" disabled={loading} className="px-6 py-2 bg-orange-400 text-white rounded-lg text-sm font-semibold hover:bg-yellow-700 shadow-md disabled:opacity-50">
                                    {loading ? 'Proses...' : 'Update Data'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {deleteOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 animate-in fade-in zoom-in duration-200">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                                <Trash2 size={24} />
                            </div>
                            <h3 className="font-bold text-gray-800 text-lg">Hapus Kategori?</h3>
                            <p className="text-sm text-gray-500 mt-1">
                                Anda akan menghapus kategori <span className="font-bold text-gray-800">{form.uraian}</span>. Tindakan ini tidak dapat dibatalkan.
                            </p>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button type="button" onClick={() => setDeleteOpen(false)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-50">
                                Batal
                            </button>
                            <button type="button" onClick={handleDelete} disabled={loading} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 shadow-md disabled:opacity-50">
                                {loading ? 'Proses...' : 'Hapus'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}