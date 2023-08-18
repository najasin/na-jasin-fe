'use client'

import { useEffect, useRef } from 'react'

import classNames from 'classnames/bind'
import { useInView } from 'framer-motion'
import { useRecoilState } from 'recoil'

import { featureIdAtom } from '../shared/store/featureStore.store'
import FeatureCard from './featureCard'
import FeatureTitle from './featureTitle'
import { FEATURES } from './ourFeature.models'
import styles from './ourFeature.module.scss'

const cx = classNames.bind(styles)

export default function OurFeature() {
  const [, setFeatureId] = useRecoilState(featureIdAtom)
  const targetRef = useRef<HTMLUListElement>(null)

  const isInView = useInView(targetRef, {
    margin: '0px 0px 0px 0px',
  })

  useEffect(() => {
    if (!isInView) {
      setFeatureId('')
    }
  }, [isInView, setFeatureId])

  return (
    <>
      <ul ref={targetRef} className={cx('leftTextListWrapper')}>
        {FEATURES.map(({ id, title, text }) => (
          <FeatureTitle key={id} id={id} title={title} text={text} />
        ))}
      </ul>
      <div className={cx('rightCardWrapper')}>
        {FEATURES.map(({ id, colorText }) => (
          <FeatureCard
            parentView={isInView}
            key={id}
            id={id}
            colorText={colorText}
          />
        ))}
      </div>
    </>
  )
}
