interface IRadarChart {
  width: number
  height: number
}

interface DataPoint {
  axis: string
  value: number
  order: number
}

export type { IRadarChart, DataPoint }
