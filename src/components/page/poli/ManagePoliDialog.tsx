'use client'

import { Poliklinik } from "@/types/index.types"
import { useEffect, useState } from "react"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Dialog, DialogBody, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog"

interface ManagePoliDialogProps {
    open: boolean
    editData: Poliklinik | null
    onSubmit: (name: string) => void
    onClose: (data: Poliklinik | null) => void
}

export function ManagePoliDialog({ open, editData, onSubmit, onClose }: ManagePoliDialogProps) {
    const [name, setName] = useState('')

    useEffect(() => {
        if (editData) {
            setName(editData.nama_poli)
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
                    titleValue={isEditMode ? 'Edit Poliklinik' : 'Tambah Poliklinik'}
                    description={isEditMode ? 'Edit data poliklinik' : 'Tambah data poliklinik'}
                />

                <form onSubmit={handleSubmit}>
                    <DialogBody>
                        <div>
                            <label className="form-label">Nama Poliklinik</label>
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