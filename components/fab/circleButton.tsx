'use client'

import { useEffect } from 'react'

import classNames from 'classnames/bind'

import Image from 'next/image'
import { useParams, useSearchParams } from 'next/navigation'

import { CircleButtonProps } from '@/components/fab/circleButton.types'

import createKaKaoShareButton from '@/services/kakao.helpers'

import styles from './circleButton.module.scss'

const cx = classNames.bind(styles)

export default function CircleButton({
  id,
  name,
  size = 'md',
  image,
  text,
  action,
  transparent,
  onClick,
}: CircleButtonProps) {
  const { userType } = useParams()
  const userId = useSearchParams().get('userId')
  const shareUrl = `na-jasin.com/${userType}/others-manual?userId=${userId}`
  const imageUrl = `/images/${image}.svg`

  useEffect(() => {
    if (id === 'kakao-link-btn') {
      createKaKaoShareButton(shareUrl)
    }
  })

  return (
    <button
      id={id}
      type="button"
      className={cx(
        'circleBtn',
        size,
        image,
        name,
        action && 'action',
        transparent && 'blank',
      )}
      onClick={onClick}
    >
      {text && <p>{text}</p>}
      {image && (
        <Image
          src={imageUrl}
          alt={name}
          width={30}
          height={30}
          className={cx(`${image}Img`)}
        />
      )}
    </button>
  )
}
