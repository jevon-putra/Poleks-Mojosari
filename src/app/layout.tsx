// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components/sidebar'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Poliklinik Eksekutif',
}

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="id" className="dark">
      <body className={inter.className}>
        <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg-page)' }}>
          <Sidebar />
          <main className="flex-1 overflow-auto pt-14 lg:pt-0" style={{ background: 'var(--bg-page)' }}>
            {children}
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  )
}