'use client'

import { useEffect, useRef, useState } from 'react'

import classNames from 'classnames/bind'
import { motion, useInView } from 'framer-motion'
import { useRecoilState } from 'recoil'

import { featureIdAtom } from '../shared/store/featureStore.store'
import styles from './featureTitle.module.scss'

const cx = classNames.bind(styles)

interface IFeatureTitleProps {
  id: string
  title: string
  text: string
}

export default function FeatureTitle({ id, title, text }: IFeatureTitleProps) {
  const [, setFeatureId] = useRecoilState(featureIdAtom)

  const targetRef = useRef<HTMLHeadingElement>(null)
  const [opacity, setOpacity] = useState(1)

  const isInView = useInView(targetRef, {
    margin: '0px 0px 0px 0px',
  })

  useEffect(() => {
    if (isInView) {
      setFeatureId(id)
      setOpacity(1)
    } else {
      setOpacity(0)
    }
  }, [isInView, setFeatureId, id])

  return (
    <motion.li
      className={cx('titleWrapper')}
      style={{ opacity, transition: 'all 0.7s ease' }}
    >
      <motion.h1
        ref={targetRef}
        className={cx('title', {
          currentColor: isInView,
        })}
      >
        {title}
      </motion.h1>
      <p className={cx('text')}>{text}</p>
    </motion.li>
  )
}
