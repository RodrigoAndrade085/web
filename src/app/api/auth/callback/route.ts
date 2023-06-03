import { api } from '@/lib/api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  const redirectTo = request.cookies.get('redirectTo')?.value

  const registerResṕonse = await api.post('/register', {
    code,
  })

  const { token } = registerResṕonse.data

  const redirectURL = redirectTo ?? new URL('/', request.url)

  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `token=${token}; path=/; max-age=2592000`,
    },
  })
}
