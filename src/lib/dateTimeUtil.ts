import { formatDate } from "date-fns/format";

export function getMonthBounds(month: number, year: number): { start: string; end: string } {
  const start = new Date(year, month, 1)
  const end = new Date(year, month + 1, 0) // hari ke-0 bulan berikutnya = hari terakhir bulan ini

  return {
    start: formatDate(start, "yyyy-MM-dd"), // "2025-12-01"
    end: formatDate(end, "yyyy-MM-dd"),     // "2025-12-31"
  }
}

export function getWeekDates(isLastWeek: boolean): string[] {
  const today = new Date()
  
  const dayOfWeek = today.getDay()
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek

  const monday = new Date(today)
  monday.setDate(today.getDate() + diffToMonday + (isLastWeek ? -7 : 0))

  // Generate n hari mulai dari Senin
  const results: string[] = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    results.push(d.toISOString().slice(0, 10))
  }

  return results
}

export function getMonthLabel(yearMonth: string): string {
  const [year, month] = yearMonth.split('-')
  const date = new Date(Number(year), Number(month) - 1, 1)
  return date.toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })
}

export function getDayLabel(tanggal: string): string {
  const date = new Date(tanggal)
  return date.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric' })
}