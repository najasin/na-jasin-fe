'use client'

import { useEffect, useRef, useState } from 'react'

import classNames from 'classnames/bind'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

import ImageCard from './imageCard'
import IMAGES from './imageCard.models'
import styles from './imageSection.module.scss'

const cx = classNames.bind(styles)

export default function ImageSection() {
  const targetRef = useRef<HTMLDivElement | null>(null)

  const isInView = useInView(targetRef, {
    margin: '0px 0px 0px 0px',
  })

  const [opacity, setOpacity] = useState(0)

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  })

  const img1Bottom = useTransform(
    scrollYProgress,
    IMAGES[0].bottom.btInput,
    IMAGES[0].bottom.btOutput,
  )
  const img1Right = useTransform(
    scrollYProgress,
    IMAGES[0].right.btInput,
    IMAGES[0].right.btOutput,
  )
  const img1MarginLength = useTransform(
    scrollYProgress,
    IMAGES[0].marginLength.btInput,
    IMAGES[0].marginLength.btOutput,
  )
  const img1Rotate = useTransform(
    scrollYProgress,
    IMAGES[0].rotate.btInput,
    IMAGES[0].rotate.btOutput,
  )

  const img2Bottom = useTransform(
    scrollYProgress,
    IMAGES[1].bottom.btInput,
    IMAGES[1].bottom.btOutput,
  )
  const img2Right = useTransform(
    scrollYProgress,
    IMAGES[1].right.btInput,
    IMAGES[1].right.btOutput,
  )
  const img2MarginLength = useTransform(
    scrollYProgress,
    IMAGES[1].marginLength.btInput,
    IMAGES[1].marginLength.btOutput,
  )
  const img2Rotate = useTransform(
    scrollYProgress,
    IMAGES[1].rotate.btInput,
    IMAGES[1].rotate.btOutput,
  )

  const img3Bottom = useTransform(
    scrollYProgress,
    IMAGES[2].bottom.btInput,
    IMAGES[2].bottom.btOutput,
  )
  const img3Right = useTransform(
    scrollYProgress,
    IMAGES[2].right.btInput,
    IMAGES[2].right.btOutput,
  )
  const img3MarginLength = useTransform(
    scrollYProgress,
    IMAGES[2].marginLength.btInput,
    IMAGES[2].marginLength.btOutput,
  )
  const img3Rotate = useTransform(
    scrollYProgress,
    IMAGES[2].rotate.btInput,
    IMAGES[2].rotate.btOutput,
  )

  const img4Bottom = useTransform(
    scrollYProgress,
    IMAGES[3].bottom.btInput,
    IMAGES[3].bottom.btOutput,
  )
  const img4Right = useTransform(
    scrollYProgress,
    IMAGES[3].right.btInput,
    IMAGES[3].right.btOutput,
  )
  const img4MarginLength = useTransform(
    scrollYProgress,
    IMAGES[3].marginLength.btInput,
    IMAGES[3].marginLength.btOutput,
  )
  const img4Rotate = useTransform(
    scrollYProgress,
    IMAGES[3].rotate.btInput,
    IMAGES[3].rotate.btOutput,
  )

  const img5Bottom = useTransform(
    scrollYProgress,
    IMAGES[4].bottom.btInput,
    IMAGES[4].bottom.btOutput,
  )
  const img5Right = useTransform(
    scrollYProgress,
    IMAGES[4].right.btInput,
    IMAGES[4].right.btOutput,
  )
  const img5MarginLength = useTransform(
    scrollYProgress,
    IMAGES[4].marginLength.btInput,
    IMAGES[4].marginLength.btOutput,
  )
  const img5Rotate = useTransform(
    scrollYProgress,
    IMAGES[4].rotate.btInput,
    IMAGES[4].rotate.btOutput,
  )

  useEffect(() => {
    console.log(isInView)
    if (isInView) {
      setOpacity(1)
    } else {
      setOpacity(0)
    }
  }, [isInView])

  return (
    <motion.div
      ref={targetRef}
      className={cx('sectionWrapper')}
      style={{ opacity, transition: 'all 0.7s ease' }}
    >
      <ImageCard
        backgroundColor="#9747FF"
        id="purple"
        bottom={img1Bottom}
        right={img1Right}
        marginBottom={img1MarginLength}
        marginRight={img1MarginLength}
        rotate={img1Rotate}
      />
      <ImageCard
        backgroundColor="#D07E97"
        id="pink"
        bottom={img2Bottom}
        right={img2Right}
        marginBottom={img2MarginLength}
        marginRight={img2MarginLength}
        rotate={img2Rotate}
      />
      <ImageCard
        backgroundColor="#FFE812"
        id="yellow"
        bottom={img3Bottom}
        right={img3Right}
        marginBottom={img3MarginLength}
        marginRight={img3MarginLength}
        rotate={img3Rotate}
      />
      <ImageCard
        backgroundColor="#2A47A9"
        id="blue"
        bottom={img4Bottom}
        right={img4Right}
        marginBottom={img4MarginLength}
        marginRight={img4MarginLength}
        rotate={img4Rotate}
      />
      <ImageCard
        backgroundColor="#208122"
        id="green"
        bottom={img5Bottom}
        right={img5Right}
        marginBottom={img5MarginLength}
        marginRight={img5MarginLength}
        rotate={img5Rotate}
      />
    </motion.div>
  )
}
