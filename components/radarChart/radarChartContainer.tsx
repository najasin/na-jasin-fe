'use client'

import { RadarChart } from './radarChart'

const DATA = [
  { axis: 'strength', value: 10, order: 0 },
  { axis: 'intelligence', value: 2, order: 1 },
  { axis: 'charisma', value: 6, order: 2 },
  { axis: 'dexterity', value: 4, order: 3 },
  { axis: 'luck', value: 10, order: 4 },
]

const DEFAULT_DATA = [
  { axis: 'default1', value: 4, order: 0 },
  { axis: 'default2', value: 8, order: 1 },
  { axis: 'default3', value: 2, order: 2 },
  { axis: 'default4', value: 6, order: 3 },
  { axis: 'default5', value: 8, order: 4 },
]

const POLYGON_LAYOUT = {
  radarWidth: 300,
  radarHeight: 300,
  framePadding: 200,
}

export default function RadarChartContainer() {
  return (
    <RadarChart width={400} height={400}>
      <RadarChart.DraggablePolygon draggableData={DATA} {...POLYGON_LAYOUT} />
      <RadarChart.DefaultPolygon
        defaultData={DEFAULT_DATA}
        {...POLYGON_LAYOUT}
      />
    </RadarChart>
  )
}
