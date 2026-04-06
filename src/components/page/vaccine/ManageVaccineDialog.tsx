'use client'

import { useEffect, useState } from "react"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Vaksin } from "@/types/index.types"
import { Dialog, DialogBody, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog"

interface ManageVaccineDialogProps {
    open: boolean
    editData: Vaksin | null
    onSubmit: (name: string) => void
    onClose: (data: Vaksin | null) => void
}

export function ManageVaccineDialog({ open, editData, onSubmit, onClose }: ManageVaccineDialogProps) {
   const [name, setName] = useState('')

    useEffect(() => {
        if (editData) {
            setName(editData.nama_vaksin)
        } else {
            setName('') 
        }
    }, [editData, open])
    
    const isEditMode = editData !== null
    if(!open) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(name)
    }

    return (
        <Dialog open={open} onOpenChange={() => onClose(null)}>
            <DialogContent showCloseButton={true} preventClose>
                <DialogHeader
                    titleValue={isEditMode ? 'Edit Vaksin' : 'Tambah Vaksin'}
                    description={isEditMode ? 'Edit data vaksin' : 'Tambah data vaksin'}
                />
                
                <form onSubmit={handleSubmit}>
                    <DialogBody>
                        <div>
                            <label className="form-label">Nama Vaksin</label>
                            <Input
                                type="text"
                                variant="default"
                                className="input-field"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="contoh: Poli Umum, Poli Anak..."
                                required
                                autoFocus
                            />
                        </div>
                    </DialogBody>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="ghost"
                            className="flex-1"
                            onClick={() => onClose(null)}
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            className="flex-1"
                        >
                            {editData ? 'Simpan' : 'Tambah'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}