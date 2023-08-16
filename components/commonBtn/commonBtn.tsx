'use client'

import classNames from 'classnames/bind'

import styles from './commonBtn.module.scss'
import { ButtonStyle, CommonBtnProps } from './commonBtn.types'

const cx = classNames.bind(styles)

export default function CommonBtn({
  type = 'submit',
  style = ButtonStyle.ACTIVE,
  onClick,

  children,
}: CommonBtnProps) {
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
