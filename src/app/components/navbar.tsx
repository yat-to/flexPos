"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
    Bell,
    User,
    ChevronDown,
    LogOut,
    Settings,
    Menu,
    ShoppingBag,
    AlertTriangle,
    CheckCheck,
    Clock,
    UserCheck,
    TrendingUp,
    Trash2,
    Check
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

interface NavbarProps {
    onMenuClick: () => void;
}

interface NotificationItem {
    id: string;
    title: string;
    message: string;
    time: string;
    type: 'order' | 'stock' | 'system' | 'payment';
    isRead: boolean;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
    {
        id: '1',
        title: 'Pesanan Selesai Dibayar',
        message: 'Transaksi #ORD-089 (Meja 04) senilai Rp 135.000 telah lunas via QRIS.',
        time: '2 mnt lalu',
        type: 'order',
        isRead: false,
    },
    {
        id: '2',
        title: 'Peringatan Stok Menipis',
        message: 'Stok Salmon Sushi Roll tersisa 3 porsi di sistem.',
        time: '15 mnt lalu',
        type: 'stock',
        isRead: false,
    },
    {
        id: '3',
        title: 'Shift Kasir Dimulai',
        message: 'Kasir Siti Rahma telah membuka shift pagi dengan modal awal Rp 200.000.',
        time: '1 jam lalu',
        type: 'system',
        isRead: false,
    },
    {
        id: '4',
        title: 'Laporan Penjualan Siap',
        message: 'Ringkasan rekapitulasi penjualan hari kemarin berhasil diekspor.',
        time: '5 jam lalu',
        type: 'payment',
        isRead: true,
    },
];

