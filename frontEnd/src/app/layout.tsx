// src/app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FlexPOS - Sistem Point of Sale Multi-Bisnis (F&B, Barbershop, Sport, Retail)',
  description: 'Aplikasi Kasir Dinamis & Fleksibel untuk F&B, Barbershop, Sewa Lapangan / Sport, dan Retail.',
}

export default function RootLayout({ children, }: { children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  )
}
