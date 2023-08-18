import { dehydrate } from '@tanstack/query-core'

import MakeOthersManual from '@/components/makeOthersManual/makeOthersManual'
import { fetchOthersManual } from '@/components/makeOthersManual/makeOthersManual.api'

import QueryHydrate from '@/api/tanstack/queryHydrate.context'
import { getQueryClient } from '@/api/tanstack/tanstack.helpers'

export default async function OthersManual() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(['othersData2'], fetchOthersManual)
  const dehydratedState = dehydrate(queryClient)
  return (
    <QueryHydrate state={dehydratedState}>
      <MakeOthersManual />
    </QueryHydrate>
  )
}
