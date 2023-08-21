/* eslint-disable no-warning-comments */
import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl

  const actForCheck = req.cookies.get('act')?.value
  const rftForCheck = req.cookies.get('rft')?.value
  const uidForCheck = req.cookies.get('uid')?.value
  const utpForCheck = req.cookies.get('utp')?.value

  // 로그인을 했는데, 다시 홈페이지로 왔을 경우 redirect
  if (
    pathname.startsWith('/') &&
    pathname.endsWith('/') &&
    (actForCheck || rftForCheck)
  ) {
    // TODO: df 타입 추가 예정
    // 아직 등록하지 않은 경우 (userType이 없는 경우) 등록하기 페이지로 redirect
    if (!utpForCheck) {
      return NextResponse.redirect(new URL('/jff/my-manual', req.url))
    }
    // TODO: df 타입 추가 예정
    // 등록을 이미 한 경우 (userType이 있는 경우) 마이 페이지로 redirect
    return NextResponse.redirect(
      new URL(`/jff/my-page?userId=${uidForCheck}`, req.url),
    )
  }

  // TODO: df 타입 추가 예정
  // 소셜 로그인 -> 토큰 저장 -> jff/my-manual로 이동
  if (
    pathname.startsWith('/') &&
    pathname.endsWith('/') &&
    searchParams.get('accessToken')
  ) {
    const act = searchParams.get('accessToken')
    const rft = searchParams.get('refreshToken')
    const uid = searchParams.get('userId')
    const userType = searchParams.get('userType')

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
    response.cookies.set({
      name: 'uid',
      value: uid as string,
      //   httpOnly: true,
      secure: true,
      sameSite: 'none',
    })
    response.cookies.set({
      name: 'utp',
      value: userType as string,
      //   httpOnly: true,
      secure: true,
      sameSite: 'none',
    })

    return response
  }

  return NextResponse.next()
}
