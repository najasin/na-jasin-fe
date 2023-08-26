'use client'

import { useEffect, useRef } from 'react'

import classNames from 'classnames/bind'
import { motion, useScroll, useTransform } from 'framer-motion'

import styles from './ourIntro.module.scss'

const cx = classNames.bind(styles)

export default function OurIntro() {
  const targetRef = useRef<HTMLDivElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['end end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -200])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const position = useTransform(scrollYProgress, (pos) =>
    pos >= 0.7 ? 'relative' : 'fixed',
  )

  useEffect(() => {
    window.onbeforeunload = function pushRefresh() {
      window.scrollTo(0, 0)
    }
  }, [])

  return (
    <motion.div
      className={cx('wrapper')}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <motion.div
        ref={targetRef}
        style={{
          y,
          position,
          scale,
          opacity,
        }}
        className={cx('heroWrapper')}
      >
        <p className={cx('heroTitle')}>너가 모르는 너 사용법을 알려줄게</p>
      </motion.div>
    </motion.div>
  )
}
