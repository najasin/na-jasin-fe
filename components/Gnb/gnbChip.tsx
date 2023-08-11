'use client'

import classNames from 'classnames/bind'

import styles from './gnbChip.module.scss'
import { GnbChipProps, GnbChipStyle } from './gnbChip.types'

const cx = classNames.bind(styles)

export default function GnbChip({
  type = 'submit',
  style = GnbChipStyle.LIGHTBLUE,
  onClick = undefined,
  children,
}: GnbChipProps) {
  return (
    <button type={type} className={cx('button', `${style}`)} onClick={onClick}>
      {children}
    </button>
  )
}
