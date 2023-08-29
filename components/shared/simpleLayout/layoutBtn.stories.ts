import type { Meta, StoryObj } from '@storybook/react'

import LayoutBtn from './layoutBtn'

const meta: Meta<typeof LayoutBtn> = {
  title: 'SimpleLayout/LayoutBtn',
  component: LayoutBtn,
}

export default meta
type Story = StoryObj<typeof LayoutBtn>

export const Default: Story = {
  args: {
    children: 'for dev도 사용해볼까?',
  },
}
