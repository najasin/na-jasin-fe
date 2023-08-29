import type { Meta, StoryObj } from '@storybook/react'

import { ButtonStyle } from '@/components/shared/commonBtn/commonBtn.types'

import KeywordBtn from './keywordBtn'

const meta: Meta<typeof KeywordBtn> = {
  title: 'KeywordBtn/KeywordBtn',
  component: KeywordBtn,
}

export default meta
type Story = StoryObj<typeof KeywordBtn>

export const Active: Story = {
  args: {
    type: 'button',
    style: ButtonStyle.ACTIVE,
    children: '버튼',
  },
}

export const DeActive: Story = {
  args: {
    type: 'button',
    style: ButtonStyle.DEACTIVE,
    children: '버튼',
  },
}
