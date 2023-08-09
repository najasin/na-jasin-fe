import type { Meta, StoryObj } from '@storybook/react'

import RadarChartContainer from './radarChartContainer'

const meta: Meta<typeof RadarChartContainer> = {
  title: 'RadarChart',
  component: RadarChartContainer,
  args: {},
}
export default meta
type Story = StoryObj<typeof RadarChartContainer>

export const DefaultAndDraggable: Story = {
  args: {},
}
