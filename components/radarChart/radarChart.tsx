'use client'

import classNames from 'classnames/bind'

import styles from './radarChart.module.scss'
import { IRadarChart } from './radarChart.types'

const cx = classNames.bind(styles)

export default function RadarChart({ width, height }: IRadarChart) {
  return (
    <div style={{ width, height }} className={cx('radarChartWrapper')}>
      radarChart
    </div>
  )
}
