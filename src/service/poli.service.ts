import { createClient } from "@/lib/supabase/client";
import { KunjunganGrouped, KunjunganPayload, Poliklinik } from "@/types/index.types";

const TABLE_NAME_POLI   = "poliklinik"
const TABLE_NAME_VISIT  = "kunjungan_harian"

export async function getPoli(): Promise<Poliklinik[]> {
    const supabase = createClient()
    const { data, error } = await supabase
        .from(TABLE_NAME_POLI)
        .select('*')
        .eq('is_active', true)
        .order('nama_poli')

    if (error) throw new Error(error.message)
    return data ?? []
}

export async function createPoli(name: String, usedId: String): Promise<Poliklinik> {
    const supabase = createClient()
    const { data, error } = await supabase
        .from(TABLE_NAME_POLI)
        .insert({ nama_poli: name, created_by: usedId, updated_by: usedId })
        .select()
        .single()

    if (error) throw new Error(error.message)
    return data ?? []
}

export async function updatePoli(id: String, name: String, usedId: String): Promise<Poliklinik> {
    const supabase = createClient()
    const { data, error } = await supabase
        .from(TABLE_NAME_POLI)
        .update({ nama_poli: name, updated_by: usedId })
        .eq('id', id)
        .select()
        .single()

    if (error) throw new Error(error.message)
    return data ?? []
}

export async function deletePoli(id: String, usedId: String): Promise<Poliklinik> {
    const supabase = createClient()
    const { data, error } = await supabase
        .from(TABLE_NAME_POLI)
        .update({ is_active: false, updated_by: usedId })
        .eq('id', id)
        .select()
        .single()

    if (error) throw new Error(error.message)
    return data ?? []
}

export async function kunjunganPoli(payload: KunjunganPayload[]) {
    const supabase = createClient()
    const { data, error } = await supabase
        .from(TABLE_NAME_VISIT)
        .upsert(payload, { onConflict: 'tanggal,poliklinik_id' })

    if (error) throw new Error(error.message)
    return data ?? []
}

export async function getKunjunganGroupByDate(): Promise<KunjunganGrouped[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from(TABLE_NAME_VISIT)
    .select('*')
    .order('tanggal', { ascending: false })

  if (error) throw new Error(error.message)
  
  const grouped = (data ?? []).reduce((acc, row) => {
    const key = row.tanggal
    if (!acc[key]) {
      acc[key] = {
        tanggal:      key,
        total_pasien: 0,
        detail:       [],
      }
    }
    acc[key].total_pasien += row.jumlah_pasien
    acc[key].detail.push(row)
    return acc
  }, {} as Record<string, KunjunganGrouped>)

  return Object.values(grouped)
}