'use client'

import classNames from 'classnames/bind'
import { ButtonStyle } from '@/types/enums/commonBtn.enum'

import styles from './CommonBtn.module.scss'

const cx = classNames.bind(styles)

type ClickHandler = (e: React.MouseEvent) => void

interface ICommonBtnProps {
  type?: 'button' | 'submit'
  style?: ButtonStyle
  children: React.ReactNode
  onClick?: ClickHandler | undefined
}

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
