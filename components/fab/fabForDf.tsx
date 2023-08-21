import { useState } from 'react'

import classNames from 'classnames/bind'
import { motion } from 'framer-motion'

import CircleButton from '@/components/fab/circleButton'

import styles from './fabForDf.module.scss'

const cx = classNames.bind(styles)

export default function FabWithDef() {
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    setIsClicked(!isClicked)
  }

  return (
    <div className={cx('fab')}>
      {isClicked && (
        <motion.div
          // initial={{ opacity: 0, y: -10 }}
          // animate={{ opacity: 1, y: 0 }}
          // // exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
          className={cx('buttons')}
        >
          <div>
            <div className={cx('absolute', 'facebook')}>
              <CircleButton name="facebook" image="facebook" size="sm" />
            </div>
            <div className={cx('absolute', 'kakao')}>
              <CircleButton name="kakao" image="kakao" size="sm" />
            </div>
            <div className={cx('absolute', 'instagram')}>
              <CircleButton name="instagram" image="instagram" size="sm" />
            </div>
            <div className={cx('absolute', 'link')}>
              <CircleButton name="link" image="link" size="sm" />
            </div>
          </div>
          <div className={cx('mdButtons')}>
            <CircleButton
              name="share"
              text="꿀팁받기"
              transparent={true}
              size="md"
            />
            <CircleButton
              name="weakness"
              text="단점보기"
              transparent={true}
              size="md"
            />
          </div>
        </motion.div>
      )}
      <motion.div
        animate={{ rotate: isClicked ? 45 : 0 }}
        className={cx('basic')}
      >
        <div className={cx('baseBtn')}>
          <CircleButton
            name="plus"
            size="lg"
            image="plus"
            onClick={handleClick}
          />
        </div>
      </motion.div>
    </div>
  )
}
