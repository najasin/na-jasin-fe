'use client'

import classNames from 'classnames/bind'

import { ButtonStyle } from '@/components/commonBtn/commonBtn.types'

import styles from './keywordBtn.module.scss'
import { IKeywordBtnProps } from './keywordBtn.types'

const cx = classNames.bind(styles)

export default function KeywordBtn({
  type = 'submit',
  style = ButtonStyle.DEACTIVE,
  onClick,
  children,
}: IKeywordBtnProps) {
  return (
    <button type={type} className={cx('button', `${style}`)} onClick={onClick}>
      {children}
    </button>
  )
}
