'use client'

import classNames from 'classnames/bind'
import { motion } from 'framer-motion'

import Image from 'next/image'

import styles from './imageLoader.module.scss'
import ImageLoaderWrapper from './imageLoaderWrapper'

const cx = classNames.bind(styles)

export default function ImageLoader() {
  return (
    <ImageLoaderWrapper id="loader-portal">
      <motion.div
        initial={{ y: 20 }}
        animate={{
          y: [0, -10, 0],
          transition: { duration: 1, repeat: Infinity },
        }}
        className={cx('imgContainer')}
      >
        <Image
          width={180}
          height={200}
          src="/images/loading-mock-img.svg"
          alt="loading mock img"
          className={cx('img')}
        />
      </motion.div>
    </ImageLoaderWrapper>
  )
}
