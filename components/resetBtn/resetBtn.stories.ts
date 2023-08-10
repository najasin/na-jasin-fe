import type { Meta, StoryObj } from '@storybook/react'

import ResetBtn from './resetBtn'

const meta: Meta<typeof ResetBtn> = {
  title: 'ResetBtn/ResetBtn',
  component: ResetBtn,
}

export default meta
type Story = StoryObj<typeof ResetBtn>

const handleClick = () => console.log('reset button clicked')

export const Default: Story = {
  args: {
    onClick: handleClick,
  },
}
