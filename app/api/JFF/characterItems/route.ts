import { NextResponse } from 'next/server'

import itemsData from '@/public/data/inventory.mockdata.json'

export async function GET() {
  return NextResponse.json({ ...itemsData })
}
