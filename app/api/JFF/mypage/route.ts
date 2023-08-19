import { NextResponse } from 'next/server'

import itemsData from '@/public/data/mypage.mockdata.json'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const param = searchParams.get('userId')

  if (!param) {
    return NextResponse.json('유저 타입 넣어주세요!')
  }

  return NextResponse.json({ itemsData })
}
