import type { Meta, StoryObj } from '@storybook/react'

import DescriptionCard from './descriptionCard'

const meta: Meta<typeof DescriptionCard> = {
  title: 'DescriptionCard',
  component: DescriptionCard,
}

export default meta
type Story = StoryObj<typeof DescriptionCard>

export const WithNickname: Story = {
  args: {
    qa: [
      { question: '질문 1', answer: '답변 1' },
      { question: '질문 2', answer: '답변 2' },
    ],
    nickname: 'example',
  },
}

export const WithoutNickname: Story = {
  args: {
    qa: [
      { question: '질문 1', answer: '답변 1' },
      { question: '질문 2', answer: '답변 2' },
      { question: '질문 3', answer: '답변 3' },
      { question: '질문 4', answer: '답변 4' },
      { question: '질문 5', answer: '답변 5' },
      { question: '질문 6', answer: '답변 6' },
      { question: '질문 7', answer: '답변 7' },
      { question: '질문 8', answer: '답변 8' },
      { question: '질문 9', answer: '답변 9' },
      { question: '질문 10', answer: '답변 10' },
    ],
  },
}
