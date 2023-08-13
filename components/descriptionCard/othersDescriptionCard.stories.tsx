import type { Meta, StoryObj } from '@storybook/react'

import OthersDescriptionCard from './othersDescriptionCard'

const meta: Meta<typeof OthersDescriptionCard> = {
  title: 'DescriptionCard/OthersDescriptionCard',
  component: OthersDescriptionCard,
}

export default meta
type Story = StoryObj<typeof OthersDescriptionCard>

export const Default: Story = {
  args: {
    answers: [
      {
        answer: '저와 친해지는 방법은 맛있는 것을 사주는 것이에요.',
        id: 'ex1',
      },
      { answer: '저를 기분좋게 만드는 건 맛있는 음식이에요.', id: 'ex2' },
    ],
    nickname: 'example',
  },
}
