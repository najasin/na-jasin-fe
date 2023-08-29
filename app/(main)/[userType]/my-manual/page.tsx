import { dehydrate } from '@tanstack/query-core'

import { cookies } from 'next/headers'

import MakeMyManual from '@/components/makeMyManual/makeMyManual'
import SimpleLayout from '@/components/shared/simpleLayout/simpleLayout'

import { getMyManualRegister } from '@/api/axios/requestHandler/myManual/getMyManualRegister.api'
import QueryHydrate from '@/api/tanstack/queryHydrate.context'
import { getQueryClient } from '@/api/tanstack/tanstack.helpers'

export default async function MyManual() {
  const queryClient = getQueryClient()
  const token = cookies().get('act')

  await queryClient.prefetchQuery(['myprofileRegister'], () =>
    getMyManualRegister(token?.value),
  )
  const dehydratedState = dehydrate(queryClient)
  return (
    <QueryHydrate state={dehydratedState}>
      <SimpleLayout title="나 사용설명서 만들기" margin={28}>
        <MakeMyManual />
      </SimpleLayout>
    </QueryHydrate>
  )
}
