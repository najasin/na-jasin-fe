'use client'

import { useEffect, useRef, useState } from 'react'

import classNames from 'classnames/bind'
import { motion, useInView } from 'framer-motion'
import { useRecoilState } from 'recoil'

import { featureState, fullScreenState } from './featureStore.store'
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
  const [fullScreen, setFullScreen] = useRecoilState(fullScreenState)
  const ref = useRef<HTMLParagraphElement>(null)
  const isInView = useInView(ref, {
    margin: '-50% 0px -50% 0px',
  })
  // const [x, setX] = useState(0)
  const [opacity, setOpacity] = useState(1)

  // console.log('featureId at title', featureId)
  // console.log('fullScreen at title', fullScreen)

  useEffect(() => {
    // 현재 보여지는 텍스트에 따라 오른쪽에 보여줄 카드를 변경합니다.
    if (isInView) setFeatureId(id)
    if (!isInView && featureId === id) setFeatureId('')
    if (!isInView && fullScreen === id) setFullScreen('')
  }, [isInView, id, setFeatureId, featureId, fullScreen, setFullScreen])

  useEffect(() => {
    if (fullScreen) {
      // setX(-600)
      setOpacity(0)
    } else {
      // setX(0)
      setOpacity(1)
    }
  }, [fullScreen])

  return (
    <motion.p
      // style={{ x, transition: 'all 0.5s ease' }}
      style={{ opacity, transition: 'all 0.5s ease' }}
      ref={ref}
      className={cx('featureTitle', {
        currentColor: isInView,
      })}
    >
      {children}
    </motion.p>
  )
}
