import { createClient } from "@/lib/supabase/client";
import { Vaksin, VaksinasiGrouped, VaksinasiPayload } from "@/types/index.types";

const TABLE_NAME = "vaksin"
const TABLE_NAME_VAKSINASI = "vaksinasi_harian"

export async function getVaccine(): Promise<Vaksin[]> {
    const supabase = createClient()
    const { data, error } = await supabase
        .from(TABLE_NAME)
        .select('*')
        .eq('is_active', true)
        .order('nama_vaksin')

    if (error) throw new Error(error.message)
    return data ?? []
}

export async function createVaccine(name: String, usedId: String): Promise<Vaksin> {
    const supabase = createClient()
    const { data, error } = await supabase
        .from(TABLE_NAME)
        .insert({ nama_vaksin: name, created_by: usedId, updated_by: usedId })
        .select()
        .single()

    if (error) throw new Error(error.message)
    return data ?? []
}

export async function updateVaccine(id: String, name: String, usedId: String): Promise<Vaksin> {
    const supabase = createClient()
    const { data, error } = await supabase
        .from(TABLE_NAME)
        .update({ nama_vaksin: name, updated_by: usedId })
        .eq('id', id)
        .select()
        .single()

    if (error) throw new Error(error.message)
    return data ?? []
}


export async function deleteVaccine(id: String, usedId: String): Promise<Vaksin> {
    const supabase = createClient()
    const { data, error } = await supabase
        .from(TABLE_NAME)
        .update({ is_active: false, updated_by: usedId })
        .eq('id', id)
        .select()
        .single()

    if (error) throw new Error(error.message)
    return data ?? []
}

export async function vaksinasi(payload: VaksinasiPayload[]) {
    const supabase = createClient()
    const { data, error } = await supabase
        .from(TABLE_NAME_VAKSINASI)
        .upsert(payload, { onConflict: 'tanggal,vaksin_id' })

    if (error) throw new Error(error.message)
    return data ?? []
}

export async function getVaksinasiGroupByDate(): Promise<VaksinasiGrouped[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from(TABLE_NAME_VAKSINASI)
    .select('*')
    .order('tanggal', { ascending: false })

  if (error) throw new Error(error.message)
  
  const grouped = (data ?? []).reduce((acc, row) => {
    const key = row.tanggal
    if (!acc[key]) {
      acc[key] = {
        tanggal:      key,
        total_vaksin: 0,
        detail:       [],
      }
    }
    acc[key].total_vaksin += row.jumlah_dosis
    acc[key].detail.push(row)
    return acc
  }, {} as Record<string, VaksinasiGrouped>)

  return Object.values(grouped)
}