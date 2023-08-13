'use client'

import { useEffect, useRef, useState } from 'react'

import * as d3 from 'd3'

import useBreakpoint from '@/hooks/useBreakpoint.hooks'

import { rotateOffsetRatioMap } from './helpers/axis.helpers'
import { RadarChart } from './radarChart'
import {
  DataPoint,
  IAxisMaps,
  IRadarChartContainerProps,
} from './radarChart.types'

export default function RadarChartContainer({
  radarType,
  originKeywordPercents,
  otherKeywordPercents,
  frameSize,
  radarSize,
  framePadding,
  hasOthers,
}: IRadarChartContainerProps) {
  const isRegistered = radarType === 'NJNS' || radarType === 'TJNS'
  const total = 5
  const isMobile: boolean = useBreakpoint({ query: '(max-width: 767px)' })
  const counterRef = useRef<number>(0) // useRef를 사용하여 counter를 관리
  const svgRef = useRef<HTMLDivElement>(null)

  const [isViewPolygon, setIsViewPolygon] = useState(true)

  // console.log(
  //   radarType,
  //   originKeywordPercents,
  //   otherKeywordPercents,
  //   hasOtherRadarChart,
  // )
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
    <div
      style={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <RadarChart width={frameSize} height={frameSize}>
        {radarType === 'NJNS' && (
          <div style={{ position: 'relative' }}>
            <RadarChart.DraggablePolygon
              draggableData={draggableAxis}
              radarWidth={radarSize}
              radarHeight={radarSize}
              framePadding={framePadding}
              onDragOutUserInput={handleDragOutUserInput}
              isPossibleDrawNode={true}
              ref={svgRef}
            />
          </div>
        )}
        {radarType === 'MY' && (
          <div style={{ position: 'relative' }}>
            {hasOthers && (
              <RadarChart.DraggablePolygon
                draggableData={defaultAxis}
                radarWidth={radarSize}
                radarHeight={radarSize}
                framePadding={framePadding}
                onDragOutUserInput={handleDragOutUserInput}
                isPossibleDrawNode={false}
                ref={svgRef}
              />
            )}
            <RadarChart.DefaultPolygon
              defaultData={draggableAxis}
              radarWidth={radarSize}
              radarHeight={radarSize}
              framePadding={framePadding}
              onDragOutUserInput={handleDragOutUserInput}
              isDefault={!!hasOthers} // hasOthers ? true : false
              isPossibleDrawNode={!!hasOthers} // hasOthers ? true : false
            />
          </div>
        )}
        {radarType === 'TJNS' && (
          <div style={{ position: 'relative' }}>
            <RadarChart.DraggablePolygon
              draggableData={defaultAxis}
              radarWidth={radarSize}
              radarHeight={radarSize}
              framePadding={framePadding}
              onDragOutUserInput={handleDragOutUserInput}
              isPossibleDrawNode={true}
              ref={svgRef}
            />
            <RadarChart.DefaultPolygon
              defaultData={draggableAxis}
              radarWidth={radarSize}
              radarHeight={radarSize}
              framePadding={framePadding}
              onDragOutUserInput={handleDragOutUserInput}
              isViewPolygon={isViewPolygon}
            />
          </div>
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
            style={{ position: 'absolute', bottom: '0', left: '-180px' }}
            onClick={() => {
              if (radarType === 'TJNS') {
                setIsViewPolygon(false)
              }
              handleRotateZoomIn()
            }}
          >
            Zoom In
          </button>
          <button
            style={{ position: 'absolute', bottom: '0', left: '-100px' }}
            onClick={() => {
              if (radarType === 'TJNS') {
                setIsViewPolygon(false)
              }
              counterRef.current = (counterRef.current + 1) % total
              handleRotateZoomIn()
            }}
          >
            plus
          </button>
          <button
            style={{ position: 'absolute', bottom: '0', left: '0px' }}
            onClick={() => {
              if (radarType === 'TJNS') {
                setIsViewPolygon(false)
              }
              counterRef.current = Math.abs((counterRef.current - 1) % total)
              handleRotateZoomIn()
            }}
          >
            minus
          </button>
          <button
            style={{ position: 'absolute', bottom: '0', left: '100px' }}
            onClick={() => {
              handleRotateZoomOut()
              if (radarType === 'TJNS') {
                setTimeout(() => setIsViewPolygon(true), 750)
              }
            }}
          >
            zoom out
          </button>
        </div>
      )}
    </div>
  )
}
