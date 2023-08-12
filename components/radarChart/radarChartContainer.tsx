'use client'

import { useEffect, useRef, useState } from 'react'

import * as d3 from 'd3'

import useBreakpoint from '@/hooks/useBreakpoint.hooks'

import { rotateOffsetRatioMap } from './helpers/axis.helpers'
import { RadarChart } from './radarChart'
import { DataPoint } from './radarChart.types'

interface IAxisMaps {
  axis: string
  value: number
  order: number
}

interface OtherKeywordPercents {
  [key: string]: number
}

interface IRadarChartContainerProps {
  isRegistered: boolean
  originKeywordPercents: OtherKeywordPercents
  otherKeywordPercents: OtherKeywordPercents
  frameSize: number
  radarSize: number
  framePadding: number
}

export default function RadarChartContainer({
  isRegistered,
  originKeywordPercents,
  otherKeywordPercents,
  frameSize,
  radarSize,
  framePadding,
}: IRadarChartContainerProps) {
  const total = 5
  const isMobile: boolean = useBreakpoint({ query: '(max-width: 767px)' })
  const counterRef = useRef<number>(0) // useRef를 사용하여 counter를 관리
  const svgRef = useRef<HTMLDivElement>(null)

  const [hasOtherRadarChart] = useState<boolean>(
    Object.keys(otherKeywordPercents).length !== 0,
  )
  const [draggableAxis] = useState<IAxisMaps[]>(
    Object.keys(originKeywordPercents).map((key, index) => ({
      axis: key,
      value: originKeywordPercents[key],
      order: index,
    })),
  )
  const [defaultAxis] = useState<IAxisMaps[]>(
    Object.keys(otherKeywordPercents).map((key, index) => ({
      axis: key,
      value: otherKeywordPercents[key],
      order: index,
    })),
  )
  const [userGenerated, setUserGenerated] = useState<DataPoint[]>(draggableAxis)

  const handleDragOutUserInput = (data: DataPoint[]) => {
    setUserGenerated(data)
  }

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
      w: radarSize,
      h: radarSize,
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
    // POST request { userGenerated }
  }, [userGenerated])

  return (
    <div style={{ overflow: 'hidden' }}>
      <RadarChart width={frameSize} height={frameSize}>
        {hasOtherRadarChart && (
          <div style={{ position: 'relative' }}>
            <RadarChart.DraggablePolygon
              draggableData={draggableAxis}
              radarWidth={radarSize}
              radarHeight={radarSize}
              framePadding={framePadding}
              onDragOutUserInput={handleDragOutUserInput}
              ref={svgRef}
            />
            <RadarChart.DefaultPolygon
              defaultData={defaultAxis}
              radarWidth={radarSize}
              radarHeight={radarSize}
              framePadding={framePadding}
              onDragOutUserInput={handleDragOutUserInput}
            />
          </div>
        )}
        {!hasOtherRadarChart && (
          <RadarChart.DraggablePolygon
            draggableData={draggableAxis}
            radarWidth={radarSize}
            radarHeight={radarSize}
            framePadding={framePadding}
            onDragOutUserInput={handleDragOutUserInput}
            ref={svgRef}
          />
        )}
      </RadarChart>
      {isMobile && isRegistered && (
        <div
          style={{
            position: 'relative',
            zIndex: 99,
            background: 'white',
          }}
        >
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
