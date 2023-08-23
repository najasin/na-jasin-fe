'use client'

import classNames from 'classnames/bind'
import { deleteCookie } from 'cookies-next'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { logout } from '@/api/axios/requestHandler/auth/post.apis'

import { UserType } from '@/types/user.enum'

import { btnTextHelpers, userTypeHelpers } from './gnb.helpers'
import styles from './gnb.module.scss'
import GnbChip from './gnbChip'
import { GnbChipStyle } from './gnbChip.types'

const cx = classNames.bind(styles)

export default function GnbRight({ isLog }: { isLog: boolean }) {
  const router = useRouter()
  const pathname = usePathname()
  const currentBtnText = btnTextHelpers(pathname, isLog)

  const user = {
    userType: userTypeHelpers(pathname),
  }

  const handleSignOut = async () => {
    try {
      const res = await logout()

      if (res === null) {
        deleteCookie('act')
        deleteCookie('rft')
        deleteCookie('uid')
        deleteCookie('utp')

        router.push('/')
      }
    } catch (err) {
      throw new Error()
    }
  }

  return (
    <div className={cx('right')}>
      {currentBtnText === '로그인' && (
        <Link href="/" className={cx('login')}>
          <h2>로그인</h2>
        </Link>
      )}
      {currentBtnText === '' && <></>}
      {currentBtnText === '로그아웃' && (
        <>
          {user.userType === UserType.FORFUN && (
            <span className={cx('gnbChip')}>
              <GnbChip style={GnbChipStyle.LIGHTBLUE}>For Fun</GnbChip>
            </span>
          )}
          {user.userType === UserType.FORDEV && (
            <span className={cx('gnbChip')}>
              <GnbChip style={GnbChipStyle.DEEPBLUE}>For Dev</GnbChip>
            </span>
          )}
          <button className={cx('logout')} onClick={handleSignOut}>
            <h2>로그아웃</h2>
          </button>
        </>
      )}
    </div>
  )
}
