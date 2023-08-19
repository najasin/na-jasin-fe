import type { Meta, StoryObj } from '@storybook/react'

import ItemBox from './itemBox'

type Story = StoryObj<typeof ItemBox>

const itemBox: Meta<typeof ItemBox> = {
  title: 'ItemBox',
  component: ItemBox,
}

export default itemBox

export const Default: Story = {
  args: {
    data: {
      id: 1,
      showCase: 'https://picsum.photos/id/237/200/300',
      layoutCase: 'https://picsum.photos/id/237/200/300s',
    },
  },
}
