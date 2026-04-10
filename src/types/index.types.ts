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
export interface VaksinasiGrouped {
  tanggal:      string
  total_vaksin: number
  detail:       VaksinasiHarian[]
}

export interface KunjunganGrouped {
  tanggal:      string
  total_pasien: number
  detail:       KunjunganHarian[]
}

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

//DASHBOARD
export interface MonthlyKunjungan {
  tanggal: string,
  jumlah_pasien: number
}

export interface MonthlyVaksinasi {
  tanggal: string,
  jumlah_dosis: number
}

export interface WeeklyKunjungan {
  nama_poli: string
  jumlah_pasien: number
}

export interface WeeklyVaksinasi {
  nama_vaksin: string
  jumlah_dosis: number
}

export interface DashboardData {
  listPoli: Poliklinik[]
  listVaksin: Vaksin[]
  cureentMonthlyVisit: MonthlyKunjungan[]
  lastMonthVisit: MonthlyKunjungan[]
  currentWeeklyVisit: WeeklyKunjungan[]
  lastWeekVisit: WeeklyKunjungan[]

  currentMonthlyDose: MonthlyVaksinasi[]
  lastMonthDose: MonthlyVaksinasi[]
  currentWeeklyDose: WeeklyVaksinasi[]
  lastWeekDose: WeeklyVaksinasi[]

  totalVisitCurrentWeek: number
  totalVisitLastWeek: number
  
  totalDoseCurrentWeek: number
  totalDoseLastWeek: number

  totalVisitCurrentMonth: number
  totalVisitLastMonth: number

  totalDoseCurrentMonth: number
  totalDoseLastMonth: number
}