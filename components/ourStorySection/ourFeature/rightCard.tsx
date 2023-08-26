'use client'

import { useEffect, useRef, useState } from 'react'

import classNames from 'classnames/bind'
import { motion } from 'framer-motion'
import { useRecoilState } from 'recoil'

import Image from 'next/image'

import { featureIdAtom } from '../shared/store/featureStore.store'
import styles from './rightCard.module.scss'

type FeatureCardProps = {
  id: string
}

const cx = classNames.bind(styles)

export default function RightCard({ id }: FeatureCardProps) {
  const [featureId] = useRecoilState(featureIdAtom)
  const targetRef = useRef<HTMLDivElement>(null)
  const [opacity, setOpacity] = useState(0)
  const [y, setY] = useState(-75)

  useEffect(() => {
    if (featureId === id) {
      setY(0)
      setOpacity(1)
    } else {
      setOpacity(0)
      setY(-75)
    }
  }, [featureId, id])

  return (
    <motion.div
      ref={targetRef}
      className={cx('rightCardWrapper')}
      style={{ y, opacity, transition: 'all 0.7s ease' }}
    >
      <Image
        className={cx('image')}
        src="/images/ourstory-mypage-mock.png"
        fill={true}
        alt="our story image"
      />
    </motion.div>
  )
}
