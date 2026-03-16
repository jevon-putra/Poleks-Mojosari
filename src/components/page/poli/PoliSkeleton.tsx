import { Skeleton } from "../../ui/skeleton"

export function PoliSKeleton() {
    return (
        <div className="p-6 w-full">
            {/* Header */}
            <div className="flex items-center justify-between">
                <Skeleton className="w-60 h-8" />
                <Skeleton className="w-40 h-12" />
            </div>

            <div className="card overflow-hidden mt-6">
                <div className="px-5 py-4"
                    style={{ borderBottom: '1px solid var(--border-default)' }}>
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-3 w-24" />
                </div>

                {/* Table Skeleton */}
                <div className="overflow-x-auto">
                    <table className="data-table">
                    <thead>
                        <tr>
                        <th className="text-center">Nama Poli</th>
                        <th className="text-center">Tanggal Update</th>
                        <th className="text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 5 }).map((_, i) => (
                        <tr key={i}>
                            {/* Nama Poli */}
                            <td>
                            <div className="flex items-center gap-3">
                                <Skeleton className="h-4 w-4 rounded-full shrink-0" />
                                <Skeleton className="h-4 w-36" />
                            </div>
                            </td>

                            {/* Dibuat Oleh */}
                            <td className="text-center">
                            <div className="flex justify-center">
                                <Skeleton className="h-5 w-24 rounded-full" />
                            </div>
                            </td>

                            {/* Tanggal Update */}
                            <td className="text-center">
                            <div className="flex justify-center">
                                <Skeleton className="h-4 w-32" />
                            </div>
                            </td>

                            {/* Aksi */}
                            <td>
                            <div className="flex items-center justify-center gap-2">
                                <Skeleton className="h-9 w-9 rounded-lg" />
                                <Skeleton className="h-9 w-9 rounded-lg" />
                            </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
        