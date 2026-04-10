import { getMonthBounds, getWeekDates } from "@/lib/dateTimeUtil"
import { createClient } from "@/lib/supabase/client"
import { MonthlyKunjungan, MonthlyVaksinasi, WeeklyKunjungan, WeeklyVaksinasi } from "@/types/index.types"

export async function getMonthlyVisit(months: number, year: number): Promise<MonthlyKunjungan[]> {
  const supabase = createClient()
  const {start, end } = getMonthBounds(months, year)

  const { data, error } = await supabase
    .rpc('get_monthly_report_poli', {
      tanggal_mulai: start,
      tanggal_selesai: end,
    })

  if (error) throw error  

  return data ?? []
}

export async function getMonthlyDose(months: number, year: number): Promise<MonthlyVaksinasi[]> {
  const supabase = createClient()
  const {start, end } = getMonthBounds(months, year)

  const { data, error } = await supabase
    .rpc('get_monthly_report_vaksinasi', {
      tanggal_mulai: start,
      tanggal_selesai: end,
    })

  if (error) throw error 
  
  return data ?? []
}

export async function getWeeklyVisit(isLastWeek: boolean): Promise<WeeklyKunjungan[]> {
  const supabase = createClient()
  const dates = getWeekDates(isLastWeek)

  const senin = dates[0]
  const minggu = dates[dates.length - 1]

  const { data, error } = await supabase
    .rpc('get_weekly_report_poli', {
      tanggal_mulai: senin,
      tanggal_selesai: minggu,
    })

  if (error) throw error  

  return data ?? []
}

export async function getWeeklyDose(isLastWeek: boolean): Promise<WeeklyVaksinasi[]> {
  const supabase = createClient()
  const dates = getWeekDates(isLastWeek)

  const senin = dates[0]                // "2025-04-07"
  const minggu = dates[dates.length - 1] // "2025-04-13"

  const { data, error } = await supabase
    .rpc('get_weekly_report_vaksinasi', {
      tanggal_mulai: senin,
      tanggal_selesai: minggu,
    })

  if (error) throw error  

  return data ?? []
}