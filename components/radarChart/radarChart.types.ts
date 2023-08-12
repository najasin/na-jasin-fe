interface DataPoint {
  axis: string
  value: number
  order: number
}

interface IRadarChartProps {
  children: React.ReactNode
  width: number
  height: number
}

interface IRadarCompoundProps {
  radarWidth: number
  radarHeight: number
  framePadding: number
  onDragOutUserInput: (data: DataPoint[]) => void
}

interface IRadarChartDraggableProps extends IRadarCompoundProps {
  draggableData: DataPoint[]
}

interface IRadarChartDefaultProps extends IRadarCompoundProps {
  defaultData: DataPoint[]
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
  isRegistered: boolean
  originKeywordPercents: OtherKeywordPercents
  otherKeywordPercents: OtherKeywordPercents
  frameSize: number
  radarSize: number
  framePadding: number
}

export type {
  DataPoint,
  IRadarChartProps,
  IRadarCompoundProps,
  IRadarChartDraggableProps,
  IRadarChartDefaultProps,
  IAxisMaps,
  IRadarChartContainerProps,
}
