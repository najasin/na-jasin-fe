'use client'

import { useQuery } from '@tanstack/react-query'

import { getRadarData } from './radar-mock.apis'
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
export default function RadarChartFetcher() {
  const { data: radar } = useQuery({
    queryKey: ['radar'],
    queryFn: () => getRadarData(),
    staleTime: 10 * 1000,
  })

  const isRegistered = true

  const initialKeywordPercents = {
    키워드1: 2.6,
    키워드2: 2.6,
    키워드3: 2.6,
    키워드4: 2.6,
    키워드5: 2.6,
  }

  const { originKeywordPercents } = radar

  // otherKeywordPercents 데이터 없고, 타적나사가 아니면 빈 객체({}) 할당
  // otherKeywordPercents 데이터 없고, 타적나사면 initialKeywordPercents 할당
  const { otherKeywordPercents } = radar

  const rectangleLayout = {
    frameSize: 500,
    radarSize: 300,
  }

  return (
    <RadarChartContainer
      isRegistered={isRegistered}
      originKeywordPercents={
        isRegistered ? initialKeywordPercents : originKeywordPercents
      }
      otherKeywordPercents={isRegistered ? {} : otherKeywordPercents}
      frameSize={rectangleLayout.frameSize}
      radarSize={rectangleLayout.radarSize}
      framePadding={rectangleLayout.frameSize - rectangleLayout.radarSize}
    />
  )
}
