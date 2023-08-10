import styles from './simpleLayout.module.scss'
import { SimpleLayoutProps } from './simpleLayout.types'

export default function SimpleLayout({
  title,
  btnComponent,
  margin,
  children,
}: SimpleLayoutProps) {
  return (
    <div className={styles.simpleLayout}>
      <div className={styles.contentsWrapper}>
        <div className={styles.titleWrapper} style={{ marginBottom: margin }}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.button}>{btnComponent}</div>
        </div>
        {children}
      </div>
    </div>
  )
}
