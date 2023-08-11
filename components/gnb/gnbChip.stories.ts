import type { Meta, StoryObj } from '@storybook/react'

import GnbChip from './gnbChip'
import { GnbChipStyle } from './gnbChip.types'

const meta: Meta<typeof GnbChip> = {
  title: 'Gnb/GnbChip',
  component: GnbChip,
}

export default meta
type Story = StoryObj<typeof GnbChip>

export const Grey: Story = {
  args: {
    type: 'button',
    style: GnbChipStyle.GREY,
    children: '유저 타입 변경',
    onClick: () => {
      console.log('clicked')
    },
  },
}

export const LightBlue: Story = {
  args: {
    type: 'button',
    style: GnbChipStyle.LIGHTBLUE,
    children: 'For Fun',
  },
}

export const DeepBlue: Story = {
  args: {
    type: 'button',
    style: GnbChipStyle.DEEPBLUE,
    children: 'For Dev',
  },
}
