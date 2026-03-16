<div align="center">

<img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" />
<img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white" />

<br /><br />

# 🏥 SIMRS Poliklinik Eksekutif Mojosari

**Sistem Informasi pencatatan kunjungan pasien dan vaksinasi harian**<br />
Dibangun untuk memudahkan tim **Poleks Mojosari** dalam membuat laporan dan grafik secara real-time.

<br />

> *"Lahir dari keresahan nyata — melihat sulitnya proses rekap data kunjungan pasien*<br />
> *dan pembuatan laporan grafik bulanan yang selama ini dilakukan secara manual."*

<br />

</div>

---

## 📖 Tentang Proyek

Sistem ini adalah aplikasi **internal** Tim Poliklinik Eksekutif RSUD Soekandar Mojosari. Dibangun untuk menggantikan proses pencatatan manual yang memakan waktu, sistem ini memungkinkan petugas untuk mencatat data kunjungan dan vaksinasi harian dengan cepat, serta melihat laporan grafik bulanan secara otomatis — tanpa perlu membuat rekap manual lagi.

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|---|---|
| 📊 **Dashboard & Grafik** | Visualisasi kunjungan pasien dan vaksinasi per bulan secara real-time |
| 🏥 **Manajemen Poliklinik** | CRUD data ruangan poli dengan audit trail |
| 💉 **Manajemen Vaksin** | CRUD data jenis vaksin |
| 📋 **Kunjungan Harian** | Input jumlah pasien per poli per hari |
| 🩺 **Vaksinasi Harian** | Input jumlah dosis per vaksin per hari |
| 🔐 **Role-based Access** | 3 level akses: Admin, Petugas, dan Public |
| 📱 **Responsive** | Mendukung desktop dan mobile |

---

## 🛠️ Tech Stack

```
┌─────────────────────────────────────────────────────┐
│                    FRONTEND                         │
│  Next.js 14 (App Router)  +  TypeScript             │
│  Tailwind CSS v4          +  shadcn/ui              │
│  Recharts                 +  Lucide React           │
│  Sonner (Toast)           +  tw-animate-css         │
├─────────────────────────────────────────────────────┤
│                    BACKEND                          │
│  Supabase (PostgreSQL)                              │
│  Supabase Auth (Email & Password)                   │
│  Row Level Security (RLS)                           │
│  Database Triggers & Functions                      │
├─────────────────────────────────────────────────────┤
│                    DEPLOYMENT                       │
│  Vercel (Frontend)                                  │
│  Supabase Cloud (Database)                          │
└─────────────────────────────────────────────────────┘
```

---

## 🗄️ Database Schema

```
auth.users (Supabase built-in)
    │
    ▼
┌─────────────┐     ┌──────────────────┐     ┌──────────────────┐
│    users    │────▶│ kunjungan_harian │◀────│   poliklinik     │
│─────────────│     │──────────────────│     │──────────────────│
│ id (FK)     │     │ id               │     │ id               │
│ full_name   │     │ tanggal          │     │ nama_poli        │
│ role        │     │ poliklinik_id    │     │ is_active        │
└─────────────┘     │ jumlah_pasien    │     │ created_by       │
    │               │ created_by       │     │ updated_by       │
    │               └──────────────────┘     └──────────────────┘
    │
    │               ┌──────────────────┐     ┌──────────────────┐
    └──────────────▶│ vaksinasi_harian │◀────│     vaksin       │
                    │──────────────────│     │──────────────────│
                    │ id               │     │ id               │
                    │ tanggal          │     │ nama_vaksin      │
                    │ vaksin_id        │     │ is_active        │
                    │ jumlah_dosis     │     │ created_by       │
                    │ created_by       │     │ updated_by       │
                    └──────────────────┘     └──────────────────┘
```

---

## 🔐 Role & Akses

| Role | Dashboard | Input Data | CRUD Master | Audit Log |
|---|:---:|:---:|:---:|:---:|
| **Admin** | ✅ | ✅ | ✅ | ✅ |
| **Petugas** | ✅ | ✅ | ✅ | ❌ |
| **Public** | ✅ | ❌ | ❌ | ❌ |

---

## 👥 Tim

Sistem ini bersifat **internal** dan hanya digunakan oleh tim:

> **Poliklinik Eksekutif RSUD Dr. Soekandar Mojosari**

Untuk akses sistem, hubungi administrator.

---

<div align="center">

Dibuat dengan ❤️ oleh **OpelHunter**

*Karena teknologi seharusnya memudahkan, bukan mempersulit.*

</div>
