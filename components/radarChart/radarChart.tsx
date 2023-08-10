'use client'

import { useEffect, useRef } from 'react'

import classNames from 'classnames/bind'
import * as d3 from 'd3'

import { drawRadarChart } from './radarChart.helpers'
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

function DraggablePolygon({
  draggableData,
  radarWidth,
  radarHeight,
  framePadding,
  onDragOutUserInput,
}: IRadarChartDraggableProps) {
  const svgRef = useRef(null)

  const total = 5

  function handleZoomIn() {
    const scale = 1.5

    if (!svgRef.current) {
      return // svgRef.current가 null일 경우 처리
    }

    const svg = d3.select(svgRef.current)?.select('svg')

    if (!svg) {
      return
    }

    const textElements = svg.selectAll<SVGTextElement>('.radar-chart-legend')

    const initialTextPositions: Array<{ cX: number; cY: number }> = [] // 초기 텍스트 엘리먼트 위치 저장용 배열

    /* eslint-disable func-names */
    textElements.each(function (this: SVGTextElement) {
      const bbox = (this as SVGTextElement).getBBox()
      const cX = bbox.x + bbox.width / 2
      const cY = bbox.y + bbox.height / 2
      initialTextPositions.push({ cX, cY })
    })

    const tt = textElements.transition().duration(750)
    tt.attr('transform', (_, i) => {
      const initialPosition = initialTextPositions[i]
      return `rotate(${(360 / total) * 2}, ${initialPosition.cX}, ${
        initialPosition.cY
      })`
    })

    // // transition 생성
    const t = svg.transition().duration(750) // 0.75초 동안 트랜지션

    t.attr(
      'transform',
      `translate(0, 200) scale(${scale}) rotate(${-(360 / 5) * 2})`,
    )
  }

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
    <div style={{ position: 'relative' }}>
      <div
        ref={svgRef}
        id="radar-chart"
        style={{ width: '100%', height: '100%', position: 'absolute' }}
      />
      <button
        style={{ position: 'absolute', right: '0' }}
        onClick={handleZoomIn}
      >
        Zoom In
      </button>
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

RadarChart.DraggablePolygon = DraggablePolygon
RadarChart.DefaultPolygon = DefaultPolygon
