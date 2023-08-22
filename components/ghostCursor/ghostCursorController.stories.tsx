import type { Meta, StoryObj } from '@storybook/react'

import GhostCursorController from './ghostCursorController'

const meta: Meta<typeof GhostCursorController> = {
  title: 'GhostCursor/GhostCursorController',
  component: GhostCursorController,
}

export default meta
type Story = StoryObj<typeof GhostCursorController>

export const GCC: Story = {
  args: {},
}
