import type { Meta, StoryObj } from '@storybook/react'

import RadarChartContainer from './radarChartContainer'

const meta: Meta<typeof RadarChartContainer> = {
  title: 'RadarChart/RadarChartContainer',
  component: RadarChartContainer,
}
export default meta

type Story = StoryObj<typeof RadarChartContainer>

export const RadarContainer: Story = {
  args: {},
}
