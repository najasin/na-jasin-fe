import { NextResponse } from 'next/server'

import othersData2 from '@/public/data/others-manual.mockdata2.json'

export async function GET() {
  return NextResponse.json({ othersData2 })
}