export default function Navbar({ onMenuClick }: NavbarProps) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
    const [notifFilter, setNotifFilter] = useState<'all' | 'unread'>('all');

    const profileDropdownRef = useRef<HTMLDivElement>(null);
    const notifDropdownRef = useRef<HTMLDivElement>(null);

    const router = useRouter();
    const logout = useAuthStore((state) => state.logout);
    const user = useAuthStore((state) => state.user);

    const displayName = user?.name || "Admin POS";
    const initials = displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();

    // Hitung jumlah notifikasi belum dibaca
    const unreadCount = notifications.filter((n) => !n.isRead).length;

    // Filter notifikasi sesuai tab
    const displayedNotifications = notifications.filter((n) => {
        if (notifFilter === 'unread') return !n.isRead;
        return true;
    });

    // Tandai satu notifikasi sebagai sudah dibaca
    const markAsRead = (id: string) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
        );
    };

    // Tandai semua notifikasi sebagai sudah dibaca
    const markAllAsRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    };

    // Hapus satu notifikasi
    const deleteNotification = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    // Bersihkan semua notifikasi
    const clearAllNotifications = () => {
        setNotifications([]);
    };

    // Handle klik di luar dropdown untuk menutup popover
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(target)) {
                setIsProfileOpen(false);
            }
            if (notifDropdownRef.current && !notifDropdownRef.current.contains(target)) {
                setIsNotifOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Icon helper berdasarkan kategori notifikasi
    const renderNotifIcon = (type: NotificationItem['type']) => {
        switch (type) {
            case 'order':
                return (
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        <ShoppingBag size={16} />
                    </div>
                );
            case 'stock':
                return (
                    <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                        <AlertTriangle size={16} />
                    </div>
                );
            case 'system':
                return (
                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                        <UserCheck size={16} />
                    </div>
                );
            case 'payment':
                return (
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                        <TrendingUp size={16} />
                    </div>
                );
        }
    };

    return (
        <nav className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 top-0 z-30 relative">
            <button
                onClick={onMenuClick}
                className="p-2 mr-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Toggle Menu"
            >
                <Menu size={24} />
            </button>

            <div className="flex items-center gap-3 ml-auto">

                {/* ========================================================================= */}
                {/* DROPDOWN NOTIFIKASI                                                       */}
                {/* ========================================================================= */}
                <div className="relative" ref={notifDropdownRef}>
                    <button
                        onClick={() => {
                            setIsNotifOpen(!isNotifOpen);
                            if (isProfileOpen) setIsProfileOpen(false);
                        }}
                        className={`relative p-2.5 rounded-full transition-all duration-200 ${
                            isNotifOpen
                                ? "bg-indigo-50 text-indigo-600 ring-2 ring-indigo-500/20"
                                : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        }`}
                        title="Notifikasi"
                    >
                        <Bell size={20} />
                        {unreadCount > 0 && (
                            <span className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-black text-white bg-red-500 rounded-full border-2 border-white animate-in zoom-in shadow-xs">
                                {unreadCount > 9 ? '9+' : unreadCount}
                            </span>
                        )}
                    </button>

                    {/* Popover / Dropdown Menu Notifikasi */}
                    <div
                        className={`absolute right-0 mt-3 w-80 sm:w-96 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 transition-all duration-200 origin-top-right overflow-hidden ${
                            isNotifOpen
                                ? 'scale-100 opacity-100 visible translate-y-0'
                                : 'scale-95 opacity-0 invisible -translate-y-2 pointer-events-none'
                        }`}
                    >
                        {/* Header Notifikasi */}
                        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold text-gray-800 text-base">Notifikasi</h3>
                                    {unreadCount > 0 && (
                                        <span className="px-2 py-0.5 text-xs font-semibold bg-indigo-100 text-indigo-700 rounded-full">
                                            {unreadCount} Baru
                                        </span>
                                    )}
                                </div>

                                {unreadCount > 0 && (
                                    <button
                                        onClick={markAllAsRead}
                                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:underline flex items-center gap-1 transition-colors"
                                    >
                                        <CheckCheck size={14} /> Tandai Dibaca
                                    </button>
                                )}
                            </div>

                            {/* Filter Tabs (Semua vs Belum Dibaca) */}
                            <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl">
                                <button
                                    onClick={() => setNotifFilter('all')}
                                    className={`flex-1 py-1 text-xs font-bold rounded-lg transition-all ${
                                        notifFilter === 'all'
                                            ? 'bg-white text-gray-800 shadow-xs'
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    Semua ({notifications.length})
                                </button>
                                <button
                                    onClick={() => setNotifFilter('unread')}
                                    className={`flex-1 py-1 text-xs font-bold rounded-lg transition-all ${
                                        notifFilter === 'unread'
                                            ? 'bg-white text-indigo-600 shadow-xs'
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    Belum Dibaca ({unreadCount})
                                </button>
                            </div>
                        </div>

                        {/* List Notifikasi */}
                        <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
                            {displayedNotifications.length === 0 ? (
                                <div className="py-10 px-4 text-center">
                                    <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-2">
                                        <Bell size={22} className="opacity-60" />
                                    </div>
                                    <p className="text-sm font-semibold text-gray-700">Tidak ada notifikasi</p>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        {notifFilter === 'unread'
                                            ? 'Semua notifikasi sudah kamu baca.'
                                            : 'Belum ada aktivitas baru tercatat.'}
                                    </p>
                                </div>
                            ) : (
                                displayedNotifications.map((notif) => (
                                    <div
                                        key={notif.id}
                                        onClick={() => markAsRead(notif.id)}
                                        className={`p-3.5 hover:bg-gray-50/80 cursor-pointer transition-colors flex items-start gap-3 relative group ${
                                            !notif.isRead ? 'bg-indigo-50/30' : 'bg-white'
                                        }`}
                                    >
                                        {/* Icon Kategori */}
                                        {renderNotifIcon(notif.type)}

                                        {/* Konten Text */}
                                        <div className="flex-1 min-w-0 pr-4">
                                            <div className="flex items-center justify-between gap-1 mb-0.5">
                                                <h4 className={`text-xs font-bold truncate ${!notif.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                                                    {notif.title}
                                                </h4>
                                                {!notif.isRead && (
                                                    <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" title="Belum dibaca"></span>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-1">
                                                {notif.message}
                                            </p>
                                            <div className="flex items-center gap-1 text-[11px] text-gray-400">
                                                <Clock size={11} />
                                                <span>{notif.time}</span>
                                            </div>
                                        </div>

                                        {/* Tombol Hapus (Hover) */}
                                        <button
                                            onClick={(e) => deleteNotification(notif.id, e)}
                                            className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 rounded-md hover:bg-gray-100 transition-all absolute right-2.5 top-3.5"
                                            title="Hapus"
                                        >
                                            <Trash2 size={13} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer Notifikasi */}
                        {notifications.length > 0 && (
                            <div className="p-2.5 border-t border-gray-100 bg-gray-50 flex items-center justify-between px-4">
                                <button
                                    onClick={clearAllNotifications}
                                    className="text-xs text-red-500 hover:text-red-700 font-semibold hover:underline"
                                >
                                    Bersihkan Semua
                                </button>
                                <span className="text-[11px] text-gray-400">
                                    FlexPOS Realtime Notifier
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="h-8 w-[1px] bg-gray-200 mx-1"></div>

                {/* ========================================================================= */}
                {/* DROPDOWN PROFIL USER                                                      */}
                {/* ========================================================================= */}
                <div className="relative" ref={profileDropdownRef}>
                    <button
                        onClick={() => {
                            setIsProfileOpen(!isProfileOpen);
                            if (isNotifOpen) setIsNotifOpen(false);
                        }}
                        className="flex items-center gap-3 hover:bg-gray-50 p-1.5 rounded-xl transition-colors border border-transparent hover:border-gray-200"
                    >
                        <div className="w-8 h-8 bg-gradient-to-tr from-indigo-600 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-xs">
                            {initials || "FP"}
                        </div>
                        <div className="hidden sm:block text-left">
                            <p className="text-sm font-semibold text-gray-800 leading-none">{displayName}</p>
                            <p className="text-[10px] text-gray-500 mt-1">{user?.storeName || (user?.username ? `@${user.username}` : "FlexPOS Admin")}</p>
                        </div>
                        <ChevronDown size={14} className={`text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <div
                        className={`absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50 transition-all duration-200 origin-top-right ${
                            isProfileOpen ? 'scale-100 opacity-100 visible' : 'scale-95 opacity-0 invisible pointer-events-none'
                        }`}
                    >
                        <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                            <User size={16} /> Profil Saya
                        </button>
                        <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                            <Settings size={16} /> Pengaturan
                        </button>
                        <hr className="my-2 border-gray-100" />
                        <button
                            onClick={() => {
                                logout();
                                router.push('/login');
                            }}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                            <LogOut size={16} /> Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}