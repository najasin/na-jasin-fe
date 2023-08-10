import { useState } from 'react'

import classNames from 'classnames/bind'
import { motion } from 'framer-motion'

import CircleButton from '@/components/fab/circleButton'

import styles from './fab.module.scss'

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
            <div
              style={{ position: 'absolute', bottom: '109px', right: '94px' }}
            >
              <CircleButton name="facebook" image="facebook" size="sm" />
            </div>
            <div
              style={{ position: 'absolute', bottom: '174px', right: '94px' }}
            >
              <CircleButton name="kakao" image="kakao" size="sm" />
            </div>
            <div
              style={{ position: 'absolute', bottom: '236px', right: '71px' }}
            >
              <CircleButton name="instagram" image="instagram" size="sm" />
            </div>
            <div
              style={{ position: 'absolute', bottom: '261px', right: '10px' }}
            >
              <CircleButton name="link" image="link" size="sm" />
            </div>
          </div>
          <div className={cx('mdButtons')}>
            <CircleButton
              name="text"
              text="꿀팁받기"
              transparent={true}
              size="md"
            />
            <CircleButton
              name="text"
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
