'use client'

import { useEffect, useRef } from 'react'

import classNames from 'classnames/bind'
import { motion, useAnimation, useInView } from 'framer-motion'

import Link from 'next/link'

import styles from './ourPortalToSignin.module.scss'

const cx = classNames.bind(styles)

export default function OurPortalToSignin() {
  const targetRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(targetRef, {
    margin: '0px 0px 0px 0px',
  })

  const controls = useAnimation()

  // 애니메이션을 정의합니다.
  const animateIn = {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  }

  const animateOut = {
    y: 50,
    opacity: 0,
  }

  // isInView 값이 변경되면 애니메이션을 재생합니다.
  useEffect(() => {
    if (isInView) {
      controls.start(animateIn)
    } else {
      controls.start(animateOut)
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={targetRef}
      style={{ position: 'relative', width: '100%', height: '100vh' }}
    >
      <div style={{ height: '100vh', width: '64px' }} />
      {/* {isInView && ( */}
      <motion.div
        className={cx('ourPortalWrapper')}
        initial={animateOut}
        animate={controls}
        style={{
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <h1 className={cx('ourPortalText')}>나-자신으로 나를 설명해보세요</h1>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Link href="/" className={cx('ourPortalBtn')}>
            로그인하러 가기
          </Link>
        </motion.div>
      </motion.div>
      {/* )} */}
    </motion.div>
  )
}
