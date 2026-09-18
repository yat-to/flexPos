"use client";
import React, { useState } from "react";
import {
    Search,
    Plus,
    Minus,
    Trash2,
    X,
    CreditCard,
    Banknote,
    QrCode,
    Printer,
    CheckCircle2,
    UtensilsCrossed,
    ShoppingBag,
    ArrowRight,
    Flame,
    ChefHat,
} from "lucide-react";

// Mengambil data dummy lengkap dari file dummy.ts
import {
    DUMMY_PRODUK,
    DUMMY_KATEGORI,
    DUMMY_VARIAN,
    DUMMY_PROFIL_TOKO,
} from "@/data/dummy";

interface CartItem {
    cartId: string;
    produkId: string;
    nama_menu: string;
    foto: string;
    harga_satuan: number;
    qty: number;
    levelPedas: string;
    biayaLevelPedas: number;
    extraTopping: Array<{ nama: string; biaya: number }>;
    catatan: string;
    subtotal: number;
}

export default function KasirPOSPage() {
    // State Filter Produk
    const [selectedKategori, setSelectedKategori] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState<string>("");

    // State Pesanan / Keranjang
    const [orderType, setOrderType] = useState<"dine_in" | "takeaway">("dine_in");
    const [tableNumber, setTableNumber] = useState<string>("Meja #01");
    const [customerName, setCustomerName] = useState<string>("");
    const [cart, setCart] = useState<CartItem[]>([]);

    // State Modal Customisasi (Level Pedas & Topping)
    const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<(typeof DUMMY_PRODUK)[0] | null>(null);
    const [tempLevelPedas, setTempLevelPedas] = useState(DUMMY_VARIAN[0].opsi[1]); // Default Level 1
    const [tempToppings, setTempToppings] = useState<Array<{ nama: string; biaya: number }>>([]);
    const [tempCatatan, setTempCatatan] = useState("");

    // State Modal Pembayaran
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<"cash" | "qris" | "debit">("cash");
    const [cashReceived, setCashReceived] = useState<number>(0);
    const [isSuccessReceiptOpen, setIsSuccessReceiptOpen] = useState(false);

    // Filter Data Produk
    const filteredProducts = DUMMY_PRODUK.filter((item) => {
        const matchCategory = selectedKategori === "all" || item.kategori_id === selectedKategori;
        const matchSearch = item.nama_menu.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchSearch;
    });

    // Buka Modal Kustomisasi saat Produk Diklik
    const handleProductClick = (product: (typeof DUMMY_PRODUK)[0]) => {
        setSelectedProduct(product);
        setTempLevelPedas(DUMMY_VARIAN[0].opsi[1]); // Reset Level 1
        setTempToppings([]);
        setTempCatatan("");
        setIsCustomizeOpen(true);
    };

    // Toggle Topping Pilihan
    const toggleTopping = (topping: { nama: string; biaya_tambahan: number }) => {
        const exists = tempToppings.find((t) => t.nama === topping.nama);
        if (exists) {
            setTempToppings(tempToppings.filter((t) => t.nama !== topping.nama));
        } else {
            setTempToppings([...tempToppings, { nama: topping.nama, biaya: topping.biaya_tambahan }]);
        }
    };

    // Masukkan ke Keranjang setelah Kustomisasi
    const addToCartFromCustomize = () => {
        if (!selectedProduct) return;

        const totalToppingCost = tempToppings.reduce((acc, curr) => acc + curr.biaya, 0);
        const itemPricePerUnit = selectedProduct.harga_jual + tempLevelPedas.biaya_tambahan + totalToppingCost;

        const newCartItem: CartItem = {
            cartId: `item-${Date.now()}-${Math.random()}`,
            produkId: selectedProduct.id,
            nama_menu: selectedProduct.nama_menu,
            foto: selectedProduct.foto,
            harga_satuan: itemPricePerUnit,
            qty: 1,
            levelPedas: tempLevelPedas.nama,
            biayaLevelPedas: tempLevelPedas.biaya_tambahan,
            extraTopping: tempToppings,
            catatan: tempCatatan,
            subtotal: itemPricePerUnit,
        };

        setCart([...cart, newCartItem]);
        setIsCustomizeOpen(false);
    };

    // Kontrol Qty Keranjang
    const updateQty = (cartId: string, delta: number) => {
        setCart(
            cart
                .map((item) => {
                    if (item.cartId === cartId) {
                        const newQty = item.qty + delta;
                        return {
                            ...item,
                            qty: newQty,
                            subtotal: item.harga_satuan * newQty,
                        };
                    }
                    return item;
                })
                .filter((item) => item.qty > 0)
        );
    };

    // Hitung Total Finansial
    const totalSubtotal = cart.reduce((acc, item) => acc + item.subtotal, 0);
    const pajak = totalSubtotal * DUMMY_PROFIL_TOKO.pajak_persen;
    const grandTotal = totalSubtotal + pajak;
    const kembalian = Math.max(0, cashReceived - grandTotal);

    // Proses Selesai Bayar
    const handleCompletePayment = () => {
        setIsPaymentOpen(false);
        setIsSuccessReceiptOpen(true);
    };

    // Reset Order Baru
    const handleNewOrder = () => {
        setCart([]);
        setCashReceived(0);
        setIsSuccessReceiptOpen(false);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-5 font-sans pb-10 min-h-[calc(100vh-5rem)]">

            {/* ========================================================================= */}
            {/* KOLOM KIRI (62%): KATALOG PRODUK, SEARCH & KATEGORI                       */}
            {/* ========================================================================= */}
            <div className="w-full lg:w-[62%] flex flex-col space-y-4">

                {/* Header Kasir & Search Bar */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
                    <div className="w-full sm:w-72 relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari Sushi, Ayam, Nasi Goreng..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                        />
                    </div>

                    {/* Indikator Shift Kasir Aktif */}
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 self-end sm:self-center">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                        <span>Kasir: <strong>Siti Rahma</strong> (Shift Pagi)</span>
                    </div>
                </div>

                {/* Tab Kategori Menu (Pills) */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                    <button
                        onClick={() => setSelectedKategori("all")}
                        className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${selectedKategori === "all"
                            ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                            : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                            }`}
                    >
                        🔥 Semua Menu ({DUMMY_PRODUK.length})
                    </button>
                    {DUMMY_KATEGORI.map((kat) => (
                        <button
                            key={kat.id}
                            onClick={() => setSelectedKategori(kat.id)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${selectedKategori === kat.id
                                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                                }`}
                        >
                            <span>{kat.uraian}</span>
                        </button>
                    ))}
                </div>

                {/* Grid Kartu Menu Makanan */}
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3.5 overflow-y-auto max-h-[calc(100vh-14rem)] pr-1">
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => handleProductClick(product)}
                            className="bg-white border border-slate-200 rounded-2xl p-3 shadow-xs hover:shadow-md hover:border-indigo-400 transition-all cursor-pointer flex flex-col justify-between group active:scale-[0.98]"
                        >
                            <div>
                                <div className="h-24 w-full bg-slate-50 rounded-xl flex items-center justify-center text-4xl mb-2.5 group-hover:scale-105 transition-transform">
                                    {product.foto}
                                </div>
                                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                                    {product.kategori_nama}
                                </span>
                                <h3 className="text-xs sm:text-sm font-bold text-slate-800 mt-1 line-clamp-2 leading-snug">
                                    {product.nama_menu}
                                </h3>
                            </div>

                            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                                <div>
                                    <span className="text-xs sm:text-sm font-black text-slate-900">
                                        Rp {product.harga_jual.toLocaleString("id-ID")}
                                    </span>
                                    <span className="block text-[10px] text-slate-400">
                                        Stok: {product.stok}
                                    </span>
                                </div>
                                <div className="w-7 h-7 rounded-lg bg-indigo-50 group-hover:bg-indigo-600 group-hover:text-white text-indigo-600 flex items-center justify-center transition-colors">
                                    <Plus className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ========================================================================= */}
            {/* KOLOM KANAN (38%): KERANJANG ORDER, MEJA & CHECKOUT                       */}
            {/* ========================================================================= */}
            <div className="w-full lg:w-[38%] bg-white rounded-3xl border border-slate-200 shadow-lg p-5 flex flex-col justify-between min-h-[580px]">

                {/* 1. Header Order & Pilihan Tipe (Dine In / Takeaway) */}
                <div>
                    <div className="flex bg-slate-100 p-1 rounded-xl mb-3.5 border border-slate-200">
                        <button
                            onClick={() => setOrderType("dine_in")}
                            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${orderType === "dine_in"
                                ? "bg-white text-indigo-600 shadow-xs"
                                : "text-slate-500 hover:text-slate-800"
                                }`}
                        >
                            <UtensilsCrossed className="w-3.5 h-3.5" />
                            <span>Dine-In (Makan Sini)</span>
                        </button>
                        <button
                            onClick={() => setOrderType("takeaway")}
                            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${orderType === "takeaway"
                                ? "bg-white text-indigo-600 shadow-xs"
                                : "text-slate-500 hover:text-slate-800"
                                }`}
                        >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Takeaway (Bungkus)</span>
                        </button>
                    </div>

                    {/* Form Nomor Meja & Nama Pelanggan */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        {orderType === "dine_in" ? (
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                    Nomor Meja
                                </label>
                                <select
                                    value={tableNumber}
                                    onChange={(e) => setTableNumber(e.target.value)}
                                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500"
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                                        <option key={num} value={`Meja #${num < 10 ? `0${num}` : num}`}>
                                            Meja #{num < 10 ? `0${num}` : num}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ) : (
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                    Label Order
                                </label>
                                <input
                                    type="text"
                                    value={tableNumber}
                                    onChange={(e) => setTableNumber(e.target.value)}
                                    placeholder="Bungkus #01 / Ojol"
                                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500"
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                Nama Tamu (Opsional)
                            </label>
                            <input
                                type="text"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                placeholder="Contoh: Pak Budi"
                                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                    </div>

                    <div className="border-t border-slate-100 pt-2 flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-700">Daftar Item ({cart.length})</span>
                        {cart.length > 0 && (
                            <button
                                onClick={() => setCart([])}
                                className="text-[11px] text-red-500 font-semibold hover:underline flex items-center gap-1"
                            >
                                <Trash2 className="w-3 h-3" /> Reset
                            </button>
                        )}
                    </div>
                </div>

                {/* 2. List Item di Keranjang */}
                <div className="flex-1 overflow-y-auto max-h-[260px] space-y-2.5 pr-1 divide-y divide-slate-100">
                    {cart.length === 0 ? (
                        <div className="py-12 flex flex-col items-center justify-center text-slate-300">
                            <ChefHat className="w-12 h-12 stroke-[1.5] mb-2" />
                            <p className="text-xs font-semibold text-slate-400">Keranjang masih kosong</p>
                            <span className="text-[11px] text-slate-400">Klik menu di sebelah kiri untuk memesan</span>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.cartId} className="pt-2.5 first:pt-0">
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-800 leading-tight">
                                            {item.nama_menu}
                                        </h4>
                                        <span className="text-[11px] text-amber-700 font-medium bg-amber-50 px-1.5 py-0.2 rounded inline-block mt-0.5">
                                            🌶️ {item.levelPedas}
                                        </span>
                                        {item.extraTopping.length > 0 && (
                                            <p className="text-[10px] text-slate-500">
                                                + {item.extraTopping.map((t) => t.nama).join(", ")}
                                            </p>
                                        )}
                                        {item.catatan && (
                                            <p className="text-[10px] text-slate-400 italic">
                                                &ldquo;{item.catatan}&rdquo;
                                            </p>
                                        )}
                                    </div>
                                    <span className="text-xs font-black text-slate-900 shrink-0">
                                        Rp {item.subtotal.toLocaleString("id-ID")}
                                    </span>
                                </div>

                                {/* Kontrol Qty */}
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-[10px] text-slate-400">
                                        @ Rp {item.harga_satuan.toLocaleString("id-ID")}
                                    </span>
                                    <div className="flex items-center gap-2 bg-slate-100 px-2 py-0.5 rounded-lg">
                                        <button
                                            onClick={() => updateQty(item.cartId, -1)}
                                            className="text-slate-600 hover:text-red-600"
                                        >
                                            <Minus className="w-3 h-3" />
                                        </button>
                                        <span className="text-xs font-bold text-slate-800 w-4 text-center">
                                            {item.qty}
                                        </span>
                                        <button
                                            onClick={() => updateQty(item.cartId, 1)}
                                            className="text-slate-600 hover:text-indigo-600"
                                        >
                                            <Plus className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* 3. Ringkasan Finansial & Tombol Bayar */}
                <div className="border-t border-slate-200 pt-3 mt-3 space-y-2">
                    <div className="flex justify-between text-xs text-slate-500 font-medium">
                        <span>Subtotal</span>
                        <span>Rp {totalSubtotal.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between text-sm font-black text-slate-900 pt-1 border-t border-dashed border-slate-200">
                        <span>Total Bayar</span>
                        <span className="text-lg text-indigo-600">
                            Rp {grandTotal.toLocaleString("id-ID")}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2">
                        <button
                            disabled={cart.length === 0}
                            onClick={() => alert(`Pesanan ${tableNumber} disimpan ke antrean dapur!`)}
                            className="w-full py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs disabled:opacity-50 transition-all"
                        >
                            Simpan ke Dapur
                        </button>
                        <button
                            disabled={cart.length === 0}
                            onClick={() => {
                                setCashReceived(grandTotal);
                                setIsPaymentOpen(true);
                            }}
                            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md shadow-indigo-600/30 disabled:opacity-50 transition-all flex items-center justify-center gap-1.5 active:scale-95"
                        >
                            <span>Bayar (Checkout)</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* ========================================================================= */}
            {/* MODAL 1: KUSTOMISASI LEVEL PEDAS & EXTRA TOPPING                           */}
            {/* ========================================================================= */}
            {isCustomizeOpen && selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 space-y-5 animate-in zoom-in-95">

                        <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                            <div>
                                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                                    {selectedProduct.kategori_nama}
                                </span>
                                <h3 className="text-lg font-black text-slate-900 mt-1">
                                    {selectedProduct.nama_menu}
                                </h3>
                                <p className="text-xs font-bold text-slate-500">
                                    Harga Dasar: Rp {selectedProduct.harga_jual.toLocaleString("id-ID")}
                                </p>
                            </div>
                            <button
                                onClick={() => setIsCustomizeOpen(false)}
                                className="text-slate-400 hover:text-slate-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Pilihan Level Pedas */}
                        <div>
                            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                                <Flame className="w-4 h-4 text-orange-500" />
                                <span>1. Pilih Level Pedas:</span>
                            </label>
                            <div className="space-y-1.5">
                                {DUMMY_VARIAN[0].opsi.map((lvl) => (
                                    <button
                                        key={lvl.nama}
                                        type="button"
                                        onClick={() => setTempLevelPedas(lvl)}
                                        className={`w-full p-2.5 rounded-xl border text-left text-xs font-bold flex items-center justify-between transition-all ${tempLevelPedas.nama === lvl.nama
                                            ? "bg-amber-50 border-amber-400 text-amber-900 ring-2 ring-amber-400/20"
                                            : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                                            }`}
                                    >
                                        <span>{lvl.nama}</span>
                                        <span className="text-[11px] font-semibold text-slate-500">
                                            {lvl.biaya_tambahan > 0 ? `+Rp ${lvl.biaya_tambahan.toLocaleString("id-ID")}` : "Gratis"}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Pilihan Extra Topping */}
                        <div>
                            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                                <Plus className="w-4 h-4 text-indigo-500" />
                                <span>2. Tambah Topping (Bisa Pilih Banyak):</span>
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {DUMMY_VARIAN[1].opsi.map((top) => {
                                    const isChecked = tempToppings.some((t) => t.nama === top.nama);
                                    return (
                                        <button
                                            key={top.nama}
                                            type="button"
                                            onClick={() => toggleTopping(top)}
                                            className={`p-2 rounded-xl border text-left text-[11px] font-bold transition-all ${isChecked
                                                ? "bg-indigo-50 border-indigo-400 text-indigo-900 ring-1 ring-indigo-400"
                                                : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                                                }`}
                                        >
                                            <div className="truncate">{top.nama}</div>
                                            <div className="text-[10px] text-slate-400 font-semibold mt-0.5">
                                                +Rp {top.biaya_tambahan.toLocaleString("id-ID")}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Catatan Khusus */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Catatan Dapur (Misal: Jangan pakai daun bawang):
                            </label>
                            <input
                                type="text"
                                value={tempCatatan}
                                onChange={(e) => setTempCatatan(e.target.value)}
                                placeholder="Catatan khusus pelanggan..."
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                            />
                        </div>

                        {/* Tombol Simpan Custom */}
                        <div className="pt-3 border-t border-slate-100 flex gap-2">
                            <button
                                type="button"
                                onClick={() => setIsCustomizeOpen(false)}
                                className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={addToCartFromCustomize}
                                className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/25 transition-all"
                            >
                                Tambah ke Pesanan
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ========================================================================= */}
            {/* MODAL 2: PEMBAYARAN (CHECKOUT)                                            */}
            {/* ========================================================================= */}
            {isPaymentOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 space-y-5 animate-in zoom-in-95">

                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <div>
                                <h3 className="text-lg font-black text-slate-900">Pembayaran Kasir</h3>
                                <p className="text-xs text-slate-500">
                                    {orderType === "dine_in" ? tableNumber : "Takeaway / Bungkus"} &bull; Total:{" "}
                                    <strong className="text-indigo-600">Rp {grandTotal.toLocaleString("id-ID")}</strong>
                                </p>
                            </div>
                            <button onClick={() => setIsPaymentOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Switch Metode Pembayaran */}
                        <div className="grid grid-cols-3 gap-2">
                            <button
                                type="button"
                                onClick={() => setPaymentMethod("cash")}
                                className={`p-3 rounded-2xl border text-center font-bold text-xs flex flex-col items-center gap-1.5 transition-all ${paymentMethod === "cash"
                                    ? "bg-indigo-50 border-indigo-500 text-indigo-900 ring-2 ring-indigo-500/20"
                                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-white"
                                    }`}
                            >
                                <Banknote className="w-5 h-5 text-emerald-600" />
                                <span>Tunai / Cash</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setPaymentMethod("qris")}
                                className={`p-3 rounded-2xl border text-center font-bold text-xs flex flex-col items-center gap-1.5 transition-all ${paymentMethod === "qris"
                                    ? "bg-indigo-50 border-indigo-500 text-indigo-900 ring-2 ring-indigo-500/20"
                                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-white"
                                    }`}
                            >
                                <QrCode className="w-5 h-5 text-indigo-600" />
                                <span>QRIS Instant</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setPaymentMethod("debit")}
                                className={`p-3 rounded-2xl border text-center font-bold text-xs flex flex-col items-center gap-1.5 transition-all ${paymentMethod === "debit"
                                    ? "bg-indigo-50 border-indigo-500 text-indigo-900 ring-2 ring-indigo-500/20"
                                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-white"
                                    }`}
                            >
                                <CreditCard className="w-5 h-5 text-blue-600" />
                                <span>Debit BCA</span>
                            </button>
                        </div>

                        {/* TAB TUNAI */}
                        {paymentMethod === "cash" && (
                            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Uang Diterima dari Tamu (Rp):
                                    </label>
                                    <input
                                        type="number"
                                        value={cashReceived || ""}
                                        onChange={(e) => setCashReceived(Number(e.target.value))}
                                        className="w-full text-xl font-black px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-500"
                                    />
                                </div>

                                {/* Kembalian */}
                                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs sm:text-sm font-black">
                                    <span className="text-slate-600">Kembalian:</span>
                                    <span className={`text-base ${cashReceived >= grandTotal ? "text-emerald-600" : "text-red-500"}`}>
                                        Rp {kembalian.toLocaleString("id-ID")}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* TAB QRIS */}
                        {paymentMethod === "qris" && (
                            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-center space-y-2 flex flex-col items-center">
                                <div className="w-36 h-36 bg-white p-2 border border-slate-300 rounded-xl shadow-xs flex items-center justify-center">
                                    <QrCode className="w-28 h-28 text-slate-800" />
                                </div>
                                <span className="text-xs font-bold text-slate-800">
                                    Scan QRIS: {DUMMY_PROFIL_TOKO.nama_usaha}
                                </span>
                                <span className="text-[11px] text-slate-400">
                                    Mendukung BCA, Gopay, OVO, ShopeePay, Dana
                                </span>
                            </div>
                        )}

                        {/* TAB DEBIT */}
                        {paymentMethod === "debit" && (
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center text-xs text-slate-600">
                                Silakan gesek / tap kartu debit pada mesin EDC BCA sebesar{" "}
                                <strong className="text-slate-900 block text-sm mt-1">
                                    Rp {grandTotal.toLocaleString("id-ID")}
                                </strong>
                            </div>
                        )}

                        {/* Tombol Konfirmasi Bayar */}
                        <div className="pt-3 border-t border-slate-100 flex gap-2">
                            <button
                                type="button"
                                onClick={() => setIsPaymentOpen(false)}
                                className="flex-1 py-3 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50"
                            >
                                Kembali
                            </button>
                            <button
                                type="button"
                                disabled={paymentMethod === "cash" && cashReceived < grandTotal}
                                onClick={handleCompletePayment}
                                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/30 disabled:opacity-50 transition-all flex items-center justify-center gap-1.5"
                            >
                                <CheckCircle2 className="w-4 h-4" />
                                <span>Konfirmasi Lunas</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ========================================================================= */}
            {/* MODAL 3: STRUK SUKSES & CETAK                                             */}
            {/* ========================================================================= */}
            {isSuccessReceiptOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 space-y-4 text-center animate-in zoom-in-95">

                        <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                            <CheckCircle2 className="w-8 h-8" />
                        </div>

                        <h3 className="text-xl font-black text-slate-900">Transaksi Berhasil!</h3>
                        <p className="text-xs text-slate-500">
                            Pesanan {orderType === "dine_in" ? tableNumber : "Takeaway"} telah dicatat dan terkirim ke dapur.
                        </p>

                        {/* Struk Mini Preview */}
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-left text-xs font-mono space-y-1.5 text-slate-700">
                            <div className="text-center font-bold text-slate-900 border-b border-slate-200 pb-1">
                                {DUMMY_PROFIL_TOKO.nama_usaha}
                            </div>
                            <div className="flex justify-between text-[10px] text-slate-400">
                                <span>{new Date().toLocaleTimeString()}</span>
                                <span>{tableNumber}</span>
                            </div>
                            <div className="divide-y divide-slate-200/60 py-1">
                                {cart.map((it) => (
                                    <div key={it.cartId} className="flex justify-between py-1 text-[11px]">
                                        <span>{it.nama_menu} x{it.qty}</span>
                                        <span>Rp {it.subtotal.toLocaleString("id-ID")}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-slate-300 pt-1 flex justify-between font-bold text-slate-900 text-xs">
                                <span>TOTAL:</span>
                                <span>Rp {grandTotal.toLocaleString("id-ID")}</span>
                            </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                            <button
                                type="button"
                                onClick={() => alert("Mencetak Struk Thermal 58mm...")}
                                className="flex-1 py-2.5 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 flex items-center justify-center gap-1.5"
                            >
                                <Printer className="w-4 h-4" />
                                <span>Cetak Struk</span>
                            </button>
                            <button
                                type="button"
                                onClick={handleNewOrder}
                                className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md transition-all"
                            >
                                Transaksi Baru
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
