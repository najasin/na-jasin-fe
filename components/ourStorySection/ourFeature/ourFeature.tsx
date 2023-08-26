'use client'

import { useRef } from 'react'

import classNames from 'classnames/bind'

import CurrentHeightChecker from './currentHeightChecker'
import LeftTitle from './leftTitle'
import { FEATURES } from './ourFeature.models'
import styles from './ourFeature.module.scss'
import RightCard from './rightCard'

const cx = classNames.bind(styles)

export default function OurFeature() {
  const ourFeatureTargetRef = useRef<HTMLUListElement>(null)

  return (
    <section className={cx('ourFeatureContainer')}>
      <ul ref={ourFeatureTargetRef} className={cx('ourFeatureLeftTextWrapper')}>
        {FEATURES.map(({ id, title, text }) => (
          <div key={id}>
            <LeftTitle id={id} text={text}>
              {title}
            </LeftTitle>
            <CurrentHeightChecker height="120vh" id={id} />
          </div>
        ))}
      </ul>
      <ul className={cx('ourFeatureRightCardWrapper')}>
        {FEATURES.map(({ id }) => (
          <RightCard key={id} id={id} />
        ))}
      </ul>
    </section>
  )
}
