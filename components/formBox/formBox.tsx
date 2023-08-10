import Link from 'next/link'

import styles from './formBox.module.scss'
import { FormBoxProps } from './formBox.types'

export default function FormBox({
  title,
  children,
  backComponent,
}: FormBoxProps) {
  return (
    <div className={styles.formBoxWrapper}>
      <div className={styles.titleWrapper}>
        <Link href="/">
          <div className={styles.back}>{backComponent}</div>
        </Link>
        <h2 className={styles.title}>{title}</h2>
      </div>
      {children}
      {/* <form className={styles.itemWrapper}>
        {children}
        <div className={styles.button}>{buttonComponent}</div>
      </form> */}
    </div>
  )
}
