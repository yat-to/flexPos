"use client";

import React, { useState } from "react";
import {
    Plus,
    Search,
    Edit3,
    Trash2,
    Layers,
    Flame,
    PlusCircle,
    CheckCircle2,
    XCircle,
    Check,
    X,
    Sparkles,
    ShoppingBag,
    DollarSign,
    SlidersHorizontal,
    Info,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import { DUMMY_VARIAN } from "@/data/dummy";

interface VarianOption {
    nama: string;
    biaya_tambahan: number;
}

interface VarianGroup {
    id: string;
    nama_grup: string;
    wajib_pilih: boolean;
    opsi: VarianOption[];
}

export default function VarianProdukPage() {
    const [variantGroups, setVariantGroups] = useState<VarianGroup[]>(DUMMY_VARIAN);
    const [searchQuery, setSearchQuery] = useState("");

    // Modal States
    const [isAddGroupModalOpen, setIsAddGroupModalOpen] = useState(false);
    const [isEditGroupModalOpen, setIsEditGroupModalOpen] = useState(false);
    const [isDeleteGroupModalOpen, setIsDeleteGroupModalOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<VarianGroup | null>(null);

    // Form State untuk Tambah/Edit Grup Varian
    const [formGroupName, setFormGroupName] = useState("");
    const [formIsRequired, setFormIsRequired] = useState(false);
    const [formOptions, setFormOptions] = useState<VarianOption[]>([
        { nama: "", biaya_tambahan: 0 },
    ]);

    // Tambah Baris Opsi Baru di Modal
    const handleAddOptionRow = () => {
        setFormOptions([...formOptions, { nama: "", biaya_tambahan: 0 }]);
    };

    // Hapus Baris Opsi di Modal
    const handleRemoveOptionRow = (index: number) => {
        if (formOptions.length <= 1) return;
        setFormOptions(formOptions.filter((_, i) => i !== index));
    };

    // Update Nilai Baris Opsi
    const handleOptionChange = (index: number, field: "nama" | "biaya_tambahan", value: any) => {
        const updated = [...formOptions];
        updated[index] = { ...updated[index], [field]: value };
        setFormOptions(updated);
    };

    // Buka Modal Tambah Grup
    const handleOpenAdd = () => {
        setFormGroupName("");
        setFormIsRequired(false);
        setFormOptions([
            { nama: "Reguler", biaya_tambahan: 0 },
            { nama: "Large / Ekstra", biaya_tambahan: 5000 },
        ]);
        setIsAddGroupModalOpen(true);
    };

    // Buka Modal Edit Grup
    const handleOpenEdit = (group: VarianGroup) => {
        setSelectedGroup(group);
        setFormGroupName(group.nama_grup);
        setFormIsRequired(group.wajib_pilih);
        setFormOptions(group.opsi.map((o) => ({ ...o })));
        setIsEditGroupModalOpen(true);
    };

    // Buka Modal Hapus Grup
    const handleOpenDelete = (group: VarianGroup) => {
        setSelectedGroup(group);
        setIsDeleteGroupModalOpen(true);
    };

    // Simpan Grup Baru
    const handleSaveAdd = (e: React.FormEvent) => {
        e.preventDefault();
        const validOptions = formOptions.filter((o) => o.nama.trim() !== "");
        if (validOptions.length === 0) return;

        const newGroup: VarianGroup = {
            id: `var-${Date.now()}`,
            nama_grup: formGroupName,
            wajib_pilih: formIsRequired,
            opsi: validOptions.map((o) => ({
                nama: o.nama,
                biaya_tambahan: Number(o.biaya_tambahan) || 0,
            })),
        };

        setVariantGroups([...variantGroups, newGroup]);
        setIsAddGroupModalOpen(false);
    };

    // Simpan Perubahan Edit
    const handleSaveEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedGroup) return;

        const validOptions = formOptions.filter((o) => o.nama.trim() !== "");
        if (validOptions.length === 0) return;

        setVariantGroups((prev) =>
            prev.map((g) =>
                g.id === selectedGroup.id
                    ? {
                        ...g,
                        nama_grup: formGroupName,
                        wajib_pilih: formIsRequired,
                        opsi: validOptions.map((o) => ({
                            nama: o.nama,
                            biaya_tambahan: Number(o.biaya_tambahan) || 0,
                        })),
                    }
                    : g
            )
        );
        setIsEditGroupModalOpen(false);
    };

    // Konfirmasi Hapus
    const handleConfirmDelete = () => {
        if (!selectedGroup) return;
        setVariantGroups((prev) => prev.filter((g) => g.id !== selectedGroup.id));
        setIsDeleteGroupModalOpen(false);
    };

    // Filter Grup Varian
    const filteredGroups = variantGroups.filter((g) =>
        g.nama_grup.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Total opsi varian
    const totalOptionsCount = variantGroups.reduce((acc, g) => acc + g.opsi.length, 0);

    return (
        <div className="space-y-6 font-sans pb-12">

            {/* ========================================================================= */}
            {/* HEADER & ACTION BUTTONS                                                   */}
            {/* ========================================================================= */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-black">
                            <PlusCircle size={22} />
                        </div>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                                Varian, Topping & Tambahan
                            </h1>
                            <p className="text-xs text-slate-500 font-medium">
                                Atur pilihan level pedas, ekstra topping, dan opsi kustomisasi yang muncul di Kasir POS
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tombol Aksi Cepat */}
                <div className="flex items-center gap-2.5">
                    <Link
                        href="/produk"
                        className="px-3.5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                    >
                        <ShoppingBag size={15} className="text-indigo-600" />
                        <span>Daftar Produk</span>
                    </Link>

                    <button
                        onClick={handleOpenAdd}
                        className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2"
                    >
                        <Plus size={16} />
                        <span>Buat Grup Varian Baru</span>
                    </button>
                </div>
            </div>

            {/* ========================================================================= */}
            {/* METRICS / RINGKASAN                                                       */}
            {/* ========================================================================= */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                    <div>
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Grup Varian Aktif</p>
                        <p className="text-xl font-black text-slate-900 mt-0.5">{variantGroups.length} Grup</p>
                        <p className="text-[10px] text-indigo-600 font-semibold mt-0.5">Tersedia di modal kustomisasi kasir</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                        <Layers size={20} />
                    </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                    <div>
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Opsi Pilihan</p>
                        <p className="text-xl font-black text-slate-900 mt-0.5">{totalOptionsCount} Pilihan</p>
                        <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">Level pedas & topping siap pakai</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                        <PlusCircle size={20} />
                    </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                    <div>
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Integrasi Kasir (POS)</p>
                        <p className="text-xl font-black text-slate-900 mt-0.5">Otomatis Terhubung</p>
                        <p className="text-[10px] text-indigo-600 font-semibold mt-0.5">Menghitung biaya ekstra otomatis</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                        <Sparkles size={20} />
                    </div>
                </div>
            </div>

            {/* ========================================================================= */}
            {/* SEARCH BAR                                                                */}
            {/* ========================================================================= */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between gap-3">
                <div className="w-full sm:w-80 relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari grup varian (Pedas, Topping)..."
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

                <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
                    <Info size={14} />
                    <span>Perubahan di sini langsung memengaruhi modal custom di Kasir</span>
                </div>
            </div>

            {/* ========================================================================= */}
            {/* LIST GRUP VARIAN & SIMULASI TAMPILAN                                     */}
            {/* ========================================================================= */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {filteredGroups.map((group) => (
                    <div
                        key={group.id}
                        className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
                    >
                        {/* Header Grup */}
                        <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-start justify-between">
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="font-black text-base text-slate-900">{group.nama_grup}</h3>
                                    {group.wajib_pilih ? (
                                        <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-black rounded-md">
                                            WAJIB PILIH 1
                                        </span>
                                    ) : (
                                        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-md">
                                            OPSIONAL / BISA PILIH BANYAK
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-slate-400 mt-1">
                                    {group.opsi.length} pilihan opsi tersedia untuk kasir
                                </p>
                            </div>

                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => handleOpenEdit(group)}
                                    className="p-1.5 hover:bg-indigo-50 hover:text-indigo-600 text-slate-400 rounded-lg transition-colors"
                                    title="Edit Grup Varian"
                                >
                                    <Edit3 size={16} />
                                </button>
                                <button
                                    onClick={() => handleOpenDelete(group)}
                                    className="p-1.5 hover:bg-red-50 hover:text-red-600 text-slate-400 rounded-lg transition-colors"
                                    title="Hapus Grup Varian"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>

                        {/* List Opsi Varian */}
                        <div className="p-5 space-y-2">
                            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                                Pilihan Opsi & Tambahan Biaya:
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {group.opsi.map((option, idx) => (
                                    <div
                                        key={idx}
                                        className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between text-xs"
                                    >
                                        <span className="font-bold text-slate-800">{option.nama}</span>
                                        <span
                                            className={`font-black text-[11px] px-2 py-0.5 rounded-md ${
                                                option.biaya_tambahan > 0
                                                    ? "bg-indigo-100 text-indigo-800"
                                                    : "bg-slate-200/60 text-slate-500"
                                            }`}
                                        >
                                            {option.biaya_tambahan > 0
                                                ? `+Rp ${option.biaya_tambahan.toLocaleString("id-ID")}`
                                                : "Gratis"}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer Status */}
                        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                            <span className="text-slate-500 font-medium">
                                Tipe Input Kasir: <strong>{group.wajib_pilih ? "Radio Button" : "Checkbox Topping"}</strong>
                            </span>
                            <Link
                                href="/kasir"
                                className="text-indigo-600 font-bold hover:underline flex items-center gap-1"
                            >
                                <span>Tes di Kasir</span>
                                <ArrowRight size={12} />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* ========================================================================= */}
            {/* MODAL TAMBAH GRUP VARIAN                                                  */}
            {/* ========================================================================= */}
            {isAddGroupModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-slate-100 shadow-2xl p-6 animate-in zoom-in-95">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <div>
                                <h3 className="text-lg font-black text-slate-900">Buat Grup Varian / Topping</h3>
                                <p className="text-xs text-slate-500">Tambahkan opsi kustomisasi baru untuk menu kasir</p>
                            </div>
                            <button
                                onClick={() => setIsAddGroupModalOpen(false)}
                                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleSaveAdd} className="space-y-4 mt-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">
                                    Nama Grup Varian <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formGroupName}
                                    onChange={(e) => setFormGroupName(e.target.value)}
                                    placeholder="Contoh: Pilihan Ukuran / Level Manis"
                                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-indigo-500"
                                />
                            </div>

                            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-bold text-slate-800">Wajib Dipilih Kasir?</p>
                                    <p className="text-[11px] text-slate-500">
                                        Jika aktif, kasir wajib memilih 1 opsi sebelum masukkan ke keranjang
                                    </p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={formIsRequired}
                                    onChange={(e) => setFormIsRequired(e.target.checked)}
                                    className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                                />
                            </div>

                            {/* Daftar Opsi */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-xs font-bold text-slate-700">
                                        Daftar Opsi & Biaya Tambahan
                                    </label>
                                    <button
                                        type="button"
                                        onClick={handleAddOptionRow}
                                        className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
                                    >
                                        <Plus size={13} /> Tambah Opsi
                                    </button>
                                </div>

                                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                                    {formOptions.map((opt, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                required
                                                value={opt.nama}
                                                onChange={(e) => handleOptionChange(index, "nama", e.target.value)}
                                                placeholder={`Nama Opsi ${index + 1}`}
                                                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-500"
                                            />
                                            <div className="w-32 relative">
                                                <input
                                                    type="number"
                                                    value={opt.biaya_tambahan || ""}
                                                    onChange={(e) => handleOptionChange(index, "biaya_tambahan", e.target.value)}
                                                    placeholder="Biaya (Rp)"
                                                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-indigo-500"
                                                />
                                            </div>
                                            {formOptions.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveOptionRow(index)}
                                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                                <button
                                    type="button"
                                    onClick={() => setIsAddGroupModalOpen(false)}
                                    className="px-4 py-2.5 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl transition-all"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition-all"
                                >
                                    Simpan Varian
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ========================================================================= */}
            {/* MODAL EDIT GRUP VARIAN                                                    */}
            {/* ========================================================================= */}
            {isEditGroupModalOpen && selectedGroup && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-slate-100 shadow-2xl p-6 animate-in zoom-in-95">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <div>
                                <h3 className="text-lg font-black text-slate-900">Edit Grup Varian</h3>
                                <p className="text-xs text-slate-500">Perbarui opsi kustomisasi dan harga tambahan</p>
                            </div>
                            <button
                                onClick={() => setIsEditGroupModalOpen(false)}
                                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleSaveEdit} className="space-y-4 mt-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">
                                    Nama Grup Varian <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formGroupName}
                                    onChange={(e) => setFormGroupName(e.target.value)}
                                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-indigo-500"
                                />
                            </div>

                            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-bold text-slate-800">Wajib Dipilih Kasir?</p>
                                    <p className="text-[11px] text-slate-500">
                                        Jika aktif, kasir wajib memilih 1 opsi sebelum masukkan ke keranjang
                                    </p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={formIsRequired}
                                    onChange={(e) => setFormIsRequired(e.target.checked)}
                                    className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                                />
                            </div>

                            {/* Daftar Opsi */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-xs font-bold text-slate-700">
                                        Daftar Opsi & Biaya Tambahan
                                    </label>
                                    <button
                                        type="button"
                                        onClick={handleAddOptionRow}
                                        className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
                                    >
                                        <Plus size={13} /> Tambah Opsi
                                    </button>
                                </div>

                                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                                    {formOptions.map((opt, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                required
                                                value={opt.nama}
                                                onChange={(e) => handleOptionChange(index, "nama", e.target.value)}
                                                placeholder={`Nama Opsi ${index + 1}`}
                                                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-500"
                                            />
                                            <div className="w-32 relative">
                                                <input
                                                    type="number"
                                                    value={opt.biaya_tambahan}
                                                    onChange={(e) => handleOptionChange(index, "biaya_tambahan", e.target.value)}
                                                    placeholder="Biaya (Rp)"
                                                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-indigo-500"
                                                />
                                            </div>
                                            {formOptions.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveOptionRow(index)}
                                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                                <button
                                    type="button"
                                    onClick={() => setIsEditGroupModalOpen(false)}
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
            {/* MODAL HAPUS GRUP VARIAN                                                   */}
            {/* ========================================================================= */}
            {isDeleteGroupModalOpen && selectedGroup && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-sm w-full border border-slate-100 shadow-2xl p-6 text-center animate-in zoom-in-95">
                        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3">
                            <Trash2 size={24} />
                        </div>
                        <h3 className="text-base font-black text-slate-900">Hapus Grup Varian?</h3>
                        <p className="text-xs text-slate-500 mt-1">
                            Apakah kamu yakin ingin menghapus grup <strong>"{selectedGroup.nama_grup}"</strong>?
                        </p>

                        <div className="flex items-center justify-center gap-2.5 mt-5">
                            <button
                                onClick={() => setIsDeleteGroupModalOpen(false)}
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
