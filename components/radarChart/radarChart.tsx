'use client'

import { useEffect } from 'react'

import classNames from 'classnames/bind'

import { drawRadarChart } from './radarChart.helpers'
import styles from './radarChart.module.scss'
import {
  IRadarChartDefaultProps,
  IRadarChartDraggableProps,
  IRadarChartProps,
} from './radarChart.types'

const cx = classNames.bind(styles)

export const RadarChart = ({ children, width, height }: IRadarChartProps) => (
  <div style={{ width, height }} className={cx('radarChartWrapper')}>
    {children}
  </div>
)

const DraggablePolygon = ({
  draggableData,
  radarWidth,
  radarHeight,
  framePadding,
}: IRadarChartDraggableProps) => {
  useEffect(() => {
    drawRadarChart(
      '#radar-chart',
      'radar-chart-line',
      'radar-chart-axis',
      'radar-chart-legend',
      'radar-chart-series',
      false,
      draggableData,
      '#B467F3',
      radarWidth,
      radarHeight,
      framePadding,
    )
  }, [draggableData])

  return (
    <div
      id="radar-chart"
      style={{ width: '100%', height: '100%', position: 'absolute' }}
    />
  )
}

const DefaultPolygon = ({
  defaultData,
  radarWidth,
  radarHeight,
  framePadding,
}: IRadarChartDefaultProps) => {
  useEffect(() => {
    drawRadarChart(
      '#default-radar-chart',
      'default-radar-chart-line',
      'default-radar-chart-axis',
      'default-radar-chart-legend',
      'default-radar-chart-series',
      true,
      defaultData,
      '#B8B8B8',
      radarWidth,
      radarHeight,
      framePadding,
    )
  }, [defaultData])

  return (
    <div id="default-radar-chart" style={{ width: '100%', height: '100%' }} />
  )
}

RadarChart.DraggablePolygon = DraggablePolygon
RadarChart.DefaultPolygon = DefaultPolygon
