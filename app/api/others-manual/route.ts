import { NextResponse } from 'next/server'

import othersData from '@/public/data/others-manual.mockdata.json'

export async function GET() {
  return NextResponse.json({ othersData })
}
