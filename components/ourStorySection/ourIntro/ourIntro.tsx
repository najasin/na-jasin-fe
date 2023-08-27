'use client'

import { useRef } from 'react'

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
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -75])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])
  const position = useTransform(scrollYProgress, (pos) =>
    pos >= 0.7 ? 'relative' : 'fixed',
  )

  const text = '너가 모르는 너 사용법을 알려줄게'
  // const words = text.split(' ') // 단어 단위 애니메이션
  const letters = Array.from(text) // 글자 단위 애니메이션

  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.04 * i,
      },
    }),
  }

  const textChildVariants = {
    visible: {
      opacity: 1,
      // y: 0,
      x: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      // y: -20,
      x: -10,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  }

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
        <motion.p
          className={cx('heroTitle')}
          variants={textContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* {words.map((word, index) => ( */}
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              // style={{ marginRight: '10px' }}
              variants={textChildVariants}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
