import type { Meta, StoryObj } from '@storybook/react'

import BackBtn from './backBtn'

const meta: Meta<typeof BackBtn> = {
  title: 'formBox/BackBtn',
  component: BackBtn,
}

export default meta
type Story = StoryObj<typeof BackBtn>

export const Default: Story = {
  args: {
    onClick: () => {
      console.log('click')
    },
  },
}
