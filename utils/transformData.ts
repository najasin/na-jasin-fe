interface DataPoint {
  axis: string
  value: number
  order: number
}

interface DataObject {
  [key: string]: number
}

export function transformData(dataArray: DataPoint[]): DataObject {
  const transformedData: DataObject = {}
  dataArray.forEach((item) => {
    transformedData[item.axis] = item.value
  })
  return transformedData
}
