import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

import itemsData from '@/public/data/my-manual.mockdata.json'

export async function GET() {
  return NextResponse.json({ ...itemsData })
}

export async function POST(req: Request) {
  const body = await req.json()

  const authorization = headers().get('authorization')

  if (typeof authorization?.split(' ')[0] !== 'string') {
    return NextResponse.json('토큰 error')
  }

  if (body.characterItems && body.answers && body.originKeywordPercents) {
    return NextResponse.json('성공')
  }

  return NextResponse.json('실패')
}
