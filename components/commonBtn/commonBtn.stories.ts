import type { Meta, StoryObj } from '@storybook/react'

import CommonBtn from './commonBtn'
import { ButtonStyle } from './commonBtn.types'

const meta: Meta<typeof CommonBtn> = {
  title: 'CommonBtn/CommonBtn',
  component: CommonBtn,
}

export default meta
type Story = StoryObj<typeof CommonBtn>

export const Active: Story = {
  args: {
    type: 'submit',
    style: ButtonStyle.ACTIVE,
    children: '버튼',
  },
}

export const DeActive: Story = {
  args: {
    type: 'submit',
    style: ButtonStyle.DEACTIVE,
    children: '버튼',
  },
}
