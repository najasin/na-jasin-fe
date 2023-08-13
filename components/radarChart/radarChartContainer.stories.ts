import type { Meta, StoryObj } from '@storybook/react'

import RadarChartContainer from './radarChartContainer'

const meta: Meta<typeof RadarChartContainer> = {
  title: 'RadarChart/RadarChartContainer',
  component: RadarChartContainer,
}
export default meta

type Story = StoryObj<typeof RadarChartContainer>

const initialKeywordPercents = {
  키워드1: 2.6,
  키워드2: 2.6,
  키워드3: 2.6,
  키워드4: 2.6,
  키워드5: 2.6,
}

const originKeywordPercents = {
  키워드1: 4,
  키워드2: 6,
  키워드3: 3,
  키워드4: 8,
  키워드5: 10,
}

const otherKeywordPercents = {
  키워드1: 2,
  키워드2: 5,
  키워드3: 7,
  키워드4: 9,
  키워드5: 10,
}

export const Radar등록하기페이지: Story = {
  args: {
    radarType: 'NJNS',
    originKeywordPercents: initialKeywordPercents,
    otherKeywordPercents: {},
    frameSize: 350,
    radarSize: 200,
    framePadding: 150,
    hasOthers: false,
  },
}

export const Radar마이페이지AND타인X: Story = {
  args: {
    radarType: 'MY',
    originKeywordPercents,
    otherKeywordPercents: originKeywordPercents,
    frameSize: 350,
    radarSize: 200,
    framePadding: 150,
    hasOthers: false,
  },
}

export const Radar마이페이지AND타인O: Story = {
  args: {
    radarType: 'MY',
    originKeywordPercents,
    otherKeywordPercents,
    frameSize: 350,
    radarSize: 200,
    framePadding: 150,
    hasOthers: true,
  },
}

export const Radar타적나사AND타인X: Story = {
  args: {
    radarType: 'TJNS',
    originKeywordPercents,
    otherKeywordPercents: originKeywordPercents,
    frameSize: 350,
    radarSize: 200,
    framePadding: 150,
    hasOthers: false,
  },
}

export const Radar타적나사AND타인O: Story = {
  args: {
    radarType: 'TJNS',
    originKeywordPercents,
    otherKeywordPercents,
    frameSize: 350,
    radarSize: 200,
    framePadding: 150,
    hasOthers: true,
  },
}
