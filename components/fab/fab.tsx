import { useState } from 'react'

import classNames from 'classnames/bind'
import { motion } from 'framer-motion'

import CircleButton from '@/components/fab/circleButton'

import styles from './fab.module.scss'

const cx = classNames.bind(styles)

export default function Fab() {
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
          // exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
          className={cx('buttons')}
        >
          <div>
            <div
              style={{ position: 'absolute', bottom: '52px', right: '94px' }}
            >
              <CircleButton name="facebook" image="facebook" size="sm" />
            </div>
            <div
              style={{ position: 'absolute', bottom: '110px', right: '94px' }}
            >
              <CircleButton name="kakao" image="kakao" size="sm" />
            </div>
            <div
              style={{ position: 'absolute', bottom: '165px', right: '71px' }}
            >
              <CircleButton name="instagram" image="instagram" size="sm" />
            </div>
            <div
              style={{ position: 'absolute', bottom: '182px', right: '10px' }}
            >
              <CircleButton name="link" image="link" size="sm" />
            </div>
          </div>
          <CircleButton
            name="text"
            text="꿀팁받기"
            transparent={true}
            size="md"
          />
        </motion.div>
      )}
      <motion.div
        animate={{ rotate: isClicked ? 45 : 0 }}
        className={cx('basic')}
      >
        <CircleButton
          name="plus"
          size="lg"
          image="plus"
          onClick={handleClick}
        />
      </motion.div>
    </div>
  )
}
