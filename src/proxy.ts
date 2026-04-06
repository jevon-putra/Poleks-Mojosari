import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const PUBLIC_PATHS    = ['/login']
const PROTECTED_PATHS = ['/poli', '/vaksin', '/kunjungan', '/vaksinasi']

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({request})
  const { pathname } = request.nextUrl

  // With Fluid compute, don't put this client in a global environment
  // variable. Always create a new one on each request.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

 // Cek session dari cookie — tidak fetch ke DB
  const { data: { session } } = await supabase.auth.getSession()
  const isPublicPath    = PUBLIC_PATHS.includes(pathname)
  const isProtectedPath = PROTECTED_PATHS.some(p => pathname.startsWith(p))

  // Tidak ada session → redirect ke login
  if (!session && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Ada session tapi buka /login → redirect ke dashboard
  if (session && isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Ada session → cek role untuk protected path
  if (session && isProtectedPath) {
    const { data: profile } = await supabase
      .from('users')
      .select('role')
      .eq('id', session.user.id)
      .single()

    // Role public → tidak boleh akses CRUD
    if (profile?.role === 'public') {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // User tidak ditemukan → paksa logout
    if (!profile) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
