'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  LayoutDashboard, Syringe,
  LogOut, Menu, X, ChevronRight,
  Building} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useUser } from '@/hooks/useUser'
import { toast } from 'sonner'

const navItems = [
  { href: '/',          label: 'Dashboard', icon: LayoutDashboard },
  { href: '/kunjungan', label: 'Kunjungan', icon: LayoutDashboard },
  { href: '/vaksinasi', label: 'Vaksinasi', icon: Syringe },
  { href: '/poli',      label: 'Poli',      icon: Building },
  { href: '/vaksin',    label: 'Vaksin',    icon: Syringe },
]

export function Sidebar() {
  const pathname                = usePathname()
  const router                  = useRouter()
  const { user, refreshUser }   = useUser()
  const [open, setOpen]         = useState(false)
  const [isMounted, setMounted] = useState(false)

  useEffect(() => {
    refreshUser()
    setMounted(true)
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    supabase.auth.signOut().then(() => {
      router.push('/login')
      router.refresh()
    }).catch((error) => {
      console.error(error)
      toast.error(error.message)
    })
  }

  const initials = isMounted ? user?.full_name
    ?.split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() ?? 'PL' : 'PL'

  const roleBadge: Record<string, { bg: string; color: string }> = {
    admin:   { bg: 'rgba(249,115,22,0.15)',  color: '#FB923C' },
    petugas: { bg: 'rgba(46,134,171,0.15)',  color: '#60A5FA' },
    public:  { bg: 'rgba(34,197,94,0.15)',   color: '#4ADE80' },
  }
  
  const badge = roleBadge[isMounted ? user?.role ?? '' : ''] ?? roleBadge.public

  if (pathname === '/login') return null

  const SidebarContent = () => (
    <>
      {/* Header */}
      <div className="p-5 flex items-center justify-between"
        style={{ borderBottom: '1px solid var(--border-default)' }}>
        <div>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            Sistem Informasi
          </p>
          <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
            Poliklinik Eksekutif
          </p>
        </div>
        {/* Tombol X — hanya di mobile */}
        <button
          onClick={() => setOpen(false)}
          className="lg:hidden p-1.5 rounded-lg transition-colors"
          style={{ color: 'var(--text-muted)' }}
        >
          <X size={18} />
        </button>
      </div>

      {/* ── Info Akun ── */}
      <div className="mx-3 mt-3 rounded-xl overflow-hidden"
        style={{ border: '1px solid var(--border-default)' }}>

        {/* Avatar + Nama */}
        <div className="flex items-center gap-3 p-2"
          style={{ background: 'rgba(46,134,171,0.06)' }}>
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
            style={{ 
              background: 'linear-gradient(135deg, var(--blue-primary), var(--blue-medium))',
              color: 'white',
            }}
          >
            {initials}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate"
              style={{ color: 'var(--text-primary)' }}>
              {isMounted ? user?.full_name ?? 'Nurse' : 'Nurse'}
            </p>
            {/* Role badge */}
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-regular mt-0.5"
              style={{ background: badge.bg, color: badge.color }}>
              {(isMounted ? user?.role ?? "Public" : "Public").toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className={`sidebar-item ${pathname === href ? 'active' : ''}`}
          >
            <Icon size={16} />
            <span className="flex-1">{label}</span>
            {pathname === href && (
              <ChevronRight size={13} style={{ color: 'var(--orange-primary)' }} />
            )}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3" style={{ borderTop: '1px solid var(--border-default)' }}>
        <Button
          onClick={handleLogout}
          className="w-full"
          variant='destructive'
          style={{ color: '#F87171' }}
        >
          <LogOut size={16} />
          <span>Keluar</span>
        </Button>
      </div>
    </>
  )

  return (
    <>
      {/* ── Desktop ── */}
      <aside className="sidebar hidden lg:flex lg:flex-col">
        <SidebarContent />
      </aside>

      {/* ── Mobile Topbar ── */}
      <div
        className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 h-14"
        style={{
          background: 'var(--bg-card)',
          borderBottom: '1px solid var(--border-default)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Hamburger */}
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-lg"
          style={{ color: 'var(--text-secondary)' }}
        >
          <Menu size={20} />
        </button>

        {/* Logo tengah */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
            Poliklinik Eksekutif
          </span>
        </div>

        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
          style={{ 
            background: 'linear-gradient(135deg, var(--blue-primary), var(--blue-medium))',
            color: 'white',
          }}
        >
          {initials}
        </div>
      </div>

      {/* ── Mobile Drawer + Overlay ── */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-50 flex"
          onClick={() => setOpen(false)}
        >
          {/* Overlay blur */}
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
          />

          {/* Drawer */}
          <aside
            className="relative z-10 flex flex-col w-72 h-full"
            style={{
              background: 'var(--bg-card)',
              borderRight: '1px solid var(--border-default)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* ── Offset konten mobile biar tidak tertutup topbar ── */}
      <div className="lg:hidden h-14 shrink-0" />
    </>
  )
}