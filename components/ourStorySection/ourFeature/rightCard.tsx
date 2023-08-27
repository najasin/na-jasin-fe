'use client'

import { useRef } from 'react'

import classNames from 'classnames/bind'
import { motion } from 'framer-motion'
import { useRecoilState } from 'recoil'

import Image from 'next/image'

import { featureIdAtom } from '../shared/store/featureStore.store'
import styles from './rightCard.module.scss'

type FeatureCardProps = {
  id: string
  imageSrc: string
}

const cx = classNames.bind(styles)

export default function RightCard({ id, imageSrc }: FeatureCardProps) {
  const [featureId] = useRecoilState(featureIdAtom)
  const targetRef = useRef<HTMLDivElement>(null)

  const opacityVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return (
    <motion.div
      ref={targetRef}
      initial="hidden"
      animate={featureId === id ? 'visible' : 'hidden'}
      variants={opacityVariants}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={cx('rightCardWrapper')}
    >
      <Image
        className={cx('image')}
        src={imageSrc}
        fill={true}
        alt="our story image"
      />
    </motion.div>
  )
}
