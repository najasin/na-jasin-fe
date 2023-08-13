import React from 'react'

import classNames from 'classnames/bind'

import Image from 'next/image'

import styles from './characterBox.module.scss'
import { ISelectedCharacter } from './characterBox.types'

const cx = classNames.bind(styles)

export default function CharacterBox({
  baseImage,
  characterItems,
}: ISelectedCharacter) {
  return (
    <div className={cx('wrap')}>
      {baseImage && (
        <>
          <Image
            className={cx('img')}
            src={baseImage}
            alt="base image"
            fill={true}
            priority={true}
          />
          {'face' in characterItems && characterItems.face && (
            <Image
              className={cx('item')}
              src={characterItems.face}
              alt="face item"
              priority={true}
              fill={true}
            />
          )}
          {'body' in characterItems && characterItems.body && (
            <Image
              className={cx('item')}
              src={characterItems.body}
              alt="body item"
              fill={true}
              priority={true}
            />
          )}
          {'expression' in characterItems && characterItems.expression && (
            <Image
              className={cx('item')}
              src={characterItems.expression}
              alt="expression item"
              fill={true}
              priority={true}
            />
          )}
          {'set' in characterItems && characterItems.set && (
            <Image
              className={cx('item')}
              src={characterItems.set}
              alt="set item"
              fill={true}
              priority={true}
            />
          )}
        </>
      )}
    </div>
  )
}
