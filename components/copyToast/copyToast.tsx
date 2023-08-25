'use client'

import { useState } from 'react'

import classNames from 'classnames/bind'

import Image from 'next/image'

import styles from './copyToast.module.scss'
import ICopyToast from './copyToast.types'

const cx = classNames.bind(styles)

export default function CopyToast({
  type = 'success',
  onClose,
  title = type === 'success' ? 'Success' : 'Error',
  subtitle = type === 'success' ? '요청에 성공했습니다' : '요청에 실패했습니다',
}: ICopyToast) {
  const [isVisible, setIsVisible] = useState(true)

  const handleCloseToast = () => {
    setIsVisible(false)
    if (onClose) onClose()
  }

  if (!isVisible) {
    return null
  }
  return (
    <div className={cx('copyToast', type)}>
      {type === 'error' && (
        <Image
          className={cx('close')}
          src="/images/close.svg"
          width={20}
          height={20}
          alt="Close Icon"
          onClick={handleCloseToast}
        />
      )}
      <div className={cx('left')}>
        <div className={cx('heading')}>{title}</div>
        <div className={cx('content')}>{subtitle}</div>
      </div>
    </div>
  )
}
