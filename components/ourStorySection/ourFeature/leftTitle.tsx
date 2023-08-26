'use client'

import { useEffect, useRef, useState } from 'react'

import classNames from 'classnames/bind'
import { motion } from 'framer-motion'
import { useRecoilState } from 'recoil'

import { featureIdAtom } from '../shared/store/featureStore.store'
import styles from './leftTitle.module.scss'

const cx = classNames.bind(styles)

interface IFeatureTitleProps {
  children: React.ReactNode
  id: string
  text: string
}

export default function LeftTitle({ children, id, text }: IFeatureTitleProps) {
  const [featureId] = useRecoilState(featureIdAtom)

  const targetRef = useRef<HTMLLIElement>(null)
  const [opacity, setOpacity] = useState(0)
  const [y, setY] = useState(-35)

  useEffect(() => {
    if (featureId === id) {
      setOpacity(1)
      setY(0)
    } else {
      setOpacity(0)
      setY(-35)
    }
  }, [featureId, id])

  return (
    <motion.li
      ref={targetRef}
      className={cx('leftTitleWrapper')}
      style={{ y, opacity, transition: 'all 0.7s ease' }}
    >
      <motion.h1 className={cx('leftTitle')}>{children}</motion.h1>
      <p className={cx('leftText')}>{text}</p>
    </motion.li>
  )
}
