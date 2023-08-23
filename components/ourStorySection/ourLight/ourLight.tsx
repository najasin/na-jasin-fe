'use client'

import { useEffect, useRef } from 'react'

import classNames from 'classnames/bind'
import { motion } from 'framer-motion'

import styles from './ourLight.module.scss'

const cx = classNames.bind(styles)

export default function OurLight() {
  const targetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      if (!targetRef.current) return
      const { clientX, clientY } = e
      targetRef.current.style.setProperty('--x', `${clientX}px`)
      targetRef.current.style.setProperty('--y', `${clientY}px`)
    }

    window.addEventListener('mousemove', updateMousePosition)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
    }
  }, [])

  return (
    <motion.div ref={targetRef} className={cx('wrapper')}>
      ourLight
    </motion.div>
  )
}
