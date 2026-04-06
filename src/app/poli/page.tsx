'use client'

import { Button } from "@/components/ui/button"
import { usePoli } from "@/hooks/usePoli"
import { Pencil, Plus, Trash2 } from "lucide-react"
import { userCache } from "@/lib/userCache"
import { PoliSKeleton } from "@/components/page/poli/PoliSkeleton"
import { ManagePoliDialog } from "@/components/page/poli/ManagePoliDialog"
import { LoadingDialog } from "@/components/ui/LoadingDialog"

export default function PoliPage() {
    const { get } = userCache
    const {
        poliList,
        editData,
        isLoading,
        isLoadingDialog,
        isOpenManageDialog,
        openDialog,
        onCloseDialog,
        handleSubmit,
        handleDelete,
    } = usePoli(get()?.id || '')

    if (isLoading) return <PoliSKeleton />

    return (
        <div className="flex flex-col h-full">

            {/* Header — sticky */}
            <div
                className="flex items-center justify-between px-6 py-4 sticky top-0 z-10 shrink-0"
                style={{
                    background: 'var(--bg-page)',          // ← fix: color → background
                    borderBottom: '1px solid var(--border-default)',
                }}
            >
                <h1 className="page-title">Ruangan Poli</h1>
                <Button
                    variant="primary"
                    className="w-auto"
                    onClick={() => openDialog(null)}
                >
                    <Plus size={16} />
                    Tambah Poli
                </Button>
            </div>

            {/* Konten scroll */}
            <div className="flex-1 overflow-y-auto p-6">
                <div className="card overflow-hidden">
                    {/* Tabel */}
                    <div className="overflow-x-auto">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Nama Poli</th>
                                    <th className="text-center">Terakhir Diubah</th>
                                    <th className="text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {poliList.length === 0 ? (
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
                                    poliList.map((r, index) => (
                                        <tr
                                            key={r.id}
                                            style={{
                                                background: index % 2 === 0
                                                    ? 'var(--bg-card)'
                                                    : 'var(--bg-page)',   // ← zebra stripe
                                            }}
                                        >
                                            <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                                                {r.nama_poli}
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
                                                        size="icon"
                                                        onClick={() => openDialog(r)}
                                                    >
                                                        <Pencil size={16} />
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        size="icon"
                                                        onClick={() => handleDelete(r.id)}
                                                    >
                                                        <Trash2 size={16} />
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
                    {poliList.length > 0 && (
                        <div
                            className="px-5 py-3"
                            style={{ borderTop: '1px solid var(--border-default)' }}
                        >
                            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                                Total {poliList.length} poliklinik
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <ManagePoliDialog
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