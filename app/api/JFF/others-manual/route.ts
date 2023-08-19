import { NextResponse } from 'next/server'

import othersData2 from '@/public/data/others-manual.mockdata2.json'

export async function GET() {
  return NextResponse.json({ ...othersData2 })
}

export async function POST(req: Request) {
  const body = await req.json()
  if (body) {
    return NextResponse.json('성공')
  }
}
