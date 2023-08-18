import { useEffect, useState } from 'react'

import classNames from 'classnames/bind'
import { createPortal } from 'react-dom'

import styles from './modalPortal.module.scss'

const cx = classNames.bind(styles)

export default function ModalPortal({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    if (mounted) {
      document.body.classList.add(styles.modalOpen)
      return () => {
        document.body.classList.remove(styles.modalOpen)
      }
    }
  }, [mounted])

  if (typeof window === 'undefined') return <></>

  const modal = (
    <div className={cx('modalRoot')}>
      <div className={cx('modalPortal')}>{children}</div>
    </div>
  )

  return mounted ? (
    createPortal(modal, document.getElementById('modal-root') as HTMLElement)
  ) : (
    <></>
  )
}
