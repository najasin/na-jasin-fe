'use client'

import classNames from 'classnames/bind'

import Image from 'next/image'
import Link from 'next/link'

import useBreakpoint from '@/hooks/useBreakpoint.hooks'
import useScrolledState from '@/hooks/useScrolledState'

import { UserType } from '@/types/user.enum'

import styles from './gnb.module.scss'
import GnbChip from './gnbChip'
import { GnbChipStyle } from './gnbChip.types'

const cx = classNames.bind(styles)

export default function Gnb() {
  const isTablet = useBreakpoint({ query: '(max-width: 1199px)' })
  const scrolled = useScrolledState()

  const user = {
    userId: 'id',
    userType: 'forFun',
  }

  const handleSignOut = () => {
    console.log('로그아웃됨')
  }

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
        <div className={styles.right}>
          {!user.userId ? (
            <Link href="/signin" className={styles.login}>
              <h2>로그인</h2>
            </Link>
          ) : (
            <>
              {user.userType === UserType.FORFUN && (
                <span className={styles.gnbChip}>
                  <GnbChip style={GnbChipStyle.LIGHTBLUE}>For Fun</GnbChip>
                </span>
              )}
              {user.userType === UserType.FORDEV && (
                <span className={styles.gnbChip}>
                  <GnbChip style={GnbChipStyle.DEEPBLUE}>For Dev</GnbChip>
                </span>
              )}
              <button className={styles.logout} onClick={handleSignOut}>
                <h2>로그아웃</h2>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
