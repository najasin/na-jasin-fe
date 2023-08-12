'use client'

import { useEffect, useState } from 'react'

import { RadarChart } from './radarChart'
import { DataPoint } from './radarChart.types'

const POLYGON_LAYOUT = {
  radarWidth: 300,
  radarHeight: 300,
  framePadding: 200,
}

interface IAxisMaps {
  axis: string
  value: number
  order: number
}

interface OtherKeywordPercents {
  [key: string]: number
}

interface IRadarChartContainerProps {
  originKeywordPercents: OtherKeywordPercents
  otherKeywordPercents: OtherKeywordPercents
}

export default function RadarChartContainer({
  originKeywordPercents,
  otherKeywordPercents,
}: IRadarChartContainerProps) {
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

  console.log(draggableAxis, defaultAxis, hasOtherRadarChart)
  const handleDragOutUserInput = (data: DataPoint[]) => {
    setUserGenerated(data)
  }

  useEffect(() => {
    // POST request { userGenerated }
  }, [userGenerated])

  return (
    <RadarChart width={500} height={500}>
      {hasOtherRadarChart && (
        <>
          <RadarChart.DraggablePolygon
            draggableData={draggableAxis}
            {...POLYGON_LAYOUT}
            onDragOutUserInput={handleDragOutUserInput}
          />
          <RadarChart.DefaultPolygon
            defaultData={defaultAxis}
            {...POLYGON_LAYOUT}
            onDragOutUserInput={handleDragOutUserInput}
          />
        </>
      )}
      {!hasOtherRadarChart && (
        <RadarChart.DraggablePolygon
          draggableData={draggableAxis}
          {...POLYGON_LAYOUT}
          onDragOutUserInput={handleDragOutUserInput}
        />
      )}
    </RadarChart>
  )
}
