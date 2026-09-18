"use client";

import React, { useState } from "react";
import {
    ChefHat,
    Clock,
    CheckCircle2,
    UtensilsCrossed,
    ShoppingBag,
    Printer,
    Check,
    Flame,
    ArrowRight,
    RefreshCw,
    Search,
    Filter,
    Layers,
    AlertTriangle,
    Eye
} from "lucide-react";
import Link from "next/link";
import { DUMMY_PROFIL_TOKO } from "@/data/dummy";

interface ActiveOrderItem {
    nama: string;
    qty: number;
    catatan?: string;
    levelPedas?: string;
    extraTopping?: string[];
}

interface ActiveOrder {
    id: string;
    nomor_meja: string;
    channel: "dine_in" | "takeaway" | "gofood" | "grabfood" | "whatsapp";
    waktuMasuk: string;
    menitBerlalu: number;
    kasir: string;
    statusDapur: "menunggu" | "dimasak" | "siap_saji";
    items: ActiveOrderItem[];
}

const INITIAL_ACTIVE_ORDERS: ActiveOrder[] = [
    {
        id: "ORD-101",
        nomor_meja: "Meja #02 (Dine In)",
        channel: "dine_in",
        waktuMasuk: "12:45",
        menitBerlalu: 8,
        kasir: "Siti Rahmawati",
        statusDapur: "dimasak",
        items: [
            { nama: "Salmon Mentai Roll (6 pcs)", qty: 2, catatan: "Saus mentai agak banyakan" },
            { nama: "Spicy Tuna Maki", qty: 1, levelPedas: "Level 2" },
            { nama: "Ocha Dingin", qty: 3 },
        ],
    },
    {
        id: "ORD-102",
        nomor_meja: "Meja #05 (Dine In)",
        channel: "dine_in",
        waktuMasuk: "12:50",
        menitBerlalu: 3,
        kasir: "Siti Rahmawati",
        statusDapur: "menunggu",
        items: [
            { nama: "Sup Ubi Daging Sapi Spesial", qty: 2, catatan: "Kuah dipisah sedikit untuk anak" },
            { nama: "Es Jeruk Peras Murni", qty: 2 },
        ],
    },
    {
        id: "ORD-103",
        nomor_meja: "🛵 GoFood #GF-8842",
        channel: "gofood",
        waktuMasuk: "12:38",
        menitBerlalu: 15,
        kasir: "Siti Rahmawati",
        statusDapur: "siap_saji",
        items: [
            { nama: "Paket Ayam Geprek Sambal Korek + Nasi", qty: 3, levelPedas: "Level 3", extraTopping: ["Keju Mozzarella"] },
            { nama: "Es Teh Manis Jumbo", qty: 3 },
        ],
    },
    {
        id: "ORD-104",
        nomor_meja: "Takeaway #03 (Bungkus)",
        channel: "takeaway",
        waktuMasuk: "12:52",
        menitBerlalu: 1,
        kasir: "Siti Rahmawati",
        statusDapur: "menunggu",
        items: [
            { nama: "Nasi Goreng Seafood", qty: 1, levelPedas: "Level 1" },
            { nama: "Lemon Tea Segar", qty: 1 },
        ],
    },
];

