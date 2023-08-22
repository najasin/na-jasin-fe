import { dehydrate } from '@tanstack/query-core'

import MakeOthersManual from '@/components/makeOthersManual/makeOthersManual'

import { fetchOthersManualById } from '@/api/axios/requestHandler/othersManual/getOthersManual.api'
import QueryHydrate from '@/api/tanstack/queryHydrate.context'
import { getQueryClient } from '@/api/tanstack/tanstack.helpers'

export default async function OthersManual({
  // params,
  searchParams,
}: {
  // params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // console.log(params, searchParams)
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(['othersData'], () =>
    fetchOthersManualById(searchParams.userId as string),
  )
  const dehydratedState = dehydrate(queryClient)
  return (
    <QueryHydrate state={dehydratedState}>
      <MakeOthersManual />
    </QueryHydrate>
  )
}
