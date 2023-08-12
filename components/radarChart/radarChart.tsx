'use client'

import { ForwardedRef, forwardRef, useEffect } from 'react'

import classNames from 'classnames/bind'

import { drawRadarChart } from './helpers/radarChart.helpers'
import styles from './radarChart.module.scss'
import {
  IRadarChartDefaultProps,
  IRadarChartDraggableProps,
  IRadarChartProps,
} from './radarChart.types'

const cx = classNames.bind(styles)

export function RadarChart({ children, width, height }: IRadarChartProps) {
  return (
    <div style={{ width, height }} className={cx('radarChartWrapper')}>
      {children}
    </div>
  )
}

function DraggablePolygon(
  {
    draggableData,
    radarWidth,
    radarHeight,
    framePadding,
    onDragOutUserInput,
  }: IRadarChartDraggableProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
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
      onDragOutUserInput,
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draggableData])

  return (
    <div style={{ position: 'absolute' }}>
      <div
        ref={ref}
        id="radar-chart"
        style={{ width: '100%', height: '100%', position: 'absolute' }}
      ></div>
    </div>
  )
}

function DefaultPolygon({
  defaultData,
  radarWidth,
  radarHeight,
  framePadding,
  onDragOutUserInput,
}: IRadarChartDefaultProps) {
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
      onDragOutUserInput,
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultData])

  return (
    <div id="default-radar-chart" style={{ width: '100%', height: '100%' }} />
  )
}

RadarChart.DraggablePolygon = forwardRef(DraggablePolygon)
RadarChart.DefaultPolygon = DefaultPolygon
