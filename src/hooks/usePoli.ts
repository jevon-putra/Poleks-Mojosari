import { useState, useEffect } from 'react'
import { Poliklinik } from '@/types/index.types'
import { getPoli, deletePoli, updatePoli, createPoli} from '@/service/poli.service'
import { toast } from 'sonner'

export function usePoli(usedId: String) {
    const [poliList, setPoliList]     = useState<Poliklinik[]>([])
    const [isLoading, setLoading] = useState(true)
    const [editData, setEditData] = useState<Poliklinik | null>(null)
    const [isLoadingDialog, setLoadingDialog] = useState(false)
    const [isOpenManageDialog, setOpenManageDialog] = useState(false)

    // FETCH DATA
    const fetchData = async () => {
        getPoli().then(res => {
            setPoliList(res)
            setLoading(false)
        }).catch(err => {
            toast.error(err.message)
            setLoading(false)
        })
    }

    useEffect(() => { fetchData()}, [])

    //ACTION 
    const openDialog = (poli: Poliklinik | null) => {
        setEditData(poli)
        setOpenManageDialog(true)
    }

    const onCloseDialog = (poli: Poliklinik | null) => {
        setOpenManageDialog(false)
        setEditData(null)

        if (poli) {
            const index = poliList.findIndex(d => d.id === poli.id)
            if (index !== -1) {
                poliList[index] = poli
                setPoliList([...poliList])
            } else {
                setPoliList([...poliList, poli])
            }
        }
    }

    const handleDelete = async (id: String) => {
        setLoadingDialog(true)
        deletePoli(id, usedId).then(res => {
            toast.success('Data berhasil dihapus')
            const indexOf = poliList.findIndex(item => item.id === id)
            poliList.splice(indexOf, 1)
        }).catch(err => {
            toast.error(err.message)
        }).finally(() => setLoadingDialog(false))
    }

    function handleSubmit(name: String){
        setLoadingDialog(true)

        if(editData){
            updatePoli(editData.id, name, usedId).then(res => {
                toast.success('Data berhasil diperbarui')
                onCloseDialog(res)
            }).catch(err => {
                if(err.message.includes('unique')) {
                    toast.error('Nama poli sudah pernah digunakan, gunakan nama poli yang berbeda')
                } else {
                    toast.error(err.message)   
                }
            }).finally(() => setLoadingDialog(false))
        } else {
            createPoli(name, usedId).then(res => {
                toast.success('Data berhasil ditambahkan')
                onCloseDialog(res)
            }).catch(err => {
                if(err.message.includes('unique')) {
                    toast.error('Nama poli sudah pernah digunakan, gunakan nama poli yang berbeda')
                } else {
                    toast.error(err.message)   
                }
            }).finally(() => setLoadingDialog(false))
        }
    }

    return {
        poliList,
        isLoading,
        editData,
        isLoadingDialog,
        isOpenManageDialog,

        openDialog,
        onCloseDialog,
        handleSubmit,
        handleDelete
    }
}