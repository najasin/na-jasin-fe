'use client'

import RecoilRootWrapper from '@/store/recoilRootWrapper'
import classNames from 'classnames/bind'

import { FeatureCard } from './featureCard'
import { TodoDetail, TodoDetail2 } from './featureDetail'
import FeatureTitle from './featureTitle'
import styles from './rightSticky.module.scss'

export const features = [
  {
    title: '테스트용 타이틀 1',
    id: 'todo-list',
    card: FeatureCard.Black,
    detailVisual: TodoDetail,
  },
  {
    title: '테스트용 타이틀 2',
    id: 'colors',
    card: FeatureCard.Pink,
    detailVisual: TodoDetail2,
  },
  {
    title: '테스트용 타이틀 3',
    id: 'availablility',
    card: FeatureCard.Purple,
    detailVisual: TodoDetail,
  },
  {
    title: '테스트용 타이틀 4',
    id: 'music',
    card: FeatureCard.Red,
    detailVisual: TodoDetail2,
  },
  {
    title: '테스트용 타이틀 5',
    id: 'scheduling-links',
    card: FeatureCard.Green,
    detailVisual: TodoDetail,
  },
  {
    title: '테스트용 타이틀 6',
    id: 'team',
    card: FeatureCard.Blue,
    detailVisual: TodoDetail2,
  },
]

const cx = classNames.bind(styles)

export default function RightSticky() {
  return (
    <RecoilRootWrapper>
      <div>
        {features.map((feature) => (
          <feature.detailVisual id={feature.id} key={feature.id} />
        ))}
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
      </div>
    </RecoilRootWrapper>
  )
}
