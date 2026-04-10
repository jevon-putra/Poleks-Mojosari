import { Skeleton } from "@/components/ui/skeleton";

export function StatisticCardSkeleton() {
  return (
    <div className="card px-5 py-4 flex flex-col gap-3">
        <Skeleton className="h-4 w-54" />
        <div>
            <Skeleton className="h-10 w-12 mt-1" />
            <Skeleton className="h-2 w-24 mt-1" />
        </div>
    </div>
  )
}