'use client'

import classNames from 'classnames/bind'
import { useMediaQuery } from 'react-responsive'

import { hsYuji } from '@/styles/local.fonts'

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
  const isMobile: boolean = useMediaQuery({
    query: '(max-width:767px)',
  })
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
        style={{ paddingTop: isMobile ? '10px' : `${paddingTop}px` }}
      >
        {children}
      </div>
    </div>
  )
}
