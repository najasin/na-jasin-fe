type TrimmedDataProps = {
  [key: string]: number
}

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
  isPossibleDrawNode: boolean
}

interface IRadarChartDefaultProps extends IRadarCompoundProps {
  defaultData: DataPoint[]
  isDefault?: boolean
  isViewPolygon?: boolean
  isPossibleDrawNode?: boolean
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
  radarType: 'NJNS' | 'TJNS' | 'MY'
  originKeywordPercents: OtherKeywordPercents
  otherKeywordPercents: OtherKeywordPercents
  frameSize: number
  radarSize: number
  framePadding: number
  hasOthers: boolean
  handleUpdateRadarData: (value: TrimmedDataProps) => void
}

export type {
  TrimmedDataProps,
  DataPoint,
  IRadarChartProps,
  IRadarCompoundProps,
  IRadarChartDraggableProps,
  IRadarChartDefaultProps,
  IAxisMaps,
  IRadarChartContainerProps,
}
