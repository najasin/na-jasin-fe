import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl

  if (
    pathname.startsWith('/') &&
    pathname.endsWith('/') &&
    searchParams.get('accessToken')
  ) {
    const act = searchParams.get('accessToken')
    const rft = searchParams.get('refreshToken')
    // const uid = searchParams.get('userId')
    // const userType = searchParams.get('userType')

    const response = NextResponse.redirect(new URL('/jff/my-manual', req.url))

    response.cookies.set({
      name: 'act',
      value: act as string,
      //   httpOnly: true,
      secure: true,
      sameSite: 'none',
    })
    response.cookies.set({
      name: 'rft',
      value: rft as string,
      //   httpOnly: true,
      secure: true,
      sameSite: 'none',
    })

    return response
  }

  return NextResponse.next()
}
