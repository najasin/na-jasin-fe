'use client'

import classNames from 'classnames/bind'

import { hsYuji } from '@/styles/local.fonts'

import useBreakpoint from '@/hooks/useBreakpoint.hooks'

import BackBtn from './backBtn'
import styles from './formBox.module.scss'
import { FormBoxProps } from './formBox.types'

const cx = classNames.bind(styles)

export default function FormBox({
  title,
  children,
  showBack = true,
  onBackClick,
  paddingTop = 23,
}: FormBoxProps) {
  const isMobile: boolean = useBreakpoint({ query: '(max-width: 767px)' })
  const paddingTopValue = isMobile ? '10px' : `${paddingTop}px`
  return (
    <div className={styles.formBoxWrapper}>
      <div className={styles.titleWrapper}>
        <div className={styles.backBtn}>
          {showBack && <BackBtn onClick={onBackClick} />}
        </div>
        <h2 className={cx('title', hsYuji.className)}>{title}</h2>
      </div>
      <div
        className={styles.itemWrapper}
        style={{ paddingTop: paddingTopValue }}
      >
        {children}
      </div>
    </div>
  )
}
