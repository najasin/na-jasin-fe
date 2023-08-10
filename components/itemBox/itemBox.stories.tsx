import type { Meta, StoryObj } from '@storybook/react'

import ItemBox from './itemBox'

type Story = StoryObj<typeof ItemBox>

const itemBox: Meta<typeof ItemBox> = {
  title: 'ItemBox',
  component: ItemBox,
}

export default itemBox

export const Default: Story = {
  args: {},
}
