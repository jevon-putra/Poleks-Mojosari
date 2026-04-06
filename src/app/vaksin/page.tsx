'use client'

import { ManageVaccineDialog } from "@/components/page/vaccine/ManageVaccineDialog"
import { VaccineSkeleton } from "@/components/page/vaccine/VaccineSkeleton"
import { Button } from "@/components/ui/button"
import { LoadingDialog } from "@/components/ui/LoadingDialog"
import { useVaccine } from "@/hooks/useVaccine"
import { userCache } from "@/lib/userCache"
import { Pencil, Plus, Trash2 } from "lucide-react"

export default function VaksinPage(){
    const { get } = userCache
    const {
        vaccineList,
        isLoading,
        editData,
        isLoadingDialog,
        isOpenManageDialog,

        openDialog,
        onCloseDialog,
        handleSubmit,
        handleDelete
    } = useVaccine(get()?.id || '')

    if (isLoading) return <VaccineSkeleton />

    return (
        <div className="flex flex-col h-full">
            <div
                className="flex items-center justify-between px-6 py-4 sticky top-0 z-10 shrink-0"
                style={{
                    background: 'var(--bg-page)',          // ← fix: color → background
                    borderBottom: '1px solid var(--border-default)',
                }}
            >
                <h1 className="page-title">Layanan Vaksin</h1>
                <Button
                    variant="primary"
                    className="w-auto"
                    onClick={() => openDialog(null)}
                >
                    <Plus size={16} />
                    Tambah Vaksin
                </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                <div className="card overflow-hidden">
                    {/* Tabel */}
                    <div className="overflow-x-auto">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th className="text-center">Nama Vaksin</th>
                                    <th className="text-center">Terakhir Diubah</th>
                                    <th className="text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vaccineList.length === 0 ? (
                                    <tr>
                                        <td colSpan={3}>
                                            <div
                                                className="flex flex-col items-center gap-2 py-12"
                                                style={{ color: 'var(--text-muted)' }}
                                            >
                                                <span className="text-3xl">🏥</span>
                                                <span className="text-sm">Belum ada data</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    vaccineList.map((r, index) => (
                                        <tr
                                            key={r.id}
                                            style={{
                                                background: index % 2 === 0
                                                    ? 'var(--bg-card)'
                                                    : 'var(--bg-page)',   // ← zebra stripe
                                            }}
                                        >
                                            <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                                                {r.nama_vaksin}
                                            </td>
                                            <td className="text-center" style={{ color: 'var(--text-secondary)' }}>
                                                {r.updated_at
                                                    ? new Date(r.updated_at).toLocaleDateString('id-ID', {
                                                        day: '2-digit', month: 'short',
                                                        year: 'numeric', hour: '2-digit', minute: '2-digit',
                                                    })
                                                    : '-'}
                                            </td>
                                            <td className="text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Button 
                                                        variant="edit"
                                                        size='icon'
                                                        onClick={() => openDialog(r)}
                                                    ><Pencil size={16} />
                                                    </Button>

                                                    <Button 
                                                        variant="destructive"
                                                        size='icon'
                                                        onClick={() => handleDelete(r.id)}
                                                    > <Trash2 size={16} />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Card Footer */}
                    {vaccineList.length > 0 && (
                        <div
                            className="px-5 py-3"
                            style={{ borderTop: '1px solid var(--border-default)' }}
                        >
                            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                                Total {vaccineList.length} layanan vaksin
                            </p>
                        </div>
                    )}
                </div>
            </div>
            
            <ManageVaccineDialog
                open={isOpenManageDialog}
                editData={editData}
                onSubmit={handleSubmit}
                onClose={onCloseDialog}
            />

            <LoadingDialog
                open={isLoadingDialog}
                message="Memproses..."
            />
        </div>

    )
}