import type { Meta, StoryObj } from '@storybook/react'

import CopyToast from './copyToast'

const meta: Meta<typeof CopyToast> = {
  title: 'CopyToast/CopyToast',
  component: CopyToast,
}

export default meta
type Story = StoryObj<typeof CopyToast>

export const Success: Story = {
  args: { type: 'success' },
}

export const Error: Story = {
  args: { type: 'error' },
}
