'use client'

import classNames from 'classnames/bind'
import { motion } from 'framer-motion'

import Image from 'next/image'

import styles from './ghostBtn.module.scss'
import { IGhostBtnProps } from './ghostBtn.types'

const cx = classNames.bind(styles)

export default function GhostBtn({ type = 'button', onClick }: IGhostBtnProps) {
  return (
    <motion.button
      className={cx('button')}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      type={type}
    >
      <Image src="/images/ghost-btn.png" alt="Ghost Btn" fill={true} />
    </motion.button>
  )
}
