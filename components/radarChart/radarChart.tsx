'use client'

import { useEffect, useRef } from 'react'

import classNames from 'classnames/bind'
import * as d3 from 'd3'

import { rotateOffsetRaioMap } from './axis.helpers'
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
  const counterRef = useRef<number>(0) // useRef를 사용하여 counter를 관리

  const svgRef = useRef(null)

  const total = 5

  const handleRotateZoomOut = () => {
    if (!svgRef.current) {
      return // svgRef.current가 null일 경우 처리
    }

    const svg = d3.select(svgRef.current)?.select('svg')

    if (!svg) {
      return
    }

    // // transition 생성
    const t = svg.transition().duration(750) // 0.75초 동안 트랜지션

    t.attr(
      'transform',
      `translate(0, 0) scale(1) rotate(${-(360 / 5) * counterRef.current})`,
    )
  }

  const handleRotateZoomIn = () => {
    const scale = 1.5

    const cfg = {
      w: radarWidth,
      h: radarHeight,
      factorLegend: 0.85,
      radians: 2 * Math.PI,
    }

    if (!svgRef.current) {
      return // svgRef.current가 null일 경우 처리
    }

    const svg = d3.select(svgRef.current)?.select('svg')

    if (!svg) {
      return
    }

    const textElements = svg.selectAll<SVGTextElement>('.radar-chart-legend')

    // textElements.text(() => '')

    const initialTextPositions: Array<{
      cX: number
      cY: number
      offsetX: number
      offsetY: number
    }> = [] // 초기 텍스트 엘리먼트 위치 저장용 배열

    /* eslint-disable func-names */
    textElements.each(function (this: SVGTextElement, d, i) {
      const bbox = (this as SVGTextElement).getBBox()

      const cX = bbox.x + bbox.width / 2
      const cY = bbox.y + bbox.height / 2

      initialTextPositions.push({
        cX,
        cY,
        offsetX:
          rotateOffsetRaioMap[counterRef.current][i].offsetXRatio * cfg.w,
        offsetY:
          rotateOffsetRaioMap[counterRef.current][i].offsetYRatio * cfg.h,
      })
    })

    const tt = textElements.transition().duration(750)
    tt.attr('transform', (_, i) => {
      const initialPosition = initialTextPositions[i]
      return `rotate(${(360 / total) * counterRef.current}, ${
        initialPosition.cX + initialPosition.offsetX
      }, ${initialPosition.cY + initialPosition.offsetY})`
    })

    // // transition 생성
    const t = svg.transition().duration(750) // 0.75초 동안 트랜지션

    t.attr(
      'transform',
      `translate(0, 200) scale(${scale}) rotate(${
        -(360 / 5) * counterRef.current
      })`,
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
        onClick={handleRotateZoomIn}
      >
        Zoom In
      </button>
      <button
        style={{ position: 'absolute', right: '-50px' }}
        onClick={() => {
          counterRef.current = (counterRef.current + 1) % total
          handleRotateZoomIn()
        }}
      >
        plus
      </button>
      <button
        style={{ position: 'absolute', right: '-100px' }}
        onClick={() => {
          counterRef.current = Math.abs((counterRef.current - 1) % total)
          handleRotateZoomIn()
        }}
      >
        minus
      </button>
      <button
        style={{ position: 'absolute', right: '-180px' }}
        onClick={() => {
          handleRotateZoomOut()
        }}
      >
        zoom out
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
