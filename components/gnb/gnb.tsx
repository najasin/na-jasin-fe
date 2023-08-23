'use client'

import classNames from 'classnames/bind'

import Image from 'next/image'
import Link from 'next/link'

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
          <Link href="/">
            <h1 className={styles.logo}>
              <Image
                fill={true}
                src="/images/logo.png"
                alt="La Jasin Logo"
                priority={true}
              />
            </h1>
          </Link>
        </div>
        {children}
      </div>
    </nav>
  )
}
