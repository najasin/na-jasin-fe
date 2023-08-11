'use client'

import Image from 'next/image'
import Link from 'next/link'

import { UserType } from '@/types/user.enum'

import styles from './Gnb.module.scss'
import GnbChip from './gnbChip'
import { GnbChipStyle } from './gnbChip.types'

export default function Gnb() {
  const user = {
    userId: 'id',
    userType: 'forFun',
  }

  const handleSignOut = () => {
    console.log('로그아웃됨')
  }

  return (
    <nav className={styles.wrapper}>
      <div className={styles.container}>
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
