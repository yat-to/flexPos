"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Bell, Search, User, ChevronDown, LogOut, Settings, Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

interface NavbarProps {
    onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);
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

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 top-0 z-30">
            <button
                onClick={onMenuClick}
                className="p-2 mr-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
                <Menu size={24} />
            </button>

            <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-lg w-64">
                <Search size={18} className="text-gray-400" />
                <input
                    type="text"
                    placeholder="Cari sesuatu..."
                    className="bg-transparent border-none focus:outline-none ml-2 text-sm w-full text-gray-600"
                />
            </div>

            <div className="flex items-center gap-4 ml-auto">

                <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="h-8 w-[1px] bg-gray-200 mx-2"></div>

                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center gap-3 hover:bg-gray-50 p-1.5 rounded-xl transition-colors border border-transparent hover:border-gray-200"
                    >
                        <div className="w-8 h-8 bg-gradient-to-tr from-indigo-600 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-xs">
                            {initials || "FP"}
                        </div>
                        <div className="hidden sm:block text-left">
                            <p className="text-sm font-semibold text-gray-800 leading-none">{displayName}</p>
                            <p className="text-[10px] text-gray-500 mt-1">{user?.storeName || (user?.username ? `@${user.username}` : "FlexPOS Admin")}</p>
                        </div>
                        <ChevronDown size={14} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <div 
                        className={`absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50 transition-all duration-200 origin-top-right ${
                            isOpen ? 'scale-100 opacity-100 visible' : 'scale-95 opacity-0 invisible pointer-events-none'
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