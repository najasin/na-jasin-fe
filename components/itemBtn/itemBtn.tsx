'use client'

import classNames from 'classnames/bind'

import { ButtonStyle } from '@/components/commonBtn/commonBtn.types'

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
