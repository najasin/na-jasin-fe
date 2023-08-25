'use client'

import { useEffect, useRef, useState } from 'react'

import classNames from 'classnames/bind'
import * as d3 from 'd3'
import { motion } from 'framer-motion'

import useBreakpoint from '@/hooks/useBreakpoint.hooks'

import { rotateOffsetRatioMap } from './helpers/axis.helpers'
import { RadarChart } from './radarChart'
import {
  DataPoint,
  IAxisMaps,
  IRadarChartContainerProps,
  TrimmedDataProps,
} from './radarChart.types'
import styles from './radarChartContainer.module.scss'

const cx = classNames.bind(styles)

export default function RadarChartContainer({
  radarType,
  originKeywordPercents,
  otherKeywordPercents,
  frameSize,
  radarSize,
  framePadding,
  hasOthers,
  handleUpdateRadarData,
}: IRadarChartContainerProps) {
  const bubbleVariants = {
    opened: {
      y: 30,
      opacity: 1,
    },
    closed: {
      y: 0,
      opacity: 0,
    },
  }
  const isRegistered = radarType === 'NJNS' || radarType === 'TJNS'
  const total = 5

  const isMobile: boolean = useBreakpoint({ query: '(max-width: 767px)' })
  const counterRef = useRef<number>(0) // useRef를 사용하여 counter를 관리
  const svgRef = useRef<HTMLDivElement>(null)

  const [isZoomIn, setIsZoomIn] = useState(true)
  const [isClicked, setIsClicked] = useState(false)
  const [isViewPolygon, setIsViewPolygon] = useState(true)
  const [draggableAxis] = useState<IAxisMaps[]>(
    Object.keys(originKeywordPercents).map((key, index) => ({
      axis: key,
      value: originKeywordPercents[key] <= 25 ? 25 : originKeywordPercents[key],
      order: index,
    })),
  )
  const [defaultAxis] = useState<IAxisMaps[]>(
    Object.keys(otherKeywordPercents).map((key, index) => ({
      axis: key,
      value: otherKeywordPercents[key] <= 25 ? 25 : otherKeywordPercents[key],
      order: index,
    })),
  )
  const [trimmedRadarData, setTrimmedRadarData] = useState<TrimmedDataProps>(
    radarType === 'NJNS' ? originKeywordPercents : otherKeywordPercents,
  )

  const handleDragOutUserInput = (data: DataPoint[]) => {
    const trimmed = data.reduce(
      (prev, curr) => ({
        ...prev,
        [`${curr.axis}`]: curr.value <= 25 ? 25 : curr.value,
      }),
      {},
    )

    setTrimmedRadarData(trimmed)
  }

  const handleRotateZoomOut = () => {
    if (!svgRef.current) return
    const svg = d3.select(svgRef.current)?.select('svg')

    if (!svg) return

    // const transitioned = svg.transition().duration(750)
    const gElements = svg.select('g').transition().duration(750)
    gElements.attr(
      'transform',
      `translate(75, 75) scale(1) rotate(${
        -(360 / total) * counterRef.current
      })`,
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
    // svg.style('will-change', 'transform')
    transitionedText.attr('transform', (_, i) => {
      const initialPosition = initialTextPositions[i]

      if (counterRef.current === 0) {
        return `translate(${initialPosition.offsetX}, ${initialPosition.offsetY})`
      }
      return `rotate(${(360 / total) * counterRef.current}, ${
        initialPosition.cX + initialPosition.offsetX
      }, ${initialPosition.cY + initialPosition.offsetY})`
    })

    const gElements = svg.select('g').transition().duration(750)

    // const transitioned = svg.transition().duration(750)
    // svg.style('will-change', 'transform')
    // transitioned.attr(
    //   'transform',
    //   `translate(0, 200) scale(${cfg.scale}) rotate(${
    //     -(360 / total) * counterRef.current
    //   })`,
    // )

    gElements
      .attr(
        'transform',
        `translate(75, 275) scale(${cfg.scale}) rotate(${
          -(360 / total) * counterRef.current
        })`,
      )
      .style('transform-origin', `${cfg.w / 2}px ${cfg.h / 2}px`)
  }

  // 스크롤 이벤트 막는 함수 추가
  function preventDefault(e: TouchEvent) {
    e.preventDefault()
  }

  // 스크롤 막는 함수 추가
  function disableScroll() {
    document.body.style.overflow = 'hidden'
    document.addEventListener('touchmove', preventDefault, { passive: false })
  }

  // 스크롤 활성화하는 함수 추가
  function enableScroll() {
    document.body.style.overflow = 'auto'
    document.removeEventListener('touchmove', preventDefault)
  }

  const handleClickChangeZoom = () => {
    if (isZoomIn) {
      console.log(1)
      disableScroll()
      if (radarType === 'TJNS') {
        setIsViewPolygon(false)
      }
      handleRotateZoomIn()
    } else if (!isZoomIn) {
      console.log(2)
      enableScroll()
      handleRotateZoomOut()
      if (radarType === 'TJNS') {
        setTimeout(() => setIsViewPolygon(true), 750)
      }
    }

    setIsClicked(!isClicked)
    setIsZoomIn(!isZoomIn)
  }

  useEffect(() => {
    if (!handleUpdateRadarData) return

    handleUpdateRadarData(trimmedRadarData)
  }, [trimmedRadarData, handleUpdateRadarData])

  return (
    <div className={cx('radarChartContainerWrapper')}>
      <RadarChart width={frameSize} height={frameSize}>
        {radarType === 'NJNS' && (
          <div className={cx('chartContainer')}>
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
          <div className={cx('chartContainer')}>
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
          <div className={cx('chartContainer')}>
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
        <div className={cx('buttonContainer')}>
          <motion.button
            type="button"
            className={cx('playButton')}
            onClick={handleClickChangeZoom}
            style={{ touchAction: 'manipulation' }} // 추가
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ backgroundColor: '#71afff', scale: 0.9 }}
          >
            {isZoomIn ? '크게 보기' : '작게 보기'}
          </motion.button>
        </div>
      )}
      {isMobile && isRegistered && isClicked && (
        <motion.div
          className={cx('registerButtonWrapper')}
          animate={isClicked ? 'opened' : 'closed'}
        >
          <motion.button
            type="button"
            onClick={() => {
              if (radarType === 'TJNS') {
                setIsViewPolygon(false)
              }
              counterRef.current =
                (counterRef.current - 1 < 0
                  ? total + counterRef.current - 1
                  : counterRef.current - 1) % total
              handleRotateZoomIn()
            }}
            className={cx('registerButton')}
            variants={bubbleVariants}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ backgroundColor: '#71afff', scale: 0.9 }}
          >
            이전
          </motion.button>
          <motion.button
            type="button"
            onClick={() => {
              if (radarType === 'TJNS') {
                setIsViewPolygon(false)
              }
              counterRef.current = (counterRef.current + 1) % total
              handleRotateZoomIn()
            }}
            className={cx('registerButton')}
            variants={bubbleVariants}
            transition={{ duration: 0.3, delay: isClicked ? 0.07 : 0.05 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ backgroundColor: '#71afff', scale: 0.9 }}
          >
            다음
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}
