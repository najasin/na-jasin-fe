import type { Meta, StoryObj } from '@storybook/react'

import CircleBtn from './circleBtn'

const meta: Meta<typeof CircleBtn> = {
  title: 'CircleBtn/CircleBtn',
  component: CircleBtn,
}

export default meta
type Story = StoryObj<typeof CircleBtn>

export const Default: Story = {
  args: {
    type: 'button',
    children: '버튼',
  },
}
