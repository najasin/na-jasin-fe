import type { Meta, StoryObj } from '@storybook/react'

import RadarChartContainer from './radarChartContainer'

const meta: Meta<typeof RadarChartContainer> = {
  title: 'RadarChart/RadarChartContainer',
  component: RadarChartContainer,
}
export default meta

type Story = StoryObj<typeof RadarChartContainer>

export const RadarContainerInRegisteredMobile: Story = {
  args: {
    isRegistered: true,
    originKeywordPercents: {
      키워드1: 2.6,
      키워드2: 2.6,
      키워드3: 2.6,
      키워드4: 2.6,
      키워드5: 2.6,
    },
    otherKeywordPercents: {},
    frameSize: 500,
    radarSize: 300,
    framePadding: 200,
  },
}

export const RadarContainerNotRegistered: Story = {
  args: {
    isRegistered: false,
    originKeywordPercents: {
      키워드1: 6,
      키워드2: 10,
      키워드3: 3,
      키워드4: 4,
      키워드5: 7,
    },
    otherKeywordPercents: {
      키워드1: 3,
      키워드2: 8,
      키워드3: 5,
      키워드4: 6,
      키워드5: 4,
    },
    frameSize: 500,
    radarSize: 300,
    framePadding: 200,
  },
}
