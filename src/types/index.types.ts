// ─── Master Data ─────────────────────────────────
export interface Poliklinik {
  id: string
  nama_poli: string
  is_active: boolean
  created_by: string | null
  updated_by: string | null
  created_at: string
  updated_at: string
  creator?: { full_name: string } | null
  updater?: { full_name: string } | null
}

export interface Vaksin {
  id: string
  nama_vaksin: string
  is_active: boolean
  created_by: string | null
  updated_by: string | null
  created_at: string
  updated_at: string
}

// ─── Tabel Utama ──────────────────────────────────
export interface KunjunganHarian {
  id: string
  tanggal: string           // Format: "YYYY-MM-DD"
  poliklinik_id: string
  jumlah_pasien: number
  created_by: string | null
  updated_by: string | null
  created_at: string
  updated_at: string
}

export interface VaksinasiHarian {
  id: string
  tanggal: string           // Format: "YYYY-MM-DD"
  vaksin_id: string
  jumlah_dosis: number
  created_by: string | null
  updated_by: string | null
  created_at: string
  updated_at: string
}

// ─── User ─────────────────────────────────────────
export interface UserProfile {
  id: string
  full_name: string
  role: 'admin' | 'petugas' | 'public'
  created_at: string
}

// ─── Form Payloads (untuk create/update) ──────────
export type KunjunganPayload = {
  tanggal: string
  poliklinik_id: string
  jumlah_pasien: number
}

export type VaksinasiPayload = {
  tanggal: string
  vaksin_id: string
  jumlah_dosis: number
}