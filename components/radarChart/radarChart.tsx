'use client'

import classNames from 'classnames/bind'

import styles from './radarChart.module.scss'

const cx = classNames.bind(styles)

export default function RadarChart() {
  return <div className={cx('radarChartWrapper')}>radarChart</div>
}
