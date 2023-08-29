'use client'

import classNames from 'classnames/bind'
import { getCookie } from 'cookies-next'

import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import useBreakpoint from '@/hooks/useBreakpoint.hooks'
import useScrolledState from '@/hooks/useScrolledState'

import styles from './gnb.module.scss'

const cx = classNames.bind(styles)

export default function Gnb({ children }: { children: React.ReactNode }) {
  const isTablet = useBreakpoint({ query: '(max-width: 1199px)' })
  const router = useRouter()
  const scrolled = useScrolledState()

  const pathname = usePathname()

  return (
    <nav className={cx('gnbWrapper', { hasBorder: !isTablet }, { scrolled })}>
      <div className={styles.gnbContainer}>
        <div className={styles.left}>
          <button
            type="button"
            onClick={() => {
              if (pathname.includes('our-story')) {
                router.push('/')
              } else if (getCookie('act') || getCookie('rft')) {
                router.push('/our-story')
              } else {
                router.push('/')
              }
            }}
          >
            <h1 className={styles.logo}>
              <Image
                fill={true}
                src="/images/logo2.png"
                alt="La Jasin Logo"
                priority={true}
              />
            </h1>
          </button>
        </div>
        {children}
      </div>
    </nav>
  )
}
