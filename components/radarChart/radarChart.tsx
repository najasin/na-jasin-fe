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
    isPossibleDrawNode,
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
      true,
      isPossibleDrawNode,
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draggableData])

  return (
    <div style={{ position: 'absolute', zIndex: '10' }}>
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
  isDefault = true,
  isViewPolygon = true,
  isPossibleDrawNode = true,
}: IRadarChartDefaultProps) {
  useEffect(() => {
    drawRadarChart(
      '#default-radar-chart',
      'default-radar-chart-line',
      'default-radar-chart-axis',
      'default-radar-chart-legend',
      'default-radar-chart-series',
      isDefault,
      defaultData,
      '#B8B8B8',
      radarWidth,
      radarHeight,
      framePadding,
      onDragOutUserInput,
      isViewPolygon,
      isPossibleDrawNode,
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultData, isViewPolygon])

  return (
    <div
      id="default-radar-chart"
      style={{ position: 'absolute', width: '100%', height: '100%' }}
    />
  )
}

RadarChart.DraggablePolygon = forwardRef(DraggablePolygon)
RadarChart.DefaultPolygon = DefaultPolygon
