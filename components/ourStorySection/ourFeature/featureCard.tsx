'use client'

import classNames from 'classnames/bind'
import { motion } from 'framer-motion'
import { useRecoilState } from 'recoil'

import { featureIdAtom } from '../shared/store/featureStore.store'
import styles from './featureCard.module.scss'

type CardProps = {
  id: string
}

type FeatureCardProps = {
  colorText: string
  parentView: boolean
} & CardProps

const cx = classNames.bind(styles)

export default function FeatureCard({
  parentView,
  id,
  colorText,
}: FeatureCardProps) {
  const [featureId] = useRecoilState(featureIdAtom)
  return (
    <motion.div
      className={cx('cardWrapper', colorText, {
        isInView: parentView && featureId === id,
      })}
    >
      {colorText}
    </motion.div>
  )
}
