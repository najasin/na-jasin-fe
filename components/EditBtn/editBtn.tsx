'use client'

import Image from 'next/image'

import styles from './editBtn.module.scss'
import { EditBtnProps } from './editBtn.types'

export default function EditBtn({ onClick = undefined }: EditBtnProps) {
  return (
    <button type="button" className={styles.editBtn} onClick={onClick}>
      <Image src="/images/edit.svg" alt="Edit Button" width={20} height={20} />
    </button>
  )
}
