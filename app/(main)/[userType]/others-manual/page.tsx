import { dehydrate } from '@tanstack/query-core'

import MakeOthersManual from '@/components/makeOthersManual/makeOthersManual'

import { fetchOthersManualById } from '@/api/axios/requestHandler/othersManual/getOthersManual.api'
import QueryHydrate from '@/api/tanstack/queryHydrate.context'
import { getQueryClient } from '@/api/tanstack/tanstack.helpers'

export default async function OthersManual({
  params,
  searchParams,
}: {
  params: { userType: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  console.log(params.userType, searchParams.userId)
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(['othersData'], () =>
    fetchOthersManualById(params.userType, searchParams.userId as string),
  )
  const dehydratedState = dehydrate(queryClient)
  return (
    <QueryHydrate state={dehydratedState}>
      <MakeOthersManual />
    </QueryHydrate>
  )
}
