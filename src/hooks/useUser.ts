'use client'

import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { userCache } from '@/lib/userCache'
import type { UserProfile } from '@/types/index.types'
import { fetchUserProfile } from '@/service/user.service'

export function useUser() {
  const [user, setUser]       = useState<UserProfile | null>(() => userCache.get())
  const [loading, setLoading] = useState(() => userCache.get() === null)

  const refreshUser = useCallback(async () => {
    userCache.clear()
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) return

    const fresh = await fetchUserProfile(session.user.id)
    if (fresh) userCache.set(fresh)
    setUser(fresh)
  }, [])

  useEffect(() => {
    let cancelled = false
    const supabase = createClient()

    const init = async () => {

      if (userCache.get()) {
        const { data: { session } } = await supabase.auth.getSession()

        if (!session) {
          userCache.clear()
          setUser(null)
          setLoading(false)
          return
        }

         // Cache ada + session valid → langsung pakai
        setLoading(false)
        return
      }
      
      const { data: { session } } = await supabase.auth.getSession()
      if (cancelled) return

      if (!session?.user) {
        setLoading(false)
        return
      }

      // Ada session → fetch sekali, simpan cache
      const profile = await fetchUserProfile(session.user.id)
      if (cancelled) return

      if (profile) {
        userCache.set(profile)
        setUser(profile)
      }

      setLoading(false)
    }

    init()

    // Hanya listen SIGNED_OUT — tidak fetch ulang saat SIGNED_IN
    // karena fetch sudah dilakukan di login page
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event) => {
        if (cancelled) return
        if (event === 'SIGNED_OUT') {
          userCache.clear()
          setUser(null)
          setLoading(false)
        }
      }
    )

    return () => {
      cancelled = true
      subscription.unsubscribe()
    }
  }, [])

  return { user, loading, refreshUser }
}