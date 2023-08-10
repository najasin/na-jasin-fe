'use client'

import Image from 'next/image'

import styles from './layoutBtn.module.scss'
import { LayoutBtnProps } from './layoutBtn.types'

export default function LayoutBtn({ children, onClick }: LayoutBtnProps) {
  return (
    <button type="button" onClick={onClick} className={styles.layoutBtn}>
      <div className={styles.title}>{children}</div>
      <Image
        src="/images/arrow.svg"
        className={styles.arrow}
        width={18}
        height={18}
        alt="arrow"
      />
    </button>
  )
}
