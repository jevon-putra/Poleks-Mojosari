'use client'

import { VaksinasiPayload, VaksinasiHarian } from "@/types/index.types"
import { useEffect, useState } from "react"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Dialog, DialogBody, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { userCache } from "@/lib/userCache"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import React from "react"
import { format } from 'date-fns'
import { id as localeId } from 'date-fns/locale'
import { ChevronDownIcon, Loader2 } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { useVaccinate } from "@/hooks/useVaccinate"
import { on } from "events"

interface ManageVaksinasiDialogProps {
    open: boolean
    detailData: VaksinasiHarian[] | null
    onSubmit: (payload: VaksinasiPayload[]) => void
    onClose: () => void
}

export function ManageVaksinasiDialog({ open, detailData, onSubmit, onClose }: ManageVaksinasiDialogProps) {
    const { get }                                   = userCache
    const [inputs, setInputs]                       = useState<Record<string, string>>({})
    const [date, setDate]                           = React.useState<Date>(new Date())
    const [isEnabledInputDate, setEnabledInputDate] = useState(true)
    const [isEnabledEdit, setEnabledEdit]           = useState(true)
    const {
        isLoadingDialog,
        getListVaccine,
        addVaksinasi,
        vaksinList,
    } = useVaccinate(get()?.id || '')

    useEffect(() => {
        if(open) {
            setDate(new Date())
            setEnabledInputDate(true)
            getListVaccine()
            setInputs({})
        }
    }, [open])

    useEffect(() => {
        if (vaksinList.length === 0 || !detailData || detailData.length === 0) return

        const dateData = new Date(detailData[0].tanggal)
        dateData.setHours(0, 0, 0, 0)

        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const fourDaysAgo = new Date()
        fourDaysAgo.setHours(0, 0, 0, 0)
        fourDaysAgo.setDate(today.getDate() - 7)

        const isEditable = dateData >= fourDaysAgo && dateData <= today

        setDate(dateData)
        setEnabledEdit(isEditable)
        setEnabledInputDate(false)

        detailData?.forEach(d => {
            if (d.vaksin_id) {
                handleInputChange(d.vaksin_id, d.jumlah_dosis?.toString() ?? '0')
            }
        })

    }, [vaksinList.length, detailData])

    if(!open) return null

    const handleInputChange = (poliId: string, value: string) => {
        setInputs(prev => ({ ...prev, [poliId]: value }))
    }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const payload: VaksinasiPayload[] = vaksinList
      .filter(p => inputs[p.id] && Number(inputs[p.id]) > 0)
      .map(p => ({
        vaksin_id:         p.id,
        jumlah_dosis: Number(inputs[p.id] || 0),
        tanggal: format(date, "yyyy-MM-dd", { locale: localeId }),
      }))

    if (payload.length === 0) return

    onSubmit(payload)
  }

  const totalPasien = Object.values(inputs).reduce((sum, val) => sum + (Number(val) || 0), 0)

    return (
        <Dialog open={open} onOpenChange={() => onClose()}>
            <DialogContent showCloseButton={true} preventClose>
                <DialogHeader
                    titleValue={detailData !== null ? 'Edit Vaksinasi' : 'Tambah Vaksinasi'}
                    description={detailData !== null ? 'Edit Data Vaksinasi' : 'Tambah Data Vaksinasi'}
                />

                <form  onSubmit={e => handleSubmit(e)}>
                    <DialogBody>
                        <div>
                            <label className="form-label">Tanggal Vaksinasi</label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        data-empty={!date}
                                        disabled={!isEnabledInputDate}
                                        className="input-field w-full"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span>{date ? format(date, "EEEE, dd MMMM yyyy", { locale: localeId }) : "Pick a date"}</span>
                                            <ChevronDownIcon /> 
                                        </div>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent 
                                    className="w-auto p-0 bg-(--bg-card)! border-(--border-default)"
                                    style={{
                                        boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                                    }}
                                    align="center"
                                >
                                    <Calendar
                                        required
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        defaultMonth={date}
                                        locale={localeId}
                                        disabled={(day) => {
                                            const today       = new Date()
                                            const fourDaysAgo = new Date()

                                            today.setHours(0, 0, 0, 0)
                                            fourDaysAgo.setHours(0, 0, 0, 0)
                                            fourDaysAgo.setDate(today.getDate() - 7)

                                            return day > today || day < fourDaysAgo
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>

                            <div className="flex items-center justify-between py-2">
                                <label className="form-label">Jumlah Vaksinasi</label>
                                {totalPasien > 0 && (
                                    <span className="badge badge-blue">
                                        Total: {totalPasien} Vaksinasi
                                    </span>
                                )}
                            </div>
                        </div>
                        <div>
                            {/* Loading */}
                            {isLoadingDialog ? (
                                <div className="flex items-center justify-center py-8 gap-2"
                                style={{ color: 'var(--text-muted)' }}>
                                <Loader2 size={16} className="animate-spin" />
                                <span className="text-sm">Memuat data vaksin...</span>
                                </div>
                            ) : vaksinList.length === 0 ? (
                                <div className="flex flex-col items-center py-8 gap-2"
                                style={{ color: 'var(--text-muted)' }}>
                                <span className="text-2xl">🏥</span>
                                <span className="text-sm">Belum ada data vaksin</span>
                                </div>
                            ) : (
                                <div className="max-h-64 overflow-y-auto">
                                    {vaksinList.map((data, index) => (
                                        <div
                                            key={data.id}
                                            className="flex items-center gap-3 px-2 py-2"
                                            style={{
                                                background: index % 2 === 0
                                                    ? 'var(--bg-input)'
                                                    : 'var(--bg-card)',
                                            }}
                                        >
                                            <span
                                                className="text-sm font-medium truncate flex-1"
                                                style={{ color: 'var(--text-primary)' }}
                                            >
                                                {data.nama_vaksin}
                                            </span>

                                            {/* Input jumlah — kanan, fixed width */}
                                            <div className="flex items-center gap-1 shrink-0">
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    value={inputs[data.id] ?? ''}
                                                    onChange={e => handleInputChange(data.id, e.target.value)}
                                                    placeholder="0"
                                                    variant="default"
                                                    className="input-field"
                                                    disabled={!isEnabledEdit} 
                                                    onWheel={(e) => e.currentTarget.blur()}
                                                    style={{
                                                        width: '64px',
                                                        height: '32px',
                                                        padding: '0.375rem 0.5rem',
                                                        textAlign: 'center',
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </DialogBody>
                    
                    {isEnabledEdit ? (
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="ghost"
                                className="flex-1"
                                onClick={() => onClose()}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                variant="primary"
                                className="flex-1"
                            >
                                {detailData !== null ? 'Edit' : 'Tambah'}
                            </Button>
                        </DialogFooter>
                    ) : <div></div>}
                </form>
            </DialogContent>
        </Dialog>
    )
}