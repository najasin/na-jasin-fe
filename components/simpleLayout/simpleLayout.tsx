import classNames from 'classnames/bind'

import styles from './simpleLayout.module.scss'
import { SimpleLayoutProps } from './simpleLayout.types'

const cx = classNames.bind(styles)

export default function SimpleLayout({
  title,
  btnComponent,
  margin,
  children,
}: SimpleLayoutProps) {
  const hasBtn = !!btnComponent

  return (
    <div className={styles.simpleLayout}>
      <div className={styles.contentsWrapper}>
        <div className={styles.titleWrapper} style={{ marginBottom: margin }}>
          <div className={styles.button}>{btnComponent}</div>
          <h2 className={cx('title', { hasBtn })}>{title}</h2>
        </div>
        {children}
      </div>
    </div>
  )
}
