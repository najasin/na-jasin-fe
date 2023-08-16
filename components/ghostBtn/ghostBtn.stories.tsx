import type { Meta, StoryObj } from '@storybook/react'

import GhostBtn from './ghostBtn'

const meta: Meta<typeof GhostBtn> = {
  title: 'GhostBtn/GhostBtn',
  component: GhostBtn,
}

export default meta
type Story = StoryObj<typeof GhostBtn>

export const Default: Story = {
  args: {
    type: 'button',
  },
}
