import { NextResponse } from 'next/server'

import othersData from '@/public/data/others-manual.mockdata.json'

export async function GET() {
  return NextResponse.json({ ...othersData })
}

export async function POST(req: Request) {
  const body = await req.json()
  if (body) {
    return NextResponse.json('성공')
  }
}
