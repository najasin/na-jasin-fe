import React from 'react'

import classNames from 'classnames/bind'

import Image from 'next/image'

import styles from './characterBox.module.scss'
import { ISelectedCharacter } from './characterBox.types'

const cx = classNames.bind(styles)
export default function CharacterBox(props: ISelectedCharacter) {
  return (
    <div className={cx('wrap')}>
      {props?.baseImage && (
        <Image
          className={cx('img')}
          src={props.baseImage}
          alt="base image"
          fill={true}
        />
      )}
    </div>
  )
}
