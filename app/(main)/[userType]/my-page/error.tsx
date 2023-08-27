'use client'

import MypageError from '@/components/error/mypageError'

export default function Error({ error }: { error: Error }) {
  if (
    error.message === '존재하지 않는 유저입니다.' ||
    error.message === '존재하지 않는 유저타입입니다.'
  ) {
    return <MypageError error={error} />
  }
}
