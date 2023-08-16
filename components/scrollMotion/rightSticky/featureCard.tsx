'use client'

import classNames from 'classnames/bind'
import { motion } from 'framer-motion'
import { useRecoilState } from 'recoil'

import { featureState, fullScreenState } from './featureStore.store'
import styles from './rightSticky.module.scss'

const cx = classNames.bind(styles)

type CardProps = {
  id: string
}

type FeatureCardprops = {
  color: string
  children: React.ReactNode
} & CardProps

export function FeatureCard({ color, children, id }: FeatureCardprops) {
  const [featureId] = useRecoilState(featureState)
  // const [opacity, setOpacity] = useState(featureId === id ? 1 : 0)

  const [fullScreen, setFullScreen] = useRecoilState(fullScreenState)
  // console.log(featureId, id) // id는 여러 개 찍힌다.

  return (
    <motion.div
      // style={{ opacity, transition: 'all 0.5s ease' }}
      className={cx('featureCard', color, {
        isView: featureId === id,
        isFullScreen: fullScreen,
      })}
    >
      {children}
      <button
        onClick={() => {
          // console.log(featureId, id)
          setFullScreen(featureId)
        }}
        className={cx('goToDetailBtn')}
      >
        상세페이지 보여주기
      </button>
    </motion.div>
  )
}

export function Black({ id }: CardProps) {
  return (
    <FeatureCard id={id} color="black">
      검은색
    </FeatureCard>
  )
}
export function Pink({ id }: CardProps) {
  return (
    <FeatureCard id={id} color="pink">
      분홍색
    </FeatureCard>
  )
}
export function Purple({ id }: CardProps) {
  return (
    <FeatureCard id={id} color="purple">
      보라색
    </FeatureCard>
  )
}
export function Red({ id }: CardProps) {
  return (
    <FeatureCard id={id} color="red">
      빨간색
    </FeatureCard>
  )
}
export function Green({ id }: CardProps) {
  return (
    <FeatureCard id={id} color="green">
      초록색
    </FeatureCard>
  )
}
export function Blue({ id }: CardProps) {
  return (
    <FeatureCard id={id} color="blue">
      파란색
    </FeatureCard>
  )
}

FeatureCard.Black = Black
FeatureCard.Pink = Pink
FeatureCard.Purple = Purple
FeatureCard.Red = Red
FeatureCard.Green = Green
FeatureCard.Blue = Blue
