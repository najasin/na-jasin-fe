import classNames from 'classnames/bind'
import { MotionValue, motion } from 'framer-motion'

import styles from './imageCard.module.scss'

const cx = classNames.bind(styles)

interface ImageCardProps {
  backgroundColor: string
  id: string
  bottom: MotionValue<string>
  right: MotionValue<string>
  marginBottom: MotionValue<string>
  marginRight: MotionValue<string>
  rotate: MotionValue<string>
}

export default function ImageCard({
  backgroundColor,
  id,
  bottom,
  right,
  marginBottom,
  marginRight,
  rotate,
}: ImageCardProps) {
  return (
    <motion.div
      className={cx('imgWrapper', id)}
      style={{
        backgroundColor,
        bottom,
        right,
        marginBottom,
        marginRight,
        rotate,
      }}
    >
      <div className={cx('img')}></div>
    </motion.div>
  )
}
