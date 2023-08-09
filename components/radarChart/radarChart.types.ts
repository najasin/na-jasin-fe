interface DataPoint {
  axis: string
  value: number
  order: number
}

interface IRadarChartProps {
  width: number
  height: number
  draggableData: DataPoint[]
  defaultData: DataPoint[]
}

export type { IRadarChartProps, DataPoint }
