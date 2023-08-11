import type { Meta, StoryObj } from '@storybook/react'

import FabForDf from './fabForDf'

const fab: Meta<typeof FabForDf> = {
  title: 'Components/FabForDf',
  component: FabForDf,
}

export default fab
type Story = StoryObj<typeof FabForDf>

export const Default: Story = {
  args: {},
}
