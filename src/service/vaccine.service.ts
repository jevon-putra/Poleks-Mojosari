import { createClient } from "@/lib/supabase/client";
import { Vaksin } from "@/types/index.types";

const TABLE_NAME = "vaksin"

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