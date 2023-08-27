'use client'

import { useEffect, useRef } from 'react'

import classNames from 'classnames/bind'
import { useInView } from 'framer-motion'
import { useRecoilState } from 'recoil'

import { featureIdAtom } from '../shared/store/featureStore.store'
import CurrentHeightChecker from './currentHeightChecker'
import DeleteElement from './deleteElement'
import LeftTitle from './leftTitle'
import { FEATURES } from './ourFeature.models'
import styles from './ourFeature.module.scss'
import RightCard from './rightCard'

const cx = classNames.bind(styles)

export default function OurFeature() {
  const ourFeatureTargetRef = useRef<HTMLUListElement>(null)
  const [, setFeatureId] = useRecoilState(featureIdAtom)
  const isInView = useInView(ourFeatureTargetRef, {
    margin: '0px 0px 0px 0px',
  })

  useEffect(() => {
    if (!isInView) {
      setFeatureId('')
    }
  }, [isInView, setFeatureId])

  return (
    <section ref={ourFeatureTargetRef} className={cx('ourFeatureContainer')}>
      <ul className={cx('ourFeatureLeftTextWrapper')}>
        {FEATURES.map(({ id, title, text }) => (
          <div key={id}>
            <LeftTitle id={id} text={text}>
              {title}
            </LeftTitle>
            <CurrentHeightChecker height="120vh" id={id} />
            <DeleteElement height="100vh" id={id} />
          </div>
        ))}
      </ul>
      <ul className={cx('ourFeatureRightCardWrapper')}>
        {FEATURES.map(({ id, imageSrc }) => (
          <RightCard key={id} id={id} imageSrc={imageSrc} />
        ))}
      </ul>
    </section>
  )
}
