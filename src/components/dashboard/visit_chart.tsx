'use client'

import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { MonthlyKunjungan, Poliklinik, WeeklyKunjungan } from '@/types/index.types'
import { format } from 'date-fns'
import { id as localeId } from 'date-fns/locale'

// ─── Props ────────────────────────────────────────────

interface VisitChartProps {
    listPoli: Poliklinik[]
    currentMonth: MonthlyKunjungan[]
    lastMonth: MonthlyKunjungan[]
    currentWeek: WeeklyKunjungan[]
    lastWeek: WeeklyKunjungan[]
}

// ─── Merged Types ─────────────────────────────────────

interface MergedMonthly {
    date: string
    currentMonth: number
    lastMonth: number
}

interface MergedWeekly {
    name: string
    currentWeek: number
    lastWeek: number
}

// ─── Helpers ──────────────────────────────────────────

function mergeMonthlyData(current: MonthlyKunjungan[], last: MonthlyKunjungan[]): MergedMonthly[] {
    const map = new Map<string, MergedMonthly>()
    const currentDate = new Date()
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate()

    for (let d = 1; d <= daysInMonth; d++) {
        const day = String(d).padStart(2, '0')
        map.set(day, { date: `${d}`, currentMonth: 0, lastMonth: 0 })
    }

    for (const row of current) {
        const day = row.tanggal.slice(8, 10)
        const existing = map.get(day)
        if (existing) existing.currentMonth = row.jumlah_pasien
    }

    for (const row of last) {
        const day = row.tanggal.slice(8, 10)
        const existing = map.get(day)
        if (existing) existing.lastMonth = row.jumlah_pasien
    }

    return Array.from(map.entries())
        .sort(([a], [b]) => parseInt(a) - parseInt(b))
        .map(([, v]) => v)
}

function mergeWeeklyData(listPoli: Poliklinik[], current: WeeklyKunjungan[], last: WeeklyKunjungan[]): MergedWeekly[] {
    const map = new Map<string, MergedWeekly>()

    for (const row of listPoli) {
        map.set(row.nama_poli, { name: row.nama_poli, currentWeek: 0, lastWeek: 0 })
    }

    for (const row of current) {
        const existing = map.get(row.nama_poli)
        if (existing) existing.currentWeek = row.jumlah_pasien
    }

    for (const row of last) {
        const existing = map.get(row.nama_poli)
        if (existing) existing.lastWeek = row.jumlah_pasien
    }

    return Array.from(map.values())
}

// ─── Chart Config ─────────────────────────────────────

const monthlyConfig = {
    currentMonth: { label: 'Bulan Ini', color: 'var(--orange-primary)' },
    lastMonth:    { label: 'Bulan Lalu', color: 'var(--blue-medium)' },
} satisfies ChartConfig

const weeklyConfig = {
    currentWeek: { label: 'Minggu Ini', color: 'var(--orange-primary)' },
    lastWeek:    { label: 'Minggu Lalu', color: 'var(--blue-medium)' },
} satisfies ChartConfig

// ─── Component ────────────────────────────────────────

export function VisitChart({ listPoli, currentMonth, lastMonth, currentWeek, lastWeek }: VisitChartProps) {
    const monthlyData       = mergeMonthlyData(currentMonth, lastMonth)
    const weeklyData        = mergeWeeklyData(listPoli,currentWeek, lastWeek)

    const now               = new Date()
    const lastMonthDate     = new Date(now.getFullYear(), now.getMonth() - 1, 1)

    return (
        <div className="flex flex-col gap-4">

            {/* ── Line Chart Bulanan ── */}
            <div className="card p-5">
                <div className="mb-4">
                    <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                        Kunjungan Harian
                    </h3>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                        {format(lastMonthDate, 'MMM yyyy', { locale: localeId })}
                        {' vs '}
                        {format(now, 'MMM yyyy', { locale: localeId })}
                    </p>
                </div>

                <ChartContainer config={monthlyConfig} className="h-80 w-full">
                    <LineChart data={monthlyData} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
                        <CartesianGrid vertical={false} stroke="var(--border-default)" strokeDasharray="3 3" />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="bg-(--bg-card) border border-white/10 shadow-xl"
                                    indicator="line"
                                    labelFormatter={(_, payload) => {
                                        const day = payload?.[0]?.payload?.date
                                        return day ? `Tanggal ${day}` : ''
                                    }}
                                />
                            }
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Line
                            dataKey="currentMonth"
                            stroke="var(--color-currentMonth)"
                            strokeWidth={2}
                            dot={{ r: 3, fill: 'var(--color-currentMonth)' }}
                            activeDot={{ r: 5 }}
                        />
                        <Line
                            dataKey="lastMonth"
                            stroke="var(--color-lastMonth)"
                            strokeWidth={2}
                            strokeDasharray="4 4"
                            dot={{ r: 3, fill: 'var(--color-lastMonth)' }}
                            activeDot={{ r: 5 }}
                        />
                    </LineChart>
                </ChartContainer>
            </div>

            {/* ── Bar Chart Mingguan per Poli ── */}
            <div className="card p-5">
                <div className="mb-4">
                    <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                        Kunjungan per Poli
                    </h3>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                        Minggu ini vs minggu lalu
                    </p>
                </div>

                <ChartContainer config={weeklyConfig} className="h-80 w-full">
                    <BarChart data={weeklyData} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
                        <CartesianGrid vertical={false} stroke="var(--border-default)" strokeDasharray="3 3" />
                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tick={{ fill: 'var(--text-muted)', fontSize: 11}}
                            tickFormatter={(v: string) => v.replace(/poli\s*/i, '')}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
                        />
                        <ChartTooltip
                            cursor={{ fill: 'var(--border-default)', opacity: 0.3 }}
                            content={
                                <ChartTooltipContent
                                className="bg-(--bg-card) border border-white/10 shadow-xl"
                                indicator="line"
                                labelFormatter={(_, payload) => payload?.[0]?.payload?.name ?? ''}
                                />
                            }
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar dataKey="currentWeek" fill="var(--color-currentWeek)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="lastWeek"    fill="var(--color-lastWeek)"    radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ChartContainer>
            </div>
        </div>
    )
}