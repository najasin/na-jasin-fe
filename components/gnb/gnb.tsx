'use client'

import classNames from 'classnames/bind'
import { getCookie } from 'cookies-next'

import Image from 'next/image'
import Link from 'next/link'

import useBreakpoint from '@/hooks/useBreakpoint.hooks'
import useScrolledState from '@/hooks/useScrolledState'

import styles from './gnb.module.scss'

const cx = classNames.bind(styles)

export default function Gnb({ children }: { children: React.ReactNode }) {
  const isTablet = useBreakpoint({ query: '(max-width: 1199px)' })
  const scrolled = useScrolledState()

  const act = getCookie('act')
  const rft = getCookie('rft')

  const href = act || rft ? '/our-story' : '/'

  return (
    <nav className={cx('gnbWrapper', { hasBorder: !isTablet }, { scrolled })}>
      <div className={styles.gnbContainer}>
        <div className={styles.left}>
          <Link href={href}>
            <button type="button">
              <h1 className={styles.logo}>
                <Image
                  fill={true}
                  src="/images/logo.png"
                  alt="La Jasin Logo"
                  priority={true}
                />
              </h1>
            </button>
          </Link>
        </div>
        {children}
      </div>
    </nav>
  )
}
