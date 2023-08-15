'use client'

import RecoilRootWrapper from '@/store/recoilRootWrapper'
import classNames from 'classnames/bind'

import { FeatureCard } from './featureCard'
import FeatureTitle from './featureTitle'
import styles from './rightSticky.module.scss'

export const features = [
  {
    title: '테스트용 타이틀 1',
    id: 'todo-list',
    card: FeatureCard.Black,
  },
  {
    title: '테스트용 타이틀 2',
    id: 'colors',
    card: FeatureCard.Pink,
  },
  {
    title: '테스트용 타이틀 3',
    id: 'availablility',
    card: FeatureCard.Purple,
  },
  {
    title: '테스트용 타이틀 4',
    id: 'music',
    card: FeatureCard.Red,
  },
  {
    title: '테스트용 타이틀 5',
    id: 'scheduling-links',
    card: FeatureCard.Green,
  },
  {
    title: '테스트용 타이틀 6',
    id: 'team',
    card: FeatureCard.Blue,
  },
]

const cx = classNames.bind(styles)

export default function RightSticky() {
  return (
    <RecoilRootWrapper>
      <div className={cx('wrapper')}>
        <div className={cx('leftColWrapper')}>
          <ul className={cx('leftColUl')}>
            {features.map((feature) => (
              <li className={cx('leftColLi')} key={feature.id}>
                <FeatureTitle id={feature.id}>{feature.title}</FeatureTitle>
              </li>
            ))}
          </ul>
        </div>
        <div className={cx('rightColWrapper')}>
          {features.map((feature) => (
            <feature.card id={feature.id} key={feature.id} />
          ))}
        </div>
      </div>
    </RecoilRootWrapper>
  )
}
