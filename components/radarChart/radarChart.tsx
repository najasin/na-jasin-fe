'use client'

import { useEffect, useRef } from 'react'

import classNames from 'classnames/bind'
import * as d3 from 'd3'

import useBreakpoint from '@/hooks/useBreakpoint.hooks'

import { rotateOffsetRatioMap } from './helpers/axis.helpers'
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

function DraggablePolygon({
  isRegistered,
  draggableData,
  radarWidth,
  radarHeight,
  framePadding,
  onDragOutUserInput,
  total,
}: IRadarChartDraggableProps) {
  const isMobile: boolean = useBreakpoint({ query: '(max-width: 767px)' })

  const counterRef = useRef<number>(0) // useRef를 사용하여 counter를 관리
  const svgRef = useRef<HTMLDivElement>(null)

  const handleRotateZoomOut = () => {
    if (!svgRef.current) return
    const svg = d3.select(svgRef.current)?.select('svg')

    if (!svg) return
    const transitioned = svg.transition().duration(750)
    transitioned.attr(
      'transform',
      `translate(0, 0) scale(1) rotate(${-(360 / total) * counterRef.current})`,
    )
  }

  const handleRotateZoomIn = () => {
    const cfg = {
      w: radarWidth,
      h: radarHeight,
      factorLegend: 0.85,
      radians: 2 * Math.PI,
      scale: 1.5,
    }

    if (!svgRef.current) return
    const svg = d3.select(svgRef.current)?.select('svg')
    if (!svg) return

    const textElements = svg.selectAll<SVGTextElement>('.radar-chart-legend')

    const initialTextPositions: Array<{
      cX: number
      cY: number
      offsetX: number
      offsetY: number
    }> = []

    /* eslint-disable func-names */
    textElements.each(function (this: SVGTextElement, d, i) {
      const bbox = (this as SVGTextElement).getBBox()

      const cX = bbox.x + bbox.width / 2
      const cY = bbox.y + bbox.height / 2

      initialTextPositions.push({
        cX,
        cY,
        offsetX:
          rotateOffsetRatioMap[counterRef.current][i].offsetXRatio * cfg.w,
        offsetY:
          rotateOffsetRatioMap[counterRef.current][i].offsetYRatio * cfg.h,
      })
    })

    const transitionedText = textElements.transition().duration(750)
    transitionedText.attr('transform', (_, i) => {
      const initialPosition = initialTextPositions[i]

      if (counterRef.current === 0) {
        return `translate(${initialPosition.offsetX}, ${initialPosition.offsetY})`
      }
      return `rotate(${(360 / total) * counterRef.current}, ${
        initialPosition.cX + initialPosition.offsetX
      }, ${initialPosition.cY + initialPosition.offsetY})`
    })

    const transitioned = svg.transition().duration(750)
    transitioned.attr(
      'transform',
      `translate(0, 200) scale(${cfg.scale}) rotate(${
        -(360 / total) * counterRef.current
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
    <div style={{ position: 'absolute' }}>
      <div
        ref={svgRef}
        id="radar-chart"
        style={{ width: '100%', height: '100%', position: 'absolute' }}
      ></div>
      {isMobile && isRegistered && (
        <div style={{ zIndex: 99, background: 'white' }}>
          <button
            style={{ position: 'absolute', bottom: '0' }}
            onClick={handleRotateZoomIn}
          >
            Zoom In
          </button>
          <button
            style={{ position: 'absolute', bottom: '0', left: '100px' }}
            onClick={() => {
              counterRef.current = (counterRef.current + 1) % total
              handleRotateZoomIn()
            }}
          >
            plus
          </button>
          <button
            style={{ position: 'absolute', bottom: '0', left: '200px' }}
            onClick={() => {
              counterRef.current = Math.abs((counterRef.current - 1) % total)
              handleRotateZoomIn()
            }}
          >
            minus
          </button>
          <button
            style={{ position: 'absolute', bottom: '0', left: '300px' }}
            onClick={() => {
              handleRotateZoomOut()
            }}
          >
            zoom out
          </button>
        </div>
      )}
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