export default function PesananAktifPage() {
    const [orders, setOrders] = useState<ActiveOrder[]>(INITIAL_ACTIVE_ORDERS);
    const [filterChannel, setFilterChannel] = useState<string>("all");

    // Ubah Status Dapur
    const handleUpdateStatus = (orderId: string, nextStatus: ActiveOrder["statusDapur"]) => {
        setOrders((prev) =>
            prev.map((o) => (o.id === orderId ? { ...o, statusDapur: nextStatus } : o))
        );
    };

    // Selesaikan Pesanan (Keluar dari KDS)
    const handleCompleteOrder = (orderId: string) => {
        setOrders((prev) => prev.filter((o) => o.id !== orderId));
    };

    // Filter Logic
    const filteredOrders = orders.filter((o) => {
        if (filterChannel === "all") return true;
        return o.channel === filterChannel;
    });

    const waitingOrders = filteredOrders.filter((o) => o.statusDapur === "menunggu");
    const cookingOrders = filteredOrders.filter((o) => o.statusDapur === "dimasak");
    const readyOrders = filteredOrders.filter((o) => o.statusDapur === "siap_saji");

    return (
        <div className="space-y-6 font-sans pb-14">

            {/* ========================================================================= */}
            {/* HEADER & CONTROLS                                                         */}
            {/* ========================================================================= */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center font-black">
                            <ChefHat size={22} />
                        </div>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                                Pesanan Aktif & Kitchen Display (KDS)
                            </h1>
                            <p className="text-xs text-slate-500 font-medium">
                                Monitor antrean pesanan kasir secara real-time untuk dapur & meja aktif
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tombol Filter & Aksi Cepat */}
                <div className="flex items-center gap-2.5">
                    <div className="flex items-center gap-1 bg-white p-1 border border-slate-200 rounded-xl shadow-xs">
                        <button
                            onClick={() => setFilterChannel("all")}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                filterChannel === "all" ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-50"
                            }`}
                        >
                            Semua ({orders.length})
                        </button>
                        <button
                            onClick={() => setFilterChannel("dine_in")}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                filterChannel === "dine_in" ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-50"
                            }`}
                        >
                            Dine-In
                        </button>
                        <button
                            onClick={() => setFilterChannel("gofood")}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                filterChannel === "gofood" ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-50"
                            }`}
                        >
                            Online Food
                        </button>
                    </div>

                    <Link
                        href="/kasir"
                        className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2"
                    >
                        <ShoppingBag size={16} />
                        <span>Input Order Kasir</span>
                    </Link>
                </div>
            </div>

            {/* ========================================================================= */}
            {/* KANBAN / KITCHEN QUEUE COLUMNS                                            */}
            {/* ========================================================================= */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">

                {/* ----------------- KOLOM 1: MENUNGGU / BARU MASUK ----------------- */}
                <div className="bg-slate-100/70 p-4 rounded-3xl border border-slate-200 space-y-3.5 min-h-[500px]">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse"></span>
                            <h3 className="font-extrabold text-sm text-slate-800">1. Baru Masuk / Antre</h3>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                            {waitingOrders.length} Pesanan
                        </span>
                    </div>

                    {waitingOrders.length === 0 ? (
                        <p className="text-center py-12 text-xs text-slate-400 font-medium">
                            Tidak ada pesanan antre saat ini.
                        </p>
                    ) : (
                        waitingOrders.map((order) => (
                            <div
                                key={order.id}
                                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3 hover:shadow-md transition-all"
                            >
                                <div className="flex items-start justify-between pb-2 border-b border-slate-100">
                                    <div>
                                        <span className="text-[10px] font-extrabold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                                            {order.id}
                                        </span>
                                        <h4 className="font-black text-sm text-slate-900 mt-1">{order.nomor_meja}</h4>
                                    </div>
                                    <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                                        <Clock size={12} />
                                        <span>{order.menitBerlalu} mnt lalu</span>
                                    </span>
                                </div>

                                {/* Items List */}
                                <div className="space-y-2 text-xs">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                                            <div className="flex justify-between font-bold text-slate-800">
                                                <span>{item.qty}x {item.nama}</span>
                                            </div>
                                            {item.levelPedas && (
                                                <span className="text-[10px] font-bold text-red-600 block mt-0.5">
                                                    🔥 {item.levelPedas}
                                                </span>
                                            )}
                                            {item.catatan && (
                                                <span className="text-[10px] text-slate-500 italic block mt-0.5">
                                                    Catatan: "{item.catatan}"
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Action Button */}
                                <button
                                    onClick={() => handleUpdateStatus(order.id, "dimasak")}
                                    className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-xs"
                                >
                                    <Flame size={14} />
                                    <span>Mulai Masak Dapur</span>
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* ----------------- KOLOM 2: SEDANG DIMASAK ----------------- */}
                <div className="bg-slate-100/70 p-4 rounded-3xl border border-slate-200 space-y-3.5 min-h-[500px]">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-blue-500 animate-ping"></span>
                            <h3 className="font-extrabold text-sm text-slate-800">2. Sedang Dimasak</h3>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                            {cookingOrders.length} Pesanan
                        </span>
                    </div>

                    {cookingOrders.length === 0 ? (
                        <p className="text-center py-12 text-xs text-slate-400 font-medium">
                            Dapur sedang tidak memproses pesanan.
                        </p>
                    ) : (
                        cookingOrders.map((order) => (
                            <div
                                key={order.id}
                                className="bg-white p-4 rounded-2xl border border-blue-200 shadow-xs space-y-3 hover:shadow-md transition-all ring-2 ring-blue-500/10"
                            >
                                <div className="flex items-start justify-between pb-2 border-b border-slate-100">
                                    <div>
                                        <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                                            {order.id}
                                        </span>
                                        <h4 className="font-black text-sm text-slate-900 mt-1">{order.nomor_meja}</h4>
                                    </div>
                                    <span className="text-[11px] font-bold text-blue-600 flex items-center gap-1">
                                        <Clock size={12} />
                                        <span>{order.menitBerlalu} mnt</span>
                                    </span>
                                </div>

                                {/* Items List */}
                                <div className="space-y-2 text-xs">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="bg-blue-50/50 p-2 rounded-xl border border-blue-100">
                                            <div className="flex justify-between font-bold text-slate-800">
                                                <span>{item.qty}x {item.nama}</span>
                                            </div>
                                            {item.catatan && (
                                                <span className="text-[10px] text-slate-500 italic block mt-0.5">
                                                    Catatan: "{item.catatan}"
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Action Button */}
                                <button
                                    onClick={() => handleUpdateStatus(order.id, "siap_saji")}
                                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-xs"
                                >
                                    <CheckCircle2 size={14} />
                                    <span>Makanan Siap Saji</span>
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* ----------------- KOLOM 3: SIAP DIANTAR / SAJI ----------------- */}
                <div className="bg-slate-100/70 p-4 rounded-3xl border border-slate-200 space-y-3.5 min-h-[500px]">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                            <h3 className="font-extrabold text-sm text-slate-800">3. Siap Diantar / Selesai</h3>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                            {readyOrders.length} Pesanan
                        </span>
                    </div>

                    {readyOrders.length === 0 ? (
                        <p className="text-center py-12 text-xs text-slate-400 font-medium">
                            Belum ada pesanan yang siap diantar.
                        </p>
                    ) : (
                        readyOrders.map((order) => (
                            <div
                                key={order.id}
                                className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-xs space-y-3 hover:shadow-md transition-all ring-2 ring-emerald-500/10"
                            >
                                <div className="flex items-start justify-between pb-2 border-b border-slate-100">
                                    <div>
                                        <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                                            {order.id}
                                        </span>
                                        <h4 className="font-black text-sm text-slate-900 mt-1">{order.nomor_meja}</h4>
                                    </div>
                                    <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                                        <CheckCircle2 size={12} />
                                        <span>Siap Dihidangkan</span>
                                    </span>
                                </div>

                                {/* Items List */}
                                <div className="space-y-1.5 text-xs text-slate-700">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="flex justify-between font-bold">
                                            <span>{item.qty}x {item.nama}</span>
                                            <span className="text-emerald-600">✓ Selesai</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Action Button */}
                                <button
                                    onClick={() => handleCompleteOrder(order.id)}
                                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-xs"
                                >
                                    <Check size={14} />
                                    <span>Selesaikan Pesanan</span>
                                </button>
                            </div>
                        ))
                    )}
                </div>

            </div>

        </div>
    );
}
