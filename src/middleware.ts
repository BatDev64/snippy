import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const hasCookies = request.cookies.has('clientId')

  if (!hasCookies) {
    const anonymousId = crypto.randomUUID()

    response.cookies.set({
      name: 'clientId',
      value: anonymousId,
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7
    })
  }

  return response
}

export const config = {
  matcher: ['/']
}
