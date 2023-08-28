'use client'

import classNames from 'classnames/bind'

import Image from 'next/image'

import useBreakpoint from '@/hooks/useBreakpoint.hooks'
import useScrolledState from '@/hooks/useScrolledState'

import styles from './gnb.module.scss'

const cx = classNames.bind(styles)

export default function Gnb({ children }: { children: React.ReactNode }) {
  const isTablet = useBreakpoint({ query: '(max-width: 1199px)' })
  const scrolled = useScrolledState()

  return (
    <nav className={cx('gnbWrapper', { hasBorder: !isTablet }, { scrolled })}>
      <div className={styles.gnbContainer}>
        <div className={styles.left}>
          {/* <Link href="/"> */}
          <button type="button" className={styles.button}>
            <h1 className={styles.logo}>
              <Image
                fill={true}
                src="/images/logo2.png"
                alt="La Jasin Logo"
                priority={true}
              />
            </h1>
          </button>
          {/* </Link> */}
        </div>
        {children}
      </div>
    </nav>
  )
}
