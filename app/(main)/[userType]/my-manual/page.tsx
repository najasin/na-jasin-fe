import { dehydrate } from '@tanstack/query-core'

import MakeMyManual from '@/components/makeMyManual/makeMyManual'
import { fetchMyProfileRegisterData } from '@/components/makeMyManual/makeMyManual.api'

import QueryHydrate from '@/api/tanstack/queryHydrate.context'
import { getQueryClient } from '@/api/tanstack/tanstack.helpers'

export default async function MyManual() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(
    ['myprofileRegister'],
    fetchMyProfileRegisterData,
  )
  const dehydratedState = dehydrate(queryClient)
  return (
    <QueryHydrate state={dehydratedState}>
      <MakeMyManual />
    </QueryHydrate>
  )
}
