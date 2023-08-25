'use client'

import { useState } from 'react'

import classNames from 'classnames/bind'

import Image from 'next/image'

import styles from './copyToast.module.scss'
import ICopyToast from './copyToast.types'

const cx = classNames.bind(styles)

export default function CopyToast({
  type = 'success',
  title = type === 'success' ? 'Success' : 'Error',
  subtitle = type === 'success' ? '요청에 성공했습니다' : '요청에 실패했습니다',
}: ICopyToast) {
  const [isVisible, setIsVisible] = useState(true)

  const handleCloseToast = () => {
    setIsVisible(false)
  }

  if (!isVisible) {
    return null
  }
  return (
    <div className={cx('copyToast', type)}>
      <Image
        className={cx('close')}
        src="/images/close.svg"
        width={20}
        height={20}
        alt="Close Icon"
        onClick={handleCloseToast}
      />
      <div className={cx('left')}>
        {type === 'success' ? (
          <Image
            className={cx('check')}
            src="/images/check.png"
            width={20}
            height={20}
            alt="Check Icon"
          />
        ) : (
          <Image
            className={cx('error')}
            src="/images/error.png"
            width={20}
            height={20}
            alt="Error Icon"
          />
        )}
        <div className={cx('description')}>
          <p className={cx('heading')}>{title}</p>
          <p className={cx('content')}>{subtitle}</p>
        </div>
      </div>
    </div>
  )
}
