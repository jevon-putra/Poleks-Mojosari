import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { id as localeId } from 'date-fns/locale';
import { StatisticCardSkeleton } from "./StatisticCardSkeleton";

export function DashboardSkeleton() {
    const currentDate = new Date();

    return (
        <div className="p-6 w-full flex flex-col gap-4">
            
            {/* 1. Bagian Grid Kartu Statistik */}
            <div className="grid grid-cols-2 gap-4">
                <StatisticCardSkeleton />
                <StatisticCardSkeleton />
        
                <StatisticCardSkeleton />
                <StatisticCardSkeleton />
            </div>

            {/* 2. Bagian Chart Kunjungan (Paling Bawah) */}
            <div className="card w-full flex-col gap-5 p-5">
                {/* Header Chart */}
                <div className="flex items-center gap-2 justify-between w-full">
                    <div className="flex flex-col gap-1.5">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-3 w-24" />
                    </div>
                    {/* Toggle Selector Bulan/Minggu */}
                    <Skeleton className="h-10 w-44 rounded-lg" />
                </div>
                
                {/* Area Chart yang Sebenarnya */}
                <div className="h-80 w-full relative">
                    {/* Y-Axis Labels */}
                    <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between py-2.5">
                        <Skeleton className="h-3 w-5" />
                        <Skeleton className="h-3 w-5" />
                        <Skeleton className="h-3 w-5" />
                        <Skeleton className="h-3 w-5" />
                    </div>
                    {/* Bar Chart Area (Garis-garis vertical) */}
                    <div className="absolute left-10 right-2 top-0 bottom-6 flex items-end justify-between px-2">
                        {Array.from({ length: 7 }).map((_, i) => (
                            <Skeleton key={i} className="w-10 h-[80%] rounded-md" />
                        ))}
                    </div>
                    {/* X-Axis Labels */}
                    <div className="absolute left-10 right-2 bottom-0 h-4 flex justify-between px-2">
                         {Array.from({ length: 7 }).map((_, i) => (
                            <Skeleton key={i} className="h-3 w-10" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Komponen Helper Kecil khusus untuk 1 Kartu Statistik
function CardStatisticSkeleton({ label }: { label: string }) {
    return (
        <div className="card p-5 h-full flex-col gap-3">
            {/* Bagian Label/Judul Kartu */}
            <div className="flex items-center gap-1.5 h-4 justify-between w-full">
                <Skeleton className="h-4 w-48" /> {/* Teks Judul */}
                <Skeleton className="h-4 w-4 rounded-full" /> {/* Icon kecil/badge */}
            </div>

            {/* Bagian Nilai Statistik Utama (Angka besar) */}
            <div className="flex items-baseline gap-2.5 h-10 w-full">
                <Skeleton className="h-10 w-20" /> {/* Nilai Sekarang */}
                <Skeleton className="h-4 w-16" /> {/* Nilai Bulan Lalu */}
            </div>

            {/* Bagian Progress Bar (Indikator visual) */}
            <div className="flex items-center gap-2.5 h-3 justify-between w-full">
                <Skeleton className="h-3 w-12" /> {/* Label % */}
                <Skeleton className="h-1.5 flex-1 rounded-full" /> {/* Bar */}
            </div>
        </div>
    );
}