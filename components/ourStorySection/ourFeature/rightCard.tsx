'use client'

import { useRef } from 'react'

import classNames from 'classnames/bind'
import { motion } from 'framer-motion'
import { useRecoilState } from 'recoil'

import Image from 'next/image'

import useBreakpoint from '@/hooks/useBreakpoint.hooks'

import { featureIdAtom } from '../shared/store/featureStore.store'
import styles from './rightCard.module.scss'

type FeatureCardProps = {
  id: string
  imageSrc: string
  imageMobileSrc: string
}

const cx = classNames.bind(styles)

export default function RightCard({
  id,
  imageSrc,
  imageMobileSrc,
}: FeatureCardProps) {
  const [featureId] = useRecoilState(featureIdAtom)
  const targetRef = useRef<HTMLDivElement>(null)

  const isTablet: boolean = useBreakpoint({ query: '(max-width: 1199px)' })

  const opacityVariants = {
    hidden: { opacity: 0, y: -35 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      ref={targetRef}
      initial="hidden"
      animate={featureId === id ? 'visible' : 'hidden'}
      variants={opacityVariants}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={cx('rightCardWrapper', {
        isTablet,
      })}
      style={{
        translateX: isTablet ? '-50%' : '0px',
      }}
    >
      <Image
        className={cx('image')}
        src={isTablet ? imageMobileSrc : imageSrc}
        fill={true}
        alt="our story image"
        sizes="(max-width: 1200px) 300px"
      />
    </motion.div>
  )
}
