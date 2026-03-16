import { createVaccine, deleteVaccine, getVaccine, updateVaccine } from "@/service/vaccine.service";
import { Vaksin } from "@/types/index.types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function useVaccine(userId: String){
    const [vaccineList, setVaccineList] = useState<Vaksin[]>([])
    const [isLoading, setLoading] = useState(true)
    const [editData, setEditData] = useState<Vaksin | null>(null)
    const [isLoadingDialog, setLoadingDialog] = useState(false)
    const [isOpenManageDialog, setOpenManageDialog] = useState(false)

    const fetchData = async () => {
        getVaccine().then(res => {
            setVaccineList(res)
            setLoading(false)
        }).catch(err => {
            toast.error(err.message)
            setLoading(false)
        })
    }

    useEffect(() => { fetchData()}, [])

    const openDialog = (vaccine: Vaksin | null) => {
        setEditData(vaccine)
        setOpenManageDialog(true)
    }

    const onCloseDialog = (vaccine: Vaksin | null) => {
        setOpenManageDialog(false)
        setEditData(null)

        if (vaccine) {
            const index = vaccineList.findIndex(d => d.id === vaccine.id)
            if (index !== -1) {
                vaccineList[index] = vaccine
                setVaccineList([...vaccineList])
            } else {
                setVaccineList([...vaccineList, vaccine])
            }
        }
    }
    
    const handleDelete = async (id: String) => {
        setLoadingDialog(true)
        deleteVaccine(id, userId).then(res => {
            toast.success('Data berhasil dihapus')
            const indexOf = vaccineList.findIndex(item => item.id === id)
            vaccineList.splice(indexOf, 1)
        }).catch(err => {
            toast.error(err.message)
        }).finally(() => setLoadingDialog(false))
    }

    function handleSubmit(name: String){
        setLoadingDialog(true)

        if(editData){
            updateVaccine(editData.id, name, userId).then(res => {
                toast.success('Data berhasil diperbarui')
                onCloseDialog(res)
            }).catch(err => {
                if(err.message.includes('unique')) {
                    toast.error('Nama vaksin sudah pernah digunakan, gunakan nama vaksin yang berbeda')
                } else {
                    toast.error(err.message)   
                }
            }).finally(() => setLoadingDialog(false))
        } else {
            createVaccine(name, userId).then(res => {
                toast.success('Data berhasil diperbarui')
                onCloseDialog(res)
            }).catch(err => {
                if(err.message.includes('unique')) {
                    toast.error('Nama vaksin sudah pernah digunakan, gunakan nama vaksin yang berbeda')
                } else {
                    toast.error(err.message)   
                }
            }).finally(() => setLoadingDialog(false))
        }
    }

    return {
        vaccineList,
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