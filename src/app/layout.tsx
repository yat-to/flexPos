// src/app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Point of Sale',
  description: 'Aplikasi Kasir',
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
