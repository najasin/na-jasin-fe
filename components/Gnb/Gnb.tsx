'use client'

import { useRef } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import styles from './Gnb.module.scss'

export default function Gnb() {
  const user = false
  const router = useRouter()
  const navRef = useRef(null)

  const handleSignOut = () => {
    router.push('/signout')
  }

  return (
    <nav ref={navRef} className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Link href="/">
            <div className={styles.logo}>
              <Image
                fill={true}
                src="/images/logo.png"
                alt="La Jasin Logo"
                priority={true}
              />
            </div>
          </Link>
        </div>
        <div className={styles.right}>
          {!user ? (
            <>
              <Link href="/signin">
                <h2>로그인</h2>
              </Link>
            </>
          ) : (
            <>
              <button className={styles.logoutBtn} onClick={handleSignOut}>
                <h2>로그아웃</h2>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
