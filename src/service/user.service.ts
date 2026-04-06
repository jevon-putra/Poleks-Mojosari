import { createClient } from '@/lib/supabase/client'
import type { UserProfile } from '@/types/index.types'

export async function fetchUserProfile(userId: string): Promise<UserProfile | null> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    return null
  }

  return data
}