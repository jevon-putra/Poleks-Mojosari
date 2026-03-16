'use client'

import { Poliklinik } from "@/types/index.types"
import { X } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"

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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)' }}
            onClick={() => onClose}
        >
            <div className="w-full max-w-md rounded-2xl shadow-2xl"
                style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-default)',
                }}
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4"
                    style={{ 
                        borderBottom: '1px solid var(--border-default)' 
                    }}
                >
                    <div className="flex items-center gap-3">
                        <div>
                            <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                                {isEditMode ? 'Edit Poli' : 'Tambah Poli'}
                            </h3>
                            <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                                {isEditMode ? 'Ubah Nama Poli' : 'Masukkan Nama Poli'}
                            </p>
                        </div>
                    </div>
                    <Button
                        onClick={() => onClose(null)}
                        variant="primaryOutline"
                        size='icon'
                    >
                        <X size={16} />
                    </Button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit}>
                    <div className="px-6 py-5">
                        <label className="form-label">Nama Poli</label>
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

                        <Button
                            variant="primary"
                            type="submit"
                            className="w-full mt-8"
                        >
                            {editData ? 'Simpan Perubahan' : 'Tambah Poliklinik'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}