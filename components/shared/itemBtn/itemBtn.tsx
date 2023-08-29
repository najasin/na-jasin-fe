'use client'

import classNames from 'classnames/bind'
import { motion } from 'framer-motion'

import { ButtonStyle } from '@/components/shared/commonBtn/commonBtn.types'

import styles from './itemBtn.module.scss'
import { IItemBtnProps } from './itemBtn.types'

const cx = classNames.bind(styles)

export default function ItemBtn({
  type = 'submit',
  style = ButtonStyle.ACTIVE,
  onClick = undefined,
  children,
}: IItemBtnProps) {
  return (
    <motion.button
      type={type}
      className={cx('button', `${style}`)}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {children}
    </motion.button>
  )
}
