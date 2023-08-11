import Image from 'next/image'

import styles from './backBtn.module.scss'
import { BackBtnProps } from './backBtn.types'

export default function BackBtn({ onClick }: BackBtnProps) {
  return (
    <button onClick={onClick} className={styles.backBtn}>
      <Image src="/images/back.svg" width={20} height={20} alt="Back Icon" />
    </button>
  )
}
