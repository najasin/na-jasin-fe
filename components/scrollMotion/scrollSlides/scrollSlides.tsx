'use client'

import { useEffect, useRef, useState } from 'react'

import classNames from 'classnames/bind'
import { MotionProps, motion, useScroll, useTransform } from 'framer-motion'

import { throttleHelper } from '@/helpers/throttle.helpers'

import styles from './scrollSlides.module.scss'

const cx = classNames.bind(styles)

function useElementViewportPosition(ref: React.RefObject<HTMLElement>) {
  const [position, setPosition] = useState<[number, number]>([0, 0])

  useEffect(() => {
    if (!ref || !ref.current) return

    const pageHeight = document.body.scrollHeight
    const start = ref.current.offsetTop
    const end = start + ref.current.offsetHeight

    setPosition([start / pageHeight, end / pageHeight])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { position }
}

const slideAnimation: MotionProps = {
  variants: {
    full: { backgroundColor: '#663399' },
    partial: { backgroundColor: '#808080' },
  },
  initial: 'partial',
  whileInView: 'full',
  viewport: { amount: 1, once: true },
}

export default function ScrollSlides() {
  const ref = useRef<HTMLDivElement | null>(null)
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const { position } = useElementViewportPosition(ref)
  const [carouselEndPosition, setCarouselEndPosition] = useState(0)

  const { scrollYProgress } = useScroll()
  const x = useTransform(scrollYProgress, position, [0, carouselEndPosition])

  useEffect(() => {
    if (!carouselRef || !carouselRef.current) return
    const parent = carouselRef.current.parentElement
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth

    const resetCarouselEndPosition = () => {
      console.log(1)
      if (carouselRef && carouselRef.current) {
        const newPosition =
          carouselRef.current.clientWidth -
          window.innerWidth +
          scrollbarWidth +
          (parent as HTMLElement).offsetLeft * 2

        setCarouselEndPosition(-newPosition)
      }
    }

    resetCarouselEndPosition()

    const handleResize = throttleHelper(10, resetCarouselEndPosition)

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section ref={ref}>
      <div className={cx('container')} style={{ height: '300vh' }}>
        <div className={cx('stickyWrapper')}>
          <motion.div
            ref={carouselRef}
            className={cx('carousel')}
            style={{ x }}
          >
            {Array.from(Array(8).keys()).map((i) => (
              <motion.div
                {...slideAnimation}
                key={i}
                className={cx('carouselSlide')}
              >
                {i + 1}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
