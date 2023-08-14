import React from 'react'

import classNames from 'classnames/bind'

import Image from 'next/image'

import styles from './characterBox.module.scss'
import { ISelectedCharacter } from './characterBox.types'

const cx = classNames.bind(styles)

export default function CharacterBox({
  baseImage,
  selectedItems,
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
          {'face' in selectedItems && selectedItems.face && (
            <Image
              className={cx('img')}
              src={selectedItems.face}
              alt="face item"
              priority={true}
              fill={true}
            />
          )}
          {'body' in selectedItems && selectedItems.body && (
            <Image
              className={cx('img')}
              src={selectedItems.body}
              alt="body item"
              fill={true}
              priority={true}
            />
          )}
          {'expression' in selectedItems && selectedItems.expression && (
            <Image
              className={cx('img')}
              src={selectedItems.expression}
              alt="expression item"
              fill={true}
              priority={true}
            />
          )}
          {'set' in selectedItems && selectedItems.set && (
            <Image
              className={cx('img')}
              src={selectedItems.set}
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
