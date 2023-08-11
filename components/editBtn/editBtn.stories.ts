import type { Meta, StoryObj } from '@storybook/react'

import EditBtn from './editBtn'

const meta: Meta<typeof EditBtn> = {
  title: 'EditBtn/EditBtn',
  component: EditBtn,
}

export default meta
type Story = StoryObj<typeof EditBtn>

const handleClick = () => console.log('edit button clicked')

export const Default: Story = {
  args: {
    onClick: handleClick,
  },
}
