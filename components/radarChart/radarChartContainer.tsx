'use client'

import { useEffect, useState } from 'react'

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
  originKeywordPercents: OtherKeywordPercents
  otherKeywordPercents: OtherKeywordPercents
  frameSize: number
  radarSize: number
  framePadding: number
}

export default function RadarChartContainer({
  originKeywordPercents,
  otherKeywordPercents,
  frameSize,
  radarSize,
  framePadding,
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

  const handleDragOutUserInput = (data: DataPoint[]) => {
    setUserGenerated(data)
  }

  useEffect(() => {
    // POST request { userGenerated }
  }, [userGenerated])

  return (
    <RadarChart width={frameSize} height={frameSize}>
      {hasOtherRadarChart && (
        <>
          <RadarChart.DraggablePolygon
            draggableData={draggableAxis}
            radarWidth={radarSize}
            radarHeight={radarSize}
            framePadding={framePadding}
            onDragOutUserInput={handleDragOutUserInput}
            total={5}
          />
          <RadarChart.DefaultPolygon
            defaultData={defaultAxis}
            radarWidth={radarSize}
            radarHeight={radarSize}
            framePadding={framePadding}
            onDragOutUserInput={handleDragOutUserInput}
          />
        </>
      )}
      {!hasOtherRadarChart && (
        <RadarChart.DraggablePolygon
          draggableData={draggableAxis}
          radarWidth={radarSize}
          radarHeight={radarSize}
          framePadding={framePadding}
          onDragOutUserInput={handleDragOutUserInput}
          total={5}
        />
      )}
    </RadarChart>
  )
}
