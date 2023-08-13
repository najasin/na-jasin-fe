import type { Meta, StoryObj } from '@storybook/react'

import MyDescriptionCard from './myDescriptionCard'

const meta: Meta<typeof MyDescriptionCard> = {
  title: 'DescriptionCard/MyDescriptionCard',
  component: MyDescriptionCard,
}

export default meta
type Story = StoryObj<typeof MyDescriptionCard>

export const Default: Story = {
  args: {
    answer: '안녕하세요. 저는 웹 프론트엔드 개발자입니다.',
  },
}
