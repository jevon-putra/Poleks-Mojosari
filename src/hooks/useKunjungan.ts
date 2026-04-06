import { useState } from 'react'
import { KunjunganGrouped, KunjunganHarian, KunjunganPayload, Poliklinik } from '@/types/index.types'
import { getKunjunganGroupByDate, getPoli, kunjunganPoli} from '@/service/poli.service'
import { toast } from 'sonner'

export function useKunjungan(userId: string) {
    const [poliList, setPoliList]                   = useState<Poliklinik[]>([])
    const [kunjunganList, setKunjunganList]         = useState<KunjunganGrouped[]>([])
    const [kunjunganHarian, setKunjunganHarian]     = useState<KunjunganHarian[] | null>(null)
    const [isLoading, setLoading]                   = useState(true)

    const [isLoadingDialog, setLoadingDialog]       = useState(false)
    const [isOpenManageDialog, setOpenManageDialog] = useState(false)

    const getListPoli = async () => {
        if(poliList.length > 0) return
        
        getPoli().then(res => {
            setPoliList(res)
            setLoadingDialog(false)
        }).catch(err => {
            toast.error(err.message)
            setLoadingDialog(false)
        })
    }

    const getKunjungan = async () => {
        setLoading(true)
        if(kunjunganList.length > 0) return
        
        getKunjunganGroupByDate().then(res => {
            setKunjunganList(res)
            setLoading(false)
        }).catch(err => {
            toast.error(err.message)
            setLoading(false)
        })
    }

    function addKunjungan(payload: KunjunganPayload[]){
        setLoadingDialog(true)

        const rows = payload.map(p => ({
            tanggal         : p.tanggal,
            poliklinik_id   : p.poliklinik_id,
            jumlah_pasien   : p.jumlah_pasien,
            created_by      : userId,
            updated_by      : userId,
        }))

        kunjunganPoli(rows).then(res => {
            toast.success('Data berhasil disimpan')
            onCloseDialog()
        }).catch(err => {
            toast.error(err.message)
            console.log(err)
        }).finally(() => setLoadingDialog(false))
    }

    const openDialog = (data: KunjunganHarian[] | null = null) => {
        setOpenManageDialog(true)
        setKunjunganHarian(data)
    }

    const onCloseDialog = () => {
        setOpenManageDialog(false)
        setLoadingDialog(false)
        setKunjunganHarian(null)
    }

    return {
        poliList,
        kunjunganList,
        kunjunganHarian,
        isLoading,
        isLoadingDialog,
        isOpenManageDialog,

        openDialog,
        onCloseDialog,
        addKunjungan,
        getListPoli,
        getKunjungan
    }
}