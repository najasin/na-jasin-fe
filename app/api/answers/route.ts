import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function PUT(req: Request) {
  const body = await req.json()

  const authorization = headers().get('authorization')

  if (typeof authorization?.split(' ')[0] !== 'string') {
    return NextResponse.json('토큰 설정하세요!')
  }

  if (body.answers && body.userType) {
    return NextResponse.json('성공')
  }

  return NextResponse.json('실패')
}
