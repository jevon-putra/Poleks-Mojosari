'use client'

import { ManagePoliDialog } from "@/components/page/poli/ManagePoliDialog"
import { PoliSKeleton } from "@/components/page/poli/PoliSkeleton"
import { Button } from "@/components/ui/button"
import { LoadingDialog } from "@/components/ui/LoadingDialog"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { usePoli } from "@/hooks/usePoli"
import { Pencil, Plus, Trash2 } from "lucide-react"

export default function PoliPage(){
    const { user } = useCurrentUser()
    const {
        poliList,
        editData,
        isLoading,
        isLoadingDialog,
        isOpenManageDialog,

        openDialog,
        onCloseDialog,
        handleSubmit,
        handleDelete
    } = usePoli(user?.id ?? '')


    return (
        <div>
            {isLoading ? (
                <PoliSKeleton/>
            ) : (
                <div className="p-6 w-full">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <h1 className="page-title">Ruangan Poli</h1>

                        <Button 
                            variant="primary" 
                            className="w-auto"
                            onClick={() => { openDialog(null) }}
                        >
                            <Plus size={16} />
                            Tambah Poli
                        </Button>
                    </div>

                    {/* Card Tabel */}
                    <div className="card overflow-hidden mt-6">

                        {/* Card Header */}
                        <div 
                            className="px-5 py-4 flex items-center justify-between"
                            style={{ borderBottom: '1px solid var(--border-default)' }}
                        >
                            <div>
                                <h2 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                                    Data Poli
                                </h2>
                                <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                                    {poliList.length} data ditemukan
                                </p>
                            </div>
                        </div>

                        {/* Tabel */}
                        <div className="overflow-x-auto">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th className="text-center">Nama Poli</th>
                                        <th className="text-center">Terakhir Diubah</th>
                                        <th className="text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {poliList.length === 0 ? (
                                        <tr>
                                            <td colSpan={4}>
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
                                        poliList.map(r => (
                                            <tr key={r.id}>
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

                        {/* Footer */}
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

                    <ManagePoliDialog
                        open={isOpenManageDialog}
                        editData={editData}
                        onSubmit={handleSubmit}
                        onClose={ (data) => {  onCloseDialog(data) } }
                    />

                    <LoadingDialog
                        open={isLoadingDialog}
                        message="Memproses..."
                    />
                </div>
            )}
        </div>
    )
}