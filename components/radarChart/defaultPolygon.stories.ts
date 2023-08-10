import type { Meta, StoryObj } from '@storybook/react'

import { RadarChart } from './radarChart'

const meta: Meta<typeof RadarChart.DefaultPolygon> = {
  title: 'RadarChart/DefaultPolygon',
  component: RadarChart.DefaultPolygon,
}
export default meta

type Story = StoryObj<typeof RadarChart.DefaultPolygon>

const DATA = [
  { axis: 'default1', value: 4, order: 0 },
  { axis: 'default2', value: 8, order: 1 },
  { axis: 'default3', value: 2, order: 2 },
  { axis: 'default4', value: 6, order: 3 },
  { axis: 'default5', value: 8, order: 4 },
]

export const DefaultPolygon: Story = {
  args: {
    defaultData: DATA,
    radarWidth: 300,
    radarHeight: 300,
    framePadding: 200,
    onDragOutUserInput: () => {},
  },
}
