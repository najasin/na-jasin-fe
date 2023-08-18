'use client'

import classNames from 'classnames/bind'

import styles from './circleBtn.module.scss'
import { ICircleBtnProps } from './circleBtn.types'

const cx = classNames.bind(styles)

export default function CircleBtn({
  type = 'submit',
  onClick,
  children,
}: ICircleBtnProps) {
  return (
    <button className={cx('button')} onClick={onClick} type={type}>
      {children}
    </button>
  )
}
