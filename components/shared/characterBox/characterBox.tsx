import classNames from 'classnames/bind'
import { AnimatePresence, motion } from 'framer-motion'

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
          <Image
            className={cx('img')}
            src={baseImage}
            alt="base image"
            fill={true}
            priority={true}
          />
          {selectedItems && (
            <AnimatePresence>
              {'body' in selectedItems && selectedItems.body && (
                <motion.div
                  key={selectedItems.body}
                  initial={{ opacity: 0 }} // 초기 상태
                  animate={{ opacity: 1 }} // 애니메이션 상태
                  transition={{ duration: 1 }} // 애니메이션 지속 시간                    className={cx('img', 'face')}
                >
                  <Image
                    className={cx('img', 'body')}
                    src={selectedItems.body}
                    alt="body item"
                    fill={true}
                    priority={true}
                  />
                </motion.div>
              )}
              {'face' in selectedItems && selectedItems?.face && (
                <motion.div
                  className={cx('img', 'face')}
                  key={selectedItems.face}
                  initial={{ opacity: 0 }} // 초기 상태
                  animate={{ opacity: 1 }} // 애니메이션 상태
                  transition={{ duration: 1 }} // 애니메이션 지속 시간
                >
                  <Image
                    src={selectedItems.face}
                    alt="face item"
                    priority={true}
                    fill={true}
                  />
                </motion.div>
              )}

              {'expression' in selectedItems && selectedItems.expression && (
                <motion.div
                  key={selectedItems.expression}
                  initial={{ opacity: 0 }} // 초기 상태
                  animate={{ opacity: 1 }} // 애니메이션 상태
                  transition={{ duration: 1 }} // 애니메이션 지속 시간
                >
                  <Image
                    className={cx('img', 'expression')}
                    src={selectedItems.expression}
                    alt="expression item"
                    fill={true}
                    priority={true}
                  />
                </motion.div>
              )}

              {'set' in selectedItems && selectedItems.set && (
                <motion.div
                  key={selectedItems.set}
                  initial={{ opacity: 0 }} // 초기 상태
                  animate={{ opacity: 1 }} // 애니메이션 상태
                  transition={{ duration: 1 }} // 애니메이션 지속 시간                    className={cx('img', 'face')}
                >
                  <Image
                    className={cx('img')}
                    src={selectedItems.set}
                    alt="set item"
                    fill={true}
                    priority={true}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </>
      )}
      {nickname && <div className={cx('nickname')}>{nickname}</div>}
    </div>
  )
}
