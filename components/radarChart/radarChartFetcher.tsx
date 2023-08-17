'use client'

import { useEffect, useState } from 'react'

import { TrimmedDataProps } from './radarChart.types'
// import { useQuery } from '@tanstack/react-query'
// import { getRadarData } from './radar-mock.apis'
import RadarChartContainer from './radarChartContainer'

/**
 * 
 * @description 
 * - 서버에서 dehydrate을 사용하고, 클라이언트에서 똑같은 key로 요청을 하면 실제 api 요청을 하지 않고 캐싱된 데이터를 가져옵니다. 
 * - 이를 통해 서버 데이터 prop drilling을 줄일 수 있습니다. 
 * - staleTime 옵션을 지정해야 클라이언트에서 api를 쏘지 않고 캐싱된 데이터를 잘 가져옵니다.
 * 
 * @example
 * ```jsx
 * import { dehydrate } from '@tanstack/react-query'
 * import { getRadarData } from '@/components/radarChart/radar-mock.apis'
 * import RadarChartFetcher from '@/components/radarChart/radarChartFetcher'
 * import QueryHydrate from '@/api/tanstack/queryHydrate.context'
 * import { getQueryClient } from '@/api/tanstack/tanstack.helpers'

 * export default async function Page() {
 *   const queryClient = getQueryClient()
 *   await queryClient.prefetchQuery(['radar'], () => getRadarData())
 *   const dehydratedState = dehydrate(queryClient)
 * 
 *   return (
 *     <QueryHydrate state={dehydratedState}>
 *      <RadarChartFetcher />
 *     </QueryHydrate>
 *   )
 * }
 * ```
 */
export default function RadarChartFetcher({
  radarType,
}: {
  radarType: 'MY' | 'NJNS' | 'TJNS'
}) {
  // const { data: radar } = useQuery({
  //   queryKey: ['radar'],
  //   queryFn: () => getRadarData(),
  //   staleTime: 10 * 1000,
  // }) // 서버 컴포넌트에서 같은 api를 dehydrate 했다면 클라이언트에서 api 요청하지 않고 캐싱된 데이터를 가져옵니다.

  const initialKeywordPercents = {
    키워드1: 2.6,
    키워드2: 2.6,
    키워드3: 2.6,
    키워드4: 2.6,
    키워드5: 2.6,
  }

  const radar = {
    originKeywordPercents: {
      키워드1: 4,
      키워드2: 6,
      키워드3: 3,
      키워드4: 8,
      키워드5: 10,
    },
    // otherKeywordPercents: null,
    otherKeywordPercents: {
      키워드1: 2,
      키워드2: 5,
      키워드3: 7,
      키워드4: 9,
      키워드5: 10,
    },
  }

  let originKeywordPercents
  if (radarType === 'NJNS') {
    originKeywordPercents = initialKeywordPercents
  } else {
    originKeywordPercents = radar.originKeywordPercents
  }

  let hasOthers = true
  let otherKeywordPercents
  if (radarType === 'NJNS') {
    hasOthers = false
    otherKeywordPercents = {}
  } else if (radar.otherKeywordPercents) {
    otherKeywordPercents = radar.otherKeywordPercents
  } else {
    hasOthers = false
    otherKeywordPercents = radar.originKeywordPercents
  }

  const rectangleLayout = {
    frameSize: 350,
    radarSize: 200,
  }

  const [radarData, setRadarData] = useState<TrimmedDataProps | null>(null)

  const handleUpdateRadarData = (value: TrimmedDataProps) => {
    setRadarData(value)
  }

  useEffect(() => {
    // example
  }, [radarData])

  return (
    <RadarChartContainer
      radarType={radarType}
      originKeywordPercents={originKeywordPercents}
      otherKeywordPercents={otherKeywordPercents}
      frameSize={rectangleLayout.frameSize}
      radarSize={rectangleLayout.radarSize}
      framePadding={rectangleLayout.frameSize - rectangleLayout.radarSize}
      hasOthers={hasOthers}
      handleUpdateRadarData={handleUpdateRadarData}
    />
  )
}
