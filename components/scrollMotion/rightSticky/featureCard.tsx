'use client'

import classNames from 'classnames/bind'
import { useRecoilState } from 'recoil'

import { featureState } from './featureStore.store'
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
  return (
    <div
      className={cx('featureCard', color, {
        isView: featureId === id,
      })}
    >
      {children}
    </div>
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
