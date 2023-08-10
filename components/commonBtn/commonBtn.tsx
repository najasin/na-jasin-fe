'use client'

import classNames from 'classnames/bind'

import styles from './CommonBtn.module.scss'
import { ButtonStyle, ICommonBtnProps } from './commonBtn.types'

const cx = classNames.bind(styles)

export default function CommonBtn({
  type = 'button',
  style = ButtonStyle.ACTIVE,
  onClick = undefined,
  children,
}: ICommonBtnProps) {
  return (
    <button
      type={type}
      className={cx('button', `${style}`)}
      onClick={onClick}
      disabled={style === ButtonStyle.DEACTIVE}
    >
      {children}
    </button>
  )
}
