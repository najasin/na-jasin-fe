import classNames from 'classnames/bind'

import Image from 'next/image'

import styles from './characterBox.module.scss'
import { ISelectedCharacter } from './characterBox.types'

const cx = classNames.bind(styles)

export default function CharacterBox({
  baseImage,
  selectedItems,
  editBtn,
  nickname,
}: ISelectedCharacter) {
  return (
    <div className={cx('wrap')}>
      {editBtn && (
        <div style={{ zIndex: 10 }} className={cx('editBtn')}>
          {editBtn}
        </div>
      )}
      {baseImage && (
        <>
          <div className={cx('character')}>
            <Image
              className={cx('img')}
              src={baseImage}
              alt="base image"
              fill={true}
              priority={true}
            />
            {selectedItems && (
              <>
                {'face' in selectedItems && selectedItems?.face && (
                  <Image
                    className={cx('img', 'face')}
                    src={selectedItems.face}
                    alt="face item"
                    priority={true}
                    fill={true}
                  />
                )}
                {'body' in selectedItems && selectedItems.body && (
                  <Image
                    className={cx('img', 'body')}
                    src={selectedItems.body}
                    alt="body item"
                    fill={true}
                    priority={true}
                  />
                )}
                {'expression' in selectedItems && selectedItems.expression && (
                  <Image
                    className={cx('img', 'expression')}
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
        </>
      )}
      {nickname && <div className={cx('nickname')}>{nickname}</div>}
    </div>
  )
}
