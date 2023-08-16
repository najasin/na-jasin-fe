'use client'

import { useEffect, useRef } from 'react'

import classNames from 'classnames/bind'
import { motion, useScroll, useTransform } from 'framer-motion'

import Image from 'next/image'

import styles from './ourIntro.module.scss'

const cx = classNames.bind(styles)

export default function OurIntro() {
  const targetRef = useRef<HTMLDivElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['end end', 'end start'],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
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
    <div className={cx('wrapper')}>
      <motion.div
        ref={targetRef}
        style={{
          position,
          scale,
          opacity,
        }}
        className={cx('heroWrapper')}
      >
        <p className={cx('heroTitle')}>너가 모르는 너 사용법을 알려줄게</p>
        <div className={cx('imgContainer')}>
          <Image
            width={220}
            height={450}
            src="/images/hero-mobile.png"
            alt="hero mobile"
          />
        </div>
      </motion.div>
    </div>
  )
}
