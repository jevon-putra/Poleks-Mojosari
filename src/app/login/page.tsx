'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import { userCache } from "@/lib/userCache"
import { fetchUserProfile } from "@/service/user.service"
import { Lock, Mail, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export default function LoginPage() {
  const router                          = useRouter()
  const [email, setEmail]               = useState('')
  const [password, setPassword]         = useState('')
  const [loading, setLoading]           = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      toast.error(error.message)
      setLoading(false)
      return
    }

    if(data.user){
      var profile = await fetchUserProfile(data.user.id)
      if(profile) userCache.set(profile)
    }

    router.push('/')
    router.refresh()
  }

  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row"
      style={{ background: 'linear-gradient(135deg, var(--blue-primary) 0%, #1a3a6b 50%, var(--blue-primary) 100%)' }}
    >

      {/* ── Mobile Header ── */}
      <div className="lg:hidden flex items-center gap-3 px-6 pt-safe pt-6 pb-4">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0"
          style={{ background: 'linear-gradient(135deg, var(--orange-primary), var(--orange-dark))' }}
        >
          🏥
        </div>
        <span className="font-bold text-white">Poliklinik Eksekutif</span>
      </div>

      {/* ── Left Panel — desktop only ── */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
            style={{ background: 'linear-gradient(135deg, var(--orange-primary), var(--orange-dark))' }}
          >
            🏥
          </div>
          <span className="font-bold text-lg text-white">Poliklinik Eksekutif</span>
        </div>

        {/* Hero text */}
        <div className="flex-1 flex items-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl font-bold text-white leading-tight">
              Sistem Informasi<br />
              <span style={{ color: 'var(--orange-primary)' }}>
                Poliklinik Eksekutif
              </span><br />
              RSUD Soekandar Mojokerto
            </h1>
            <p className="text-lg leading-relaxed max-w-md"
              style={{ color: 'var(--blue-light)' }}>
              Platform pencatatan dan pelaporan kunjungan pasien
              serta vaksinasi secara real-time.
            </p>
          </div>
        </div>

        <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
          Made with ❤️ by OpelHunter
        </p>
      </div>

      {/* ── Right Panel ── */}
      <div className="flex-1 lg:w-1/2 flex items-center justify-center px-6 py-8 lg:p-8">
        <div className="w-full max-w-md">

          {/* Card glass */}
          <div
            className="rounded-2xl p-6 lg:p-8"
            style={{
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <h2 className="text-2xl font-bold text-white mb-1">Selamat Datang</h2>
            <p className="text-sm mb-8" style={{ color: 'var(--blue-light)' }}>
              Masuk ke akun Anda untuk melanjutkan
            </p>

            <form onSubmit={handleLogin} className="space-y-5">

              {/* Email */}
              <div>
                <label className="form-label-dark">Email</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: 'var(--orange-primary)' }}>
                    <Mail size={16} />
                  </span>
                  <Input
                    type="email"
                    variant="glass"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@poliklinik.com"
                    required
                    className="input-glass-icon"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="form-label-dark">Password</label>
                <div className="relative">
                  {/* Icon lock kiri */}
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: 'var(--orange-primary)' }}>
                    <Lock size={16} />
                  </span>

                  <Input
                    type={showPassword ? 'text' : 'password'}
                    variant="glass"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="input-glass-icon pr-10"
                  />

                  {/* Toggle show/hide kanan */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                    style={{ color: 'var(--orange-primary)' }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full mt-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10"
                        stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Masuk...
                  </>
                ) : 'Masuk'}
              </Button>

            </form>

            {/* Divider */}
            <div className="my-6"
              style={{ height: '1px', background: 'rgba(255,255,255,0.08)' }} />

            <p className="text-center text-xs" style={{ color: 'var(--text-secondary)' }}>
              Hubungi administrator jika lupa password
            </p>
          </div>

          {/* Footer mobile */}
          <p className="lg:hidden text-center text-xs mt-6"
            style={{ color: 'var(--blue-medium)' }}>
            Made with ❤️ by OpelHunter
          </p>

        </div>
      </div>
    </div>
  )
}