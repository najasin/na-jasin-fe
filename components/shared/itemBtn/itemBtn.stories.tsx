import type { Meta, StoryObj } from '@storybook/react'

import { ButtonStyle } from '@/components/shared/commonBtn/commonBtn.types'

import ItemBtn from './itemBtn'

const meta: Meta<typeof ItemBtn> = {
  title: 'ItemBtn/ItemBtn',
  component: ItemBtn,
}

export default meta
type Story = StoryObj<typeof ItemBtn>

export const Active: Story = {
  args: {
    type: 'button',
    style: ButtonStyle.ACTIVE,
    children: '버튼',
  },
}

export const DeActive: Story = {
  args: {
    type: 'button',
    style: ButtonStyle.DEACTIVE,
    children: '버튼',
  },
}
