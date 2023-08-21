import type { Meta, StoryObj } from '@storybook/react'

import Fab from './fab'

const fab: Meta<typeof Fab> = {
  title: 'Fab/Fab',
  component: Fab,
}

export default fab
type Story = StoryObj<typeof Fab>

export const Default: Story = {
  args: {},
}
