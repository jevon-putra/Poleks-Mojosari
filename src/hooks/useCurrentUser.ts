'use client'

import { createClient } from "@/lib/supabase/client"
import { UserProfile } from "@/types/index.types"
import { useEffect, useState } from "react"

export function useCurrentUser() {
    const [user, setUser] = useState<UserProfile | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const supabase = createClient()

        const fetchUser = async () => {
            const { data: { user: authUser } } = await supabase.auth.getUser()
            if (!authUser) { setLoading(false); return }

            const { data } = await supabase
                .from('users')
                .select('*')
                .eq('id', authUser.id)
                .single()

            setUser(data)
            setLoading(false)
        }

        fetchUser()
    }, [])

  return { user, loading }
}