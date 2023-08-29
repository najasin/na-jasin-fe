'use client'

import Image from 'next/image'

import styles from './resetBtn.module.scss'
import { ResetBtnProps } from './resetBtn.types'

export default function ResetBtn({ onClick = undefined }: ResetBtnProps) {
  return (
    <button type="button" className={styles.resetBtn} onClick={onClick}>
      <Image
        src="/images/refresh.svg"
        alt="Reset Button"
        width={28}
        height={28}
      />
    </button>
  )
}
