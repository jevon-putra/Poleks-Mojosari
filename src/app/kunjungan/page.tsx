'use client'

import { ManageKunjunganDialog } from "@/components/page/kunjungan/ManageKunjunganDialog"
import { Button } from "@/components/ui/button"
import { LoadingDialog } from "@/components/ui/LoadingDialog"
import { useKunjungan } from "@/hooks/useKunjungan"
import { userCache } from "@/lib/userCache"
import { Eye, Plus } from "lucide-react"
import { useEffect } from "react"
import { format } from 'date-fns'
import { id as localeId } from 'date-fns/locale'
import { KunjunganSkeleton } from "@/components/page/kunjungan/KunjunganSkeleton"

export default function KunjunganPage() {
    const { get } = userCache
    const {
        isLoading,
        isLoadingDialog,
        isOpenManageDialog,
        kunjunganList,
        kunjunganHarian,

        openDialog,
        onCloseDialog,
        getKunjungan
    } = useKunjungan(get()?.id || '')

    useEffect(() => {
        getKunjungan()
    }, [])

    return (
        <div>
            {isLoading ? (
                <KunjunganSkeleton/>
            ) : (
                <div className="p-6 w-full">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <h1 className="page-title">Kunjungan Poli</h1>
                        <Button 
                            variant="primary" 
                            className="w-auto"
                            onClick={() => {
                                openDialog()
                            }}
                        >
                            <Plus size={16} />
                            Tambah Kunjungan
                        </Button>
                    </div>
                    
                    <div className="card overflow-hidden mt-6">
                        {/* Tabel */}
                        <div className="overflow-x-auto">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th className="text-center">Tanggal</th>
                                        <th className="text-center">Total Kunjungan</th>
                                        <th className="text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {kunjunganList.length === 0 ? (
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
                                        kunjunganList.map(r => (
                                            <tr key={r.tanggal}>
                                                <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                                                    {format(new Date(r.tanggal), 'EEEE, dd MMMM yyyy', { locale: localeId })}
                                                </td>
                                                <td className="text-center" style={{ color: 'var(--text-secondary)' }}>
                                                    {r.total_pasien} pasien
                                                </td>
                                                <td className="text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <Button 
                                                            variant="edit"
                                                            size='icon'
                                                            onClick={() => openDialog(r.detail)}
                                                        ><Eye size={16} />
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
                        {/* {poliList.length > 0 && (
                            <div 
                                className="px-5 py-3"
                                style={{ borderTop: '1px solid var(--border-default)' }}
                            >
                                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                                    Total {poliList.length} poliklinik
                                </p>
                            </div>
                        )} */}
                    </div>
                            
                    <ManageKunjunganDialog
                        open={isOpenManageDialog}
                        detailData={kunjunganHarian}
                        // editData={editData}
                        // onSubmit={handleSubmit}
                        onClose={ onCloseDialog }
                    />
                    <LoadingDialog
                        open={isLoadingDialog}
                        message="Memproses..."
                    />
                </div>
            ) }
        </div>
    )
}