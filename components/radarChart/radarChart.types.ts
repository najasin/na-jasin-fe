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

export type {
  DataPoint,
  IRadarChartProps,
  IRadarCompoundProps,
  IRadarChartDraggableProps,
  IRadarChartDefaultProps,
}
