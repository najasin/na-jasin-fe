import type { Meta, StoryObj } from '@storybook/react'

import { RadarChart } from './radarChart'

const meta: Meta<typeof RadarChart.DraggablePolygon> = {
  title: 'RadarChart/DraggablePolygon',
  component: RadarChart.DraggablePolygon,
}
export default meta

type Story = StoryObj<typeof RadarChart.DraggablePolygon>

const DATA = [
  { axis: 'strength', value: 10, order: 0 },
  { axis: 'intelligence', value: 2, order: 1 },
  { axis: 'charisma', value: 6, order: 2 },
  { axis: 'dexterity', value: 4, order: 3 },
  { axis: 'luck', value: 10, order: 4 },
]

export const DraggablePolygon: Story = {
  args: {
    draggableData: DATA,
    radarWidth: 300,
    radarHeight: 300,
    framePadding: 200,
    onDragOutUserInput: () => {},
  },
}
