'use client'

import { useEffect, useRef } from 'react'

import classNames from 'classnames/bind'
import { useInView } from 'framer-motion'
import { useRecoilState } from 'recoil'

import { featureState } from './featureStore.store'
import styles from './rightSticky.module.scss'

const cx = classNames.bind(styles)

export default function FeatureTitle({
  children,
  id,
}: {
  children: React.ReactNode
  id: string
}) {
  const [featureId, setFeatureId] = useRecoilState(featureState)
  const ref = useRef<HTMLParagraphElement>(null)
  const isInView = useInView(ref, {
    margin: '-50% 0px -50% 0px',
  })

  useEffect(() => {
    // 현재 보여지는 텍스트에 따라 오른쪽에 보여줄 카드를 변경합니다.
    if (isInView) setFeatureId(id)
    if (!isInView && featureId === id) setFeatureId('')
  }, [isInView, id, setFeatureId, featureId])

  return (
    <p
      ref={ref}
      className={cx('featureTitle', {
        currentColor: isInView,
      })}
    >
      {children}
    </p>
  )
}
