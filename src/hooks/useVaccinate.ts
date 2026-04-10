import { useState } from 'react'
import { Vaksin, VaksinasiGrouped, VaksinasiHarian, VaksinasiPayload } from '@/types/index.types'
import { toast } from 'sonner'
import { getVaccine, getVaksinasiGroupByDate, vaksinasi } from '@/service/vaccine.service'

export function useVaccinate(userId: string) {
    const [vaksinList, setVaksinList]               = useState<Vaksin[]>([])
    const [vaksinasiList, setVaksinasiList]         = useState<VaksinasiGrouped[]>([])
    const [vaksinHarian, setVaksinHarian]           = useState<VaksinasiHarian[] | null>(null)
    const [isLoading, setLoading]                   = useState(true)

    const [isLoadingDialog, setLoadingDialog]       = useState(false)
    const [isOpenManageDialog, setOpenManageDialog] = useState(false)

    const getListVaccine = async () => {
        if(vaksinList.length > 0) return
        
        getVaccine().then(res => {
            setVaksinList(res)
            setLoadingDialog(false)
        }).catch(err => {
            toast.error(err.message)
            setLoadingDialog(false)
        })
    }

    const getGroupVaccine = async () => {
        setLoading(true)
        if(vaksinasiList.length > 0) return
        
        getVaksinasiGroupByDate().then(res => {
            setVaksinasiList(res)
            setLoading(false)
        }).catch(err => {
            toast.error(err.message)
            setLoading(false)
        })
    }

    function addVaksinasi(payload: VaksinasiPayload[]){
        setLoadingDialog(true)

        const rows = payload.map(p => ({
            tanggal         : p.tanggal,
            vaksin_id       : p.vaksin_id,
            jumlah_dosis   : p.jumlah_dosis,
            created_by      : userId,
            updated_by      : userId,
        }))

        vaksinasi(rows).then(res => {
            toast.success('Data berhasil disimpan')
            onCloseDialog()
        }).catch(err => {
            toast.error(err.message)
            console.log(err)
        }).finally(() => setLoadingDialog(false))
    }

    const openDialog = (data: VaksinasiHarian[] | null = null) => {
        setOpenManageDialog(true)
        setVaksinHarian(data)
    }

    const onCloseDialog = () => {
        setOpenManageDialog(false)
        setLoadingDialog(false)
        setVaksinHarian(null)
    }

    return {
        vaksinList,
        vaksinasiList,
        vaksinHarian,
        isLoading,
        isLoadingDialog,
        isOpenManageDialog,

        openDialog,
        onCloseDialog,
        addVaksinasi,
        getListVaccine,
        getGroupVaccine
    }
}