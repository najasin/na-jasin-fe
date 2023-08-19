import { dehydrate } from '@tanstack/query-core'

import MakeMyManual from '@/components/makeMyManual/makeMyManual'
import SimpleLayout from '@/components/simpleLayout/simpleLayout'

import { getMyManualRegister } from '@/api/axios/requestHandler/myManual/getMyManualRegister.api'
import QueryHydrate from '@/api/tanstack/queryHydrate.context'
import { getQueryClient } from '@/api/tanstack/tanstack.helpers'

export default async function MyManual() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(['myprofileRegister'], getMyManualRegister)
  const dehydratedState = dehydrate(queryClient)
  return (
    <QueryHydrate state={dehydratedState}>
      <SimpleLayout title="나 사용설명서 만들기" margin={28}>
        <MakeMyManual />
      </SimpleLayout>
    </QueryHydrate>
  )
}
