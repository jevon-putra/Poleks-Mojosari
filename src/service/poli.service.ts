import { createClient } from "@/lib/supabase/client";
import { Poliklinik } from "@/types/index.types";
import { use } from "react";

const TABLE_NAME = "poliklinik"

export async function getPoli(): Promise<Poliklinik[]> {
    const supabase = createClient()
    const { data, error } = await supabase
        .from(TABLE_NAME)
        .select('*')
        .eq('is_active', true)
        .order('nama_poli')

    if (error) throw new Error(error.message)
    return data ?? []
}

export async function createPoli(name: String, usedId: String): Promise<Poliklinik> {
    const supabase = createClient()
    const { data, error } = await supabase
        .from(TABLE_NAME)
        .insert({ nama_poli: name, created_by: usedId, updated_by: usedId })
        .select()
        .single()

    if (error) throw new Error(error.message)
    return data ?? []
}

export async function updatePoli(id: String, name: String, usedId: String): Promise<Poliklinik> {
    const supabase = createClient()
    const { data, error } = await supabase
        .from(TABLE_NAME)
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
        .from(TABLE_NAME)
        .update({ is_active: false, updated_by: usedId })
        .eq('id', id)
        .select()
        .single()

    if (error) throw new Error(error.message)
    return data ?? []
}