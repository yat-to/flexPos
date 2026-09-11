"use client";

import React, { useState } from "react";
import {
    Search,
    Filter,
    Receipt,
    Printer,
    Share2,
    Eye,
    Calendar,
    ArrowUpDown,
    Download,
    CheckCircle2,
    Clock,
    XCircle,
    AlertTriangle,
    CreditCard,
    Banknote,
    QrCode,
    UtensilsCrossed,
    ShoppingBag,
    Send,
    X,
    TrendingUp,
    DollarSign,
    User,
    ChevronDown,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import { DUMMY_TRANSAKSI, DUMMY_PROFIL_TOKO } from "@/data/dummy";

interface TransactionItem {
    nama: string;
    qty: number;
    harga: number;
    subtotal: number;
    varian?: string;
}

interface TransactionRecord {
    id: string;
    nomor_meja: string;
    waktu: string;
    kasir: string;
    metode_bayar: string;
    items: TransactionItem[];
    subtotal: number;
    diskon: number;
    total_bayar: number;
    uang_diterima?: number;
    kembalian?: number;
    status: "Lunas" | "Proses Dapur / Aktif" | "Dibatalkan / Void";
    customerName?: string;
    channel?: "dine_in" | "takeaway" | "gofood" | "grabfood" | "whatsapp";
}

// Data tambahan untuk simulasi riwayat transaksi komprehensif
const EXTENDED_TRANSACTIONS: TransactionRecord[] = [
    ...DUMMY_TRANSAKSI.map((t) => ({
        ...t,
        status: t.status as "Lunas" | "Proses Dapur / Aktif",
        channel: t.nomor_meja.includes("Takeaway")
            ? ("takeaway" as const)
            : ("dine_in" as const),
    })),
    {
        id: "TRX-20260829-005",
        nomor_meja: "🛵 GoFood #GF-9821",
        waktu: "2026-08-29 14:10",
        kasir: "Siti Rahmawati",
        metode_bayar: "QRIS",
        items: [
            { nama: "Paket Ayam Geprek Sambal Korek + Nasi", qty: 2, harga: 18000, subtotal: 36000 },
            { nama: "Salmon Mentai Roll (6 pcs)", qty: 1, harga: 35000, subtotal: 35000 },
            { nama: "Es Jeruk Peras Murni", qty: 2, harga: 8000, subtotal: 16000 },
        ],
        subtotal: 87000,
        diskon: 0,
        total_bayar: 87000,
        status: "Lunas",
        channel: "gofood",
    },
    {
        id: "TRX-20260829-006",
        nomor_meja: "💬 WhatsApp Delivery (Bpk. Ahmad)",
        waktu: "2026-08-29 14:45",
        kasir: "Siti Rahmawati",
        metode_bayar: "Transfer / Debit BCA",
        items: [
            { nama: "Sup Ubi Daging Sapi Spesial", qty: 4, harga: 25000, subtotal: 100000 },
            { nama: "Nasi Goreng Seafood", qty: 2, harga: 28000, subtotal: 56000 },
            { nama: "Es Teh Manis Jumbo", qty: 4, harga: 5000, subtotal: 20000 },
        ],
        subtotal: 176000,
        diskon: 10000,
        total_bayar: 166000,
        status: "Lunas",
        channel: "whatsapp",
    },
    {
        id: "TRX-20260829-007",
        nomor_meja: "Meja #05 (Dine In)",
        waktu: "2026-08-29 15:20",
        kasir: "Siti Rahmawati",
        metode_bayar: "Tunai",
        items: [
            { nama: "Crispy Chicken Teriyaki Roll", qty: 1, harga: 25000, subtotal: 25000 },
            { nama: "Ocha Dingin", qty: 1, harga: 6000, subtotal: 6000 },
        ],
        subtotal: 31000,
        diskon: 0,
        total_bayar: 31000,
        status: "Dibatalkan / Void",
        channel: "dine_in",
    },
];

export default function RiwayatTransaksiPage() {
    const [transactions, setTransactions] = useState<TransactionRecord[]>(EXTENDED_TRANSACTIONS);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [paymentFilter, setPaymentFilter] = useState<string>("all");
    const [dateRange, setDateRange] = useState<string>("today");

    // Modal States
    const [selectedTrx, setSelectedTrx] = useState<TransactionRecord | null>(null);
    const [isReceiptOpen, setIsReceiptOpen] = useState(false);
    const [isVoidModalOpen, setIsVoidModalOpen] = useState(false);
    const [voidReason, setVoidReason] = useState("");

    // Perhitungan Metrik Finansial
    const totalTransactions = transactions.length;
    const completedTransactions = transactions.filter((t) => t.status === "Lunas");
    const totalOmset = completedTransactions.reduce((acc, t) => acc + t.total_bayar, 0);
    const aov = completedTransactions.length > 0 ? Math.round(totalOmset / completedTransactions.length) : 0;
    const totalCash = completedTransactions.filter((t) => t.metode_bayar.includes("Tunai")).reduce((acc, t) => acc + t.total_bayar, 0);
    const totalNonCash = totalOmset - totalCash;

    // Filter Logic
    const filteredTransactions = transactions.filter((trx) => {
        const matchSearch =
            trx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            trx.nomor_meja.toLowerCase().includes(searchQuery.toLowerCase()) ||
            trx.kasir.toLowerCase().includes(searchQuery.toLowerCase()) ||
            trx.items.some((i) => i.nama.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchStatus = statusFilter === "all" || trx.status === statusFilter;
        const matchPayment = paymentFilter === "all" || trx.metode_bayar.toLowerCase().includes(paymentFilter.toLowerCase());

        return matchSearch && matchStatus && matchPayment;
    });

    // Buka Modal Struk
    const handleOpenReceipt = (trx: TransactionRecord) => {
        setSelectedTrx(trx);
        setIsReceiptOpen(true);
    };

    // Buka Modal Void
    const handleOpenVoid = (trx: TransactionRecord) => {
        setSelectedTrx(trx);
        setVoidReason("Salah input order oleh kasir");
        setIsVoidModalOpen(true);
    };

    // Konfirmasi Void
    const handleConfirmVoid = () => {
        if (!selectedTrx) return;
        setTransactions((prev) =>
            prev.map((t) => (t.id === selectedTrx.id ? { ...t, status: "Dibatalkan / Void" } : t))
        );
        setIsVoidModalOpen(false);
    };

    // Kirim Struk WhatsApp
    const handleShareWhatsApp = (trx: TransactionRecord) => {
        const textMessage = `*STRUK PEMBELIAN - ${DUMMY_PROFIL_TOKO.nama_usaha}*%0A--------------------------------%0A*No. Invoice:* ${trx.id}%0A*Waktu:* ${trx.waktu}%0A*Tipe/Meja:* ${trx.nomor_meja}%0A*Kasir:* ${trx.kasir}%0A--------------------------------%0A${trx.items.map((i) => `• ${i.qty}x ${i.nama} = Rp ${i.subtotal.toLocaleString("id-ID")}`).join("%0A")}%0A--------------------------------%0A*Subtotal:* Rp ${trx.subtotal.toLocaleString("id-ID")}%0A*Total Bayar:* Rp ${trx.total_bayar.toLocaleString("id-ID")}%0A*Metode:* ${trx.metode_bayar}%0A*Status:* ${trx.status}%0A%0ATerima kasih atas pesanan Anda! 🙏`;
        window.open(`https://wa.me/?text=${textMessage}`, "_blank");
    };

    // Render Badge Metode Pembayaran
    const renderPaymentBadge = (method: string) => {
        if (method.toLowerCase().includes("tunai")) {
            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                    <Banknote size={13} />
                    <span>Tunai</span>
                </span>
            );
        }
        if (method.toLowerCase().includes("qris")) {
            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
                    <QrCode size={13} />
                    <span>QRIS</span>
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                <CreditCard size={13} />
                <span>{method}</span>
            </span>
        );
    };

    // Render Badge Status
    const renderStatusBadge = (status: TransactionRecord["status"]) => {
        switch (status) {
            case "Lunas":
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                        <CheckCircle2 size={12} />
                        <span>Lunas</span>
                    </span>
                );
            case "Proses Dapur / Aktif":
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">
                        <Clock size={12} />
                        <span>Proses Dapur</span>
                    </span>
                );
            case "Dibatalkan / Void":
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-100 text-red-800 text-[11px] font-bold">
                        <XCircle size={12} />
                        <span>Dibatalkan</span>
                    </span>
                );
        }
    };

    return (
        <div className="space-y-6 font-sans pb-14">

            {/* ========================================================================= */}
            {/* HEADER & ACTION BUTTONS                                                   */}
            {/* ========================================================================= */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black">
                            <Receipt size={22} />
                        </div>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                                Riwayat Transaksi Kasir
                            </h1>
                            <p className="text-xs text-slate-500 font-medium">
                                Log lengkap seluruh transaksi kasir, cetak ulang struk, audit pembayaran, dan kirim nota WhatsApp
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tombol Aksi Cepat */}
                <div className="flex items-center gap-2.5">
                    <button
                        onClick={() => {
                            const csvContent = "data:text/csv;charset=utf-8," +
                                ["ID Invoice,Waktu,Kasir,Meja/Tipe,Total,Metode,Status",
                                    ...transactions.map(t => `${t.id},${t.waktu},${t.kasir},${t.nomor_meja},${t.total_bayar},${t.metode_bayar},${t.status}`)
                                ].join("\n");
                            const encodedUri = encodeURI(csvContent);
                            const link = document.createElement("a");
                            link.setAttribute("href", encodedUri);
                            link.setAttribute("download", `Rekap_Transaksi_${Date.now()}.csv`);
                            document.body.appendChild(link);
                            link.click();
                        }}
                        className="px-3.5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                    >
                        <Download size={15} className="text-slate-500" />
                        <span>Ekspor CSV</span>
                    </button>
                </div>
            </div>

            {/* ========================================================================= */}
            {/* SEARCH & MULTI-FILTER BAR                                                 */}
            {/* ========================================================================= */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
                {/* Search Bar */}
                <div className="w-full md:w-80 relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari No Invoice, Meja, Menu, Kasir..."
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

                {/* Filter Status, Pembayaran & Rentang */}
                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">

                    {/* Periode Waktu */}
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-indigo-500"
                    >
                        <option value="today">📅 Hari Ini</option>
                        <option value="yesterday">📅 Kemarin</option>
                        <option value="week">📅 7 Hari Terakhir</option>
                        <option value="month">📅 Bulan Ini</option>
                    </select>
                </div>
            </div>

            {/* ========================================================================= */}
            {/* TABEL RIWAYAT TRANSAKSI                                                   */}
            {/* ========================================================================= */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                {filteredTransactions.length === 0 ? (
                    <div className="py-12 px-4 text-center">
                        <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                            <Receipt size={26} />
                        </div>
                        <h3 className="text-base font-bold text-slate-800">Tidak ada transaksi ditemukan</h3>
                        <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                            Coba sesuaikan kata kunci pencarian atau reset filter di atas.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                    <th className="py-3.5 px-4">No. Invoice & Waktu</th>
                                    <th className="py-3.5 px-4">Tipe / Meja</th>
                                    <th className="py-3.5 px-4">Kasir</th>
                                    <th className="py-3.5 px-4 text-right">Total Bayar</th>
                                    <th className="py-3.5 px-4 text-center">Struk</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                                {filteredTransactions.map((trx) => (
                                    <tr
                                        key={trx.id}
                                        onClick={() => handleOpenReceipt(trx)}
                                        className="hover:bg-indigo-50/30 cursor-pointer transition-colors"
                                    >
                                        {/* Invoice, Waktu & Kasir */}
                                        <td className="py-3.5 px-4">
                                            <p className="font-extrabold text-slate-900">{trx.id}</p>
                                            <p className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                                                <Clock size={11} />
                                                <span>{trx.waktu}</span>
                                            </p>
                                        </td>

                                        {/* Meja / Tipe Order */}
                                        <td className="py-3.5 px-4">
                                            <span className="font-bold text-slate-800 flex items-center gap-1.5">
                                                {trx.channel === "dine_in" && <UtensilsCrossed size={13} className="text-indigo-600" />}
                                                {trx.channel === "takeaway" && <ShoppingBag size={13} className="text-orange-600" />}
                                                {trx.channel === "gofood" && <span className="text-xs">🟢</span>}
                                                {trx.channel === "whatsapp" && <span className="text-xs">💬</span>}
                                                <span>{trx.nomor_meja}</span>
                                            </span>
                                            <p className="text-[10px] text-slate-400 mt-0.5">
                                                {trx.items.length} jenis item ({trx.items.reduce((acc, i) => acc + i.qty, 0)} porsi)
                                            </p>
                                        </td>

                                        {/* Kasir Bertugas */}
                                        <td className="py-3.5 px-4">
                                            <span className="text-slate-700 font-semibold flex items-center gap-1.5 text-xs">
                                                <User size={13} className="text-indigo-500 shrink-0" />
                                                <span>{trx.kasir}</span>
                                            </span>
                                        </td>

                                        {/* Total Bayar */}
                                        <td className="py-3.5 px-4 text-right">
                                            <span className="font-black text-slate-900 text-sm">
                                                Rp {trx.total_bayar.toLocaleString("id-ID")}
                                            </span>
                                            {trx.diskon > 0 && (
                                                <p className="text-[10px] text-emerald-600 font-bold">
                                                    Hemat Rp {trx.diskon.toLocaleString("id-ID")}
                                                </p>
                                            )}
                                        </td>

                                        {/* Tombol Cetak Struk */}
                                        <td className="py-3.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                                            <button
                                                onClick={() => handleOpenReceipt(trx)}
                                                className="px-3 py-1.5 bg-slate-50 hover:bg-indigo-50 text-indigo-600 font-bold rounded-xl border border-slate-200 hover:border-indigo-200 transition-all inline-flex items-center gap-1.5 text-xs shadow-2xs"
                                                title="Lihat & Cetak Struk Lengkap"
                                            >
                                                <Printer size={13} />
                                                <span>Struk</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* ========================================================================= */}
            {/* MODAL STRUK PEMBAYARAN THERMAL                                            */}
            {/* ========================================================================= */}
            {isReceiptOpen && selectedTrx && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-sm w-full border border-slate-100 shadow-2xl p-5 animate-in zoom-in-95">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Bukti Pembayaran Digital
                            </span>
                            <button
                                onClick={() => setIsReceiptOpen(false)}
                                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Tampilan Struk Thermal Kertas */}
                        <div className="mt-4 bg-slate-50 border border-slate-200 p-4 rounded-2xl font-mono text-xs text-slate-800 space-y-3">
                            <div className="text-center space-y-0.5">
                                <h4 className="font-black text-sm tracking-wide">{DUMMY_PROFIL_TOKO.nama_usaha}</h4>
                                <p className="text-[10px] text-slate-500">{DUMMY_PROFIL_TOKO.alamat}</p>
                                <p className="text-[10px] text-slate-500">Telp: {DUMMY_PROFIL_TOKO.telepon}</p>
                            </div>

                            <div className="border-t border-dashed border-slate-300 pt-2 space-y-1 text-[11px]">
                                <div className="flex justify-between">
                                    <span>No: {selectedTrx.id}</span>
                                    <span>{selectedTrx.waktu.split(" ")[1]}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tgl: {selectedTrx.waktu.split(" ")[0]}</span>
                                    <span>Kasir: {selectedTrx.kasir.split(" ")[0]}</span>
                                </div>
                                <div className="flex justify-between font-bold text-slate-900">
                                    <span>Tipe: {selectedTrx.nomor_meja}</span>
                                </div>
                            </div>

                            {/* Daftar Item */}
                            <div className="border-t border-dashed border-slate-300 pt-2 space-y-1.5 text-[11px]">
                                {selectedTrx.items.map((item, idx) => (
                                    <div key={idx}>
                                        <div className="flex justify-between font-bold">
                                            <span>{item.nama}</span>
                                            <span>Rp {item.subtotal.toLocaleString("id-ID")}</span>
                                        </div>
                                        <div className="text-[10px] text-slate-500 pl-2">
                                            {item.qty} x Rp {item.harga.toLocaleString("id-ID")}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Ringkasan Finansial */}
                            <div className="border-t border-dashed border-slate-300 pt-2 space-y-1 text-[11px]">
                                <div className="flex justify-between">
                                    <span>Subtotal:</span>
                                    <span>Rp {selectedTrx.subtotal.toLocaleString("id-ID")}</span>
                                </div>
                                {selectedTrx.diskon > 0 && (
                                    <div className="flex justify-between text-emerald-600">
                                        <span>Diskon / Promo:</span>
                                        <span>-Rp {selectedTrx.diskon.toLocaleString("id-ID")}</span>
                                    </div>
                                )}
                                <div className="flex justify-between font-black text-sm text-slate-900 pt-1 border-t border-slate-200">
                                    <span>GRAND TOTAL:</span>
                                    <span>Rp {selectedTrx.total_bayar.toLocaleString("id-ID")}</span>
                                </div>
                                <div className="flex justify-between text-[11px] pt-1 text-slate-600">
                                    <span>Metode Pembayaran:</span>
                                    <span className="font-bold">{selectedTrx.metode_bayar}</span>
                                </div>
                                {selectedTrx.uang_diterima && (
                                    <>
                                        <div className="flex justify-between text-[10px] text-slate-500">
                                            <span>Uang Diterima:</span>
                                            <span>Rp {selectedTrx.uang_diterima.toLocaleString("id-ID")}</span>
                                        </div>
                                        <div className="flex justify-between text-[10px] text-slate-500">
                                            <span>Kembalian:</span>
                                            <span>Rp {(selectedTrx.kembalian || 0).toLocaleString("id-ID")}</span>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="border-t border-dashed border-slate-300 pt-2 text-center text-[10px] text-slate-400 leading-tight">
                                <p>{DUMMY_PROFIL_TOKO.footer_struk}</p>
                                <p className="mt-1 font-sans text-[9px] text-slate-400">FlexPOS Cloud Engine</p>
                            </div>
                        </div>

                        {/* Tombol Aksi Struk */}
                        <div className="mt-4 grid grid-cols-2 gap-2">
                            <button
                                onClick={() => window.print()}
                                className="py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                            >
                                <Printer size={14} />
                                <span>Cetak Struk</span>
                            </button>
                            <button
                                onClick={() => handleShareWhatsApp(selectedTrx)}
                                className="py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                            >
                                <Share2 size={14} />
                                <span>Kirim WA</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ========================================================================= */}
            {/* MODAL VOID / PEMBATALAN TRANSAKSI                                         */}
            {/* ========================================================================= */}
            {isVoidModalOpen && selectedTrx && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-sm w-full border border-slate-100 shadow-2xl p-6 text-center animate-in zoom-in-95">
                        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3">
                            <AlertTriangle size={24} />
                        </div>
                        <h3 className="text-base font-black text-slate-900">Batalkan Transaksi?</h3>
                        <p className="text-xs text-slate-500 mt-1">
                            Kamu akan membatalkan invoice <strong>{selectedTrx.id}</strong> senilai Rp {selectedTrx.total_bayar.toLocaleString("id-ID")}.
                        </p>

                        <div className="mt-4 text-left">
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                Alasan Pembatalan (Audit Log)
                            </label>
                            <select
                                value={voidReason}
                                onChange={(e) => setVoidReason(e.target.value)}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-red-500"
                            >
                                <option value="Salah input menu oleh kasir">Salah input menu oleh kasir</option>
                                <option value="Tamu/Pelanggan membatalkan pesanan">Tamu/Pelanggan membatalkan pesanan</option>
                                <option value="Metode pembayaran ganda / error QRIS">Metode pembayaran ganda / error QRIS</option>
                                <option value="Bahan baku habis tiba-tiba di dapur">Bahan baku habis tiba-tiba di dapur</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-center gap-2.5 mt-5">
                            <button
                                onClick={() => setIsVoidModalOpen(false)}
                                className="flex-1 py-2.5 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl transition-all"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleConfirmVoid}
                                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-md transition-all"
                            >
                                Ya, Void Nota
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
