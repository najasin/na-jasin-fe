import type { Meta, StoryObj } from '@storybook/react'

import Gnb from './gnb'

const meta: Meta<typeof Gnb> = {
  title: 'Gnb/Gnb',
  component: Gnb,
}

export default meta
type Story = StoryObj<typeof Gnb>

export const layout: Story = {
  args: {},
}
