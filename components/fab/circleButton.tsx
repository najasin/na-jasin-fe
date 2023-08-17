'use client'

import classNames from 'classnames/bind'

import Image from 'next/image'

import { CircleButtonProps } from '@/components/fab/circleButton.types'

import styles from './circleButton.module.scss'

const cx = classNames.bind(styles)

export default function CircleButton({
  name,
  size = 'md',
  image,
  text,
  transparent,
  onClick,
}: CircleButtonProps) {
  const imageUrl = `/images/${image}.svg`

  return (
    <button
      className={cx('circleBtn', size, image, name, transparent && 'blank')}
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
