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
    cardDatas: [
      {
        nickname: 'hello',
        datas: [
          {
            id: 'ex1',
            answer: '저를 기분좋게 만드는 건 맛있는 음식이에요.',
          },
          {
            id: 'ex2',
            answer: '저를 기분좋게 만드는 건 맛있는 음식이에요.',
          },
        ],
      },
      {
        nickname: 'bye',
        datas: [
          {
            id: 'ex3',
            answer: '저를 기분좋게 만드는 건 맛있는 음식이에요.',
          },
          {
            id: 'ex4',
            answer: '저를 기분좋게 만드는 건 맛있는 음식이에요.',
          },
        ],
      },
    ],
  },
}
