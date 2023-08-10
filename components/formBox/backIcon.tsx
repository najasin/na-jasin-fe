import Image from 'next/image'

import styles from './backIcon.module.scss'
import { BackIconProps } from './backIcon.types'

export default function BackIcon({ onClick }: BackIconProps) {
  return (
    <Image
      src="/images/back.svg"
      width={20}
      height={20}
      alt="Back Icon"
      onClick={onClick}
      className={styles.backIcon}
    />
  )
}
