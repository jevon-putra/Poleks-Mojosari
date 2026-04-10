'use client'

import { getWeeklyVisit, getWeeklyDose, getMonthlyVisit, getMonthlyDose } from "@/service/dashbaord.service"
import { getPoli } from "@/service/poli.service"
import { getVaccine } from "@/service/vaccine.service"
import { DashboardData } from "@/types/index.types"
import { useEffect, useState, useCallback } from "react"
import { toast } from "sonner"

export function useDashboard() {
    const [dashboardData, setDashboardData] = useState<Partial<DashboardData>>({})
    const [isLoading, setLoading] = useState(true)

    const calculateTotal = (data: any[], key: string) => 
        data.reduce((acc, d) => acc + (d[key] || 0), 0);

    const fetchData = useCallback(async () => {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        
        // Handle logika tahun jika bulan sekarang Januari (0)
        const lastMonthDate = new Date(currentYear, currentMonth - 1);
        const prevMonth = lastMonthDate.getMonth();
        const prevYear = lastMonthDate.getFullYear();

        try {
            // Tahap 1: Ambil data Master & Kunjungan (Prioritas Utama UI)
            const [listPoli, weeklyCurrent, weeklyLast, monthlyCurrent, monthlyLast] = await Promise.all([
                getPoli(),
                getWeeklyVisit(false),
                getWeeklyVisit(true),
                getMonthlyVisit(currentMonth, currentYear),
                getMonthlyVisit(prevMonth, prevYear)
            ]);

            setDashboardData(prev => ({
                ...prev,
                listPoli,
                currentWeeklyVisit: weeklyCurrent,
                lastWeekVisit: weeklyLast,
                cureentMonthlyVisit: monthlyCurrent,
                lastMonthVisit: monthlyLast,
                totalVisitCurrentWeek: calculateTotal(weeklyCurrent, 'jumlah_pasien'),
                totalVisitLastWeek: calculateTotal(weeklyLast, 'jumlah_pasien'),
                totalVisitCurrentMonth: calculateTotal(monthlyCurrent, 'jumlah_pasien'),
                totalVisitLastMonth: calculateTotal(monthlyLast, 'jumlah_pasien'),
            }));

            // Tahap 2: Ambil data Vaksin (Background/Secondary)
            const [listVaksin, doseWCurrent, doseWLast, doseMCurrent, doseMLast] = await Promise.all([
                getVaccine(),
                getWeeklyDose(false),
                getWeeklyDose(true),
                getMonthlyDose(currentMonth, currentYear),
                getMonthlyDose(prevMonth, prevYear)
            ]);

            setDashboardData(prev => ({
                ...prev,
                listVaksin,
                currentWeeklyDose: doseWCurrent,
                lastWeekDose: doseWLast,
                currentMonthlyDose: doseMCurrent,
                lastMonthDose: doseMLast,
                totalDoseCurrentWeek: calculateTotal(doseWCurrent, 'jumlah_dosis'),
                totalDoseLastWeek: calculateTotal(doseWLast, 'jumlah_dosis'),
                totalDoseCurrentMonth: calculateTotal(doseMCurrent, 'jumlah_dosis'),
                totalDoseLastMonth: calculateTotal(doseMLast, 'jumlah_dosis'),
            }));

        } catch (err: any) {
            toast.error(err.message || "Gagal memuat data dashboard");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        isLoading,
        dashboardData: dashboardData as DashboardData,
    }
}