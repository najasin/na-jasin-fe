import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    data: {
      originKeywordPercents: {
        키워드1: 6,
        키워드2: 10,
        키워드3: 3,
        키워드4: 4,
        키워드5: 7,
      },
      otherKeywordPercents: {
        키워드1: 3,
        키워드2: 8,
        키워드3: 5,
        키워드4: 6,
        키워드5: 4,
      },
    },
  })
}
