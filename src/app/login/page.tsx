'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const supabase = createClient()
        const { error } = await supabase.auth.signInWithPassword({ email, password })

        if (error) {
            toast.error(error.message)
            setLoading(false)
            return
        }

        router.push('/')
        router.refresh()
    }

    return (
        <div className="min-h-screen flex" style={{ background: 'linear-gradient(135deg, #0f2744 0%, #1a3a6b 50%, #0f2744 100%)' }}>

            {/* ── Left Panel ── */}
            <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12">

                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                        style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}>
                        🏥
                    </div>
                    <span className="text-white font-bold text-lg">Poliklinik Eksekutif</span>
                </div>

                {/* Hero text — center vertikal */}
                <div className="flex-1 flex items-center">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-5xl font-bold text-white leading-tight">
                        Sistem Informasi<br />
                        <span style={{ color: '#fb923c' }}>Poliklinik Eksekutif</span><br />
                        RSUD Soekandar Mojokerto
                        </h1>
                        <p className="text-blue-200 text-lg leading-relaxed max-w-md"> Platform pencatatan dan pelaporan kunjungan pasien serta vaksinasi secara real-time.
                        </p>
                    </div>
                </div>

                <p className="text-blue-400 text-xs">Made with ❤️ by OpelHunter</p>
            </div>

            {/* ── Right Panel ── */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    {/* Card glass */}
                    <div className="card-glass">

                        {/* Mobile logo */}
                        <div className="flex lg:hidden items-center gap-3 mb-8">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                                style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}>
                                🏥
                            </div>
                            <span className="text-white font-bold">Poliklinik Eksekutif</span>
                        </div>

                        <h2 className="text-2xl font-bold text-white mb-1">Selamat Datang</h2>
                        <p className="text-sm mb-8" style={{ color: '#93C5FD' }}>Masuk ke akun Anda untuk melanjutkan</p>

                        <form onSubmit={handleLogin} className="space-y-5">
                            {/* Email */}
                            <div>
                                <label className="form-label-dark">Email</label>
                                <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 text-sm">
                                    ✉️
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
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 text-sm">
                                    🔒
                                </span>
                                <Input
                                    type="password"
                                    variant="glass"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="input-glass-icon"
                                />
                                </div>
                            </div>

                            {/* Submit */}
                            <Button
                                type="submit"
                                variant="primary"
                                size="default" 
                                className="mt-4"
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
                        <p className="text-center text-xs mt-8" style={{ color: '#6B7280' }}>Hubungi administrator jika lupa password</p>
                    </div>
                </div>
            </div>
        </div>
    )
}