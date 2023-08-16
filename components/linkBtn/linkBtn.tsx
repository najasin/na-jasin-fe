'use client'

import classNames from 'classnames/bind'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import styles from './linkBtn.module.scss'

const cx = classNames.bind(styles)

export default function LinkBtn() {
  const router = useRouter()

  const handleClick = () => {
    router.push('/df/my-page')
  }
  return (
    <button onClick={handleClick} className={cx('linkBtn')}>
      <div>For Dev도 사용해 볼까?</div>
      <Image src="/images/arrow.svg" width={18.04} height={18.04} alt="arrow" />
    </button>
  )
}
