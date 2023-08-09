import type { Meta, StoryObj } from '@storybook/react'

import { Input } from './input'
import { TextField } from './inputTextField.stories'

const meta: Meta<typeof Input> = {
  title: 'Input',
  component: Input,
}
export default meta

type Story = StoryObj<typeof Input>

export const Small: Story = {
  args: {
    variant: 'small',
    children: <Input.TextField {...TextField.args} />,
  },
}

export const Medium: Story = {
  args: {
    variant: 'medium',
    children: <Input.TextField {...TextField.args} />,
  },
}
export const Large: Story = {
  args: {
    variant: 'large',
    children: <Input.TextField {...TextField.args} />,
  },
}
