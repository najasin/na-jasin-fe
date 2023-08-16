'use client'

import classNames from 'classnames/bind'
import { motion } from 'framer-motion'

import styles from './circleBtn.module.scss'
import { ICircleBtnProps } from './circleBtn.types'

const cx = classNames.bind(styles)

export default function CircleBtn({
  type = 'submit',
  onClick,
  children,
}: ICircleBtnProps) {
  return (
    <motion.button
      className={cx('button')}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      type={type}
    >
      {children}
    </motion.button>
  )
}
