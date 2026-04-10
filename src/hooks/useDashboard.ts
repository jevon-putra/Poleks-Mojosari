'use client'

import { getWeeklyVisit, getWeeklyDose, getMonthlyVisit, getMonthlyDose } from "@/service/dashbaord.service"
import { getPoli } from "@/service/poli.service"
import { getVaccine } from "@/service/vaccine.service"
import { DashboardData } from "@/types/index.types"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export function useDashboard() {
    const [dashboardData, setDashboardData] = useState<DashboardData>()
    const [isLoading, setLoading] = useState(true)
    const date = new Date()

    async function getDataDashboard() {
        try {
            const [
                listPoli,
                listVaksin,
                weeklyVisitThisWeek,
                weeklyVisitLastWeek,

                monthlyVisitCurrentMonth,
                monthlyVisitLastMonth,

                weeklyDoseThisWeek,
                weeklyDoseLastWeek,
                
                monthlyDoseCurrentMonth,
                monthlyDoseLastMonth,
            ] = await Promise.all([
                getPoli(),
                getVaccine(),
                getWeeklyVisit(false),   
                getWeeklyVisit(true),    

                getMonthlyVisit(date.getMonth(), date.getFullYear()),
                getMonthlyVisit(date.getMonth() - 1, date.getFullYear()),

                getWeeklyDose(false),
                getWeeklyDose(true),

                getMonthlyDose(date.getMonth(), date.getFullYear()),
                getMonthlyDose(date.getMonth() - 1, date.getFullYear()),
            ])
            const totalVisitThisMonth = monthlyVisitCurrentMonth.reduce((acc, d) => acc + d.jumlah_pasien, 0)
            const totalVisitLastMonth = monthlyVisitLastMonth.reduce((acc, d) => acc + d.jumlah_pasien, 0)

            const totalDoseThisMonth = monthlyDoseCurrentMonth.reduce((acc, d) => acc + d.jumlah_dosis, 0)
            const totalDoseLastMonth = monthlyDoseLastMonth.reduce((acc, d) => acc + d.jumlah_dosis, 0)

            const totalVisitThisWeek = weeklyVisitThisWeek.reduce((acc, d) => acc + d.jumlah_pasien, 0)
            const totalVisitLastWeek = weeklyVisitLastWeek.reduce((acc, d) => acc + d.jumlah_pasien, 0)

            const totalDoseThisWeek = weeklyDoseThisWeek.reduce((acc, d) => acc + d.jumlah_dosis, 0)
            const totalDoseLastWeek = weeklyDoseLastWeek.reduce((acc, d) => acc + d.jumlah_dosis, 0)

            setDashboardData({
                listPoli,
                listVaksin,
                
                currentWeeklyVisit: weeklyVisitThisWeek,
                lastWeekVisit: weeklyVisitLastWeek,
                cureentMonthlyVisit: monthlyVisitCurrentMonth,
                lastMonthVisit: monthlyVisitLastMonth,

                currentWeeklyDose: weeklyDoseThisWeek,
                lastWeekDose: weeklyDoseLastWeek,
                currentMonthlyDose: monthlyDoseCurrentMonth,
                lastMonthDose: monthlyDoseLastMonth,

                totalVisitCurrentWeek: totalVisitThisWeek,
                totalVisitLastWeek: totalVisitLastWeek,

                totalVisitCurrentMonth: totalVisitThisMonth,
                totalVisitLastMonth: totalVisitLastMonth,

                totalDoseCurrentWeek: totalDoseThisWeek,
                totalDoseLastWeek: totalDoseLastWeek,
     
                totalDoseCurrentMonth: totalDoseThisMonth,
                totalDoseLastMonth: totalDoseLastMonth
            })
        } catch (err: any) {
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }
    
    useEffect(() => {
        getDataDashboard()
    }, [])
    
    return {
        isLoading,
        dashboardData,
    }
}