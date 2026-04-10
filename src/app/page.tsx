'use client'

import { DashboardSkeleton } from "@/components/page/dashboard/DashboardSkeleton";
import { StatisticCard } from "@/components/page/dashboard/StatisticCard";
import { VisitChart } from "@/components/page/dashboard/VisitChart";
import { useDashboard } from "@/hooks/useDashboard";
import { format } from "date-fns/format";
import { id as localeId } from 'date-fns/locale'

export default function Home() {
  const {
      isLoading,
      dashboardData
  } = useDashboard()
  const currentDate = new Date();

  if(isLoading) return <DashboardSkeleton />;

  // console.log(dashboardData?.currentWeeklyVisit)
  // console.log(dashboardData?.lastWeekVisit)

  return (
    <div className="p-6 w-full flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <StatisticCard
          label={`Kunjungan Bulan ${format(currentDate, "MMMM", { locale: localeId })}`}
          isMonth={true}
          curentValue={dashboardData?.totalVisitCurrentMonth || 0}
          lasValue={dashboardData?.totalVisitLastMonth || 0}
          accent="orange"
        />
        <StatisticCard
          label="Kunjungan Minggu Ini"
          isMonth={false}
          curentValue={dashboardData?.totalVisitCurrentWeek || 0}
          lasValue={dashboardData?.totalVisitLastWeek || 0}
          accent="orange"
        />

        <StatisticCard
          label={`Vaksinasi Bulan ${format(currentDate, "MMMM", { locale: localeId })}`}
          isMonth={true}
          curentValue={dashboardData?.totalDoseCurrentMonth || 0}
          lasValue={dashboardData?.totalDoseLastMonth || 0}
          accent="blue"
        />
        <StatisticCard
          label={`Vaksinasi Minggu Ini`}
          isMonth={false}
          curentValue={dashboardData?.totalDoseCurrentWeek || 0}
          lasValue={dashboardData?.totalDoseLastWeek || 0}
          accent="blue"
        />
      </div>

      <VisitChart
        listPoli={dashboardData?.listPoli || []}
        currentMonth={dashboardData?.cureentMonthlyVisit || []}
        lastMonth={dashboardData?.lastMonthVisit || []}
        currentWeek={dashboardData?.currentWeeklyVisit || []}
        lastWeek={dashboardData?.lastWeekVisit || []}
      />
    </div>
  );
}
