'use client'

import { useEffect, useRef } from 'react'

import { motion, useAnimation, useInView } from 'framer-motion'

import MockRect from '../shared/mockRect'
import MockText from '../shared/mockText'

export default function NormalTextAndRect() {
  const targetRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(targetRef, { once: true })

  const mainControls = useAnimation()
  const slideControls = useAnimation()

  useEffect(() => {
    if (isInView) {
      // 애니메이션 시작
      mainControls.start('visible')
      slideControls.start('visible')
    }
  }, [isInView])

  return (
    <div ref={targetRef} style={{ position: 'relative' }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        // animate="visible"
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '50px',
            position: 'relative',
          }}
        >
          <MockText />
          <MockRect />
        </div>
      </motion.div>
      <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: '100%' },
        }}
        initial="hidden"
        animate={slideControls}
        transition={{ duration: 0.5, ease: 'easeIn' }}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          background: 'black',
          zIndex: 20,
        }}
      />
    </div>
  )
}
