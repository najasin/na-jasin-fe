'use client'

import { useEffect, useRef } from 'react'

import { useInView } from 'framer-motion'
import { useRecoilState } from 'recoil'

import { featureIdAtom } from '../shared/store/featureStore.store'

export default function CurrentHeightChecker({
  height,
  id,
}: {
  height: string
  id: string
}) {
  const targetRef = useRef<HTMLDivElement>(null)
  const [, setFeatureId] = useRecoilState(featureIdAtom)
  const isInView = useInView(targetRef, {
    margin: '0px 0px 0px 0px',
  })

  useEffect(() => {
    if (isInView) {
      setFeatureId(id)
    } else {
      setFeatureId('')
    }
  }, [isInView])

  return <div ref={targetRef} style={{ height, width: '64px' }} />
}
