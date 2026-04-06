import type { UserProfile } from '@/types/index.types'

const KEY      = 'poleks_user_profile'
const MAX_AGE  = 60 * 60 * 1000  // 1 jam

interface Cache {
  data:      UserProfile
  cachedAt:  number
}

export const userCache = {
  get(): UserProfile | null {
    try {
      const raw = localStorage.getItem(KEY)
      if (!raw) return null

      const { data, cachedAt }: Cache = JSON.parse(raw)
      const expired = Date.now() - cachedAt > MAX_AGE

      if (expired) {
        this.clear()
        return null
      }

      return data
    } catch {
      return null
    }
  },

  set(data: UserProfile): void {
    try {
      const cache: Cache = { data, cachedAt: Date.now() }
      localStorage.setItem(KEY, JSON.stringify(cache))
    } catch {
      // localStorage tidak tersedia — skip
    }
  },

  clear(): void {
    try {
      localStorage.removeItem(KEY)
    } catch {}
  },

  isExpired(): boolean {
    return this.get() === null
  },
}