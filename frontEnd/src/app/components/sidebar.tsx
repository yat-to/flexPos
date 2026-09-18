"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import * as LucideIcons from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

import { menu } from '../../data/menu';
import { MenuItem } from '../../types';

const ListMenu = ({ item }: { item: MenuItem }) => {
    const router = useRouter(); // Pastikan router dipanggil di sini juga
    const hasChildren = (item.children ?? []).length > 0;
    const [isOpen, setIsOpen] = useState(false)
    const DynamicIcon = item.icon ? LucideIcons[item.icon as keyof typeof LucideIcons] as React.ElementType : null;
    const ChevronIcon = LucideIcons['ChevronDown'];

    const handleClick = () => {
        if (hasChildren) {
            // Jika punya anak, buka/tutup dropdown
            setIsOpen(!isOpen);
        } else {
            // Jika TIDAK punya anak, pindah ke URL-nya
            if (item.url) {
                router.push(item.url);
            }
        }
    };

    return (
        <li className="list-none">
            <div
                onClick={handleClick}
                className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 cursor-pointer transition-colors"
            >
                <div className="flex items-center gap-4">
                    {DynamicIcon ? <DynamicIcon size={20} /> : " "}
                    <span>{item.title}</span>
                </div>

                {hasChildren && (
                    <span className={`text-[10px] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                        <ChevronIcon />
                    </span>
                )}
            </div>

            {hasChildren && (
                <div
                    className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-1' : 'grid-rows-[0fr] opacity-0'
                        }`}
                >
                    <ul className="overflow-hidden ml-9 border-l border-gray-200 flex flex-col gap-1">
                        {item.children?.map((child: MenuItem) => (
                            <ListMenu key={child.title} item={child} />
                        ))}
                    </ul>
                </div>
            )}
        </li>
    )
}

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
    const user = useAuthStore((state) => state.user);

    const businessTypeLabels: Record<string, { label: string; icon: string; bg: string }> = {
        food: { label: "F&B / Kuliner", icon: "🍔", bg: "bg-orange-50 text-orange-700 border-orange-200" },
        barbershop: { label: "Barbershop / Jasa", icon: "💈", bg: "bg-blue-50 text-blue-700 border-blue-200" },
        sport: { label: "Sport & Arena", icon: "⚽", bg: "bg-emerald-50 text-emerald-700 border-emerald-200" },
        retail: { label: "Retail / Toko", icon: "🛍️", bg: "bg-purple-50 text-purple-700 border-purple-200" },
    };

    const currentBusiness = user?.businessType
        ? businessTypeLabels[user.businessType] || businessTypeLabels.food
        : businessTypeLabels.food;

    return (
        <div>
            {isOpen && (
                <div
                    className='fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity'
                    onClick={onClose}
                />
            )}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col 
                transition-transform duration-300 ease-in-out

                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                {/* Brand Logo Section */}
                <div className="p-5 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="relative w-15 h-15 rounded-xl overflow-hidden flex items-center justify-center shrink-0">
                            <Image
                                src="/images/icon.png"
                                alt="FlexPOS Logo"
                                width={40}
                                height={40}
                                className="w-full h-full object-contain"
                                priority
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-xl font-extrabold text-gray-900 tracking-tight">Flex</span>
                                <span className="text-xl font-extrabold text-indigo-600 tracking-tight">POS</span>
                            </div>
                            <p className="text-[11px] text-gray-400 font-medium leading-none mt-0.5">
                                Satu Aplikasi Kasir Untuk Segala Jenis Usaha
                            </p>
                        </div>
                    </div>

                    {/* Store & Business Type Tag */}
                    <div className="mt-3.5 pt-3 border-t border-gray-50 flex items-center justify-between">
                        <div className="truncate pr-2">
                            <p className="text-xs font-bold text-gray-800 truncate">
                                {user?.storeName || "Toko FlexPOS"}
                            </p>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 flex items-center gap-1 ${currentBusiness.bg}`}>
                            <span>{currentBusiness.icon}</span>
                            <span>{currentBusiness.label.split("/")[0]}</span>
                        </span>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                    {
                        menu.map((item) => (
                            <ListMenu key={item.title} item={item} />
                        ))
                    }
                </nav>
            </aside>
        </div>
    )
}

export default Sidebar