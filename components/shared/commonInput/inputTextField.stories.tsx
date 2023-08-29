import type { Meta, StoryObj } from '@storybook/react'

import { Input } from './input'

const meta: Meta<typeof Input.TextField> = {
  title: 'Input/TextField',
  component: Input.TextField,
}
export default meta

type Story = StoryObj<typeof Input.TextField>

export const Empty: Story = {
  args: {},
}

export const TextField: Story = {
  args: {
    placeholder: 'placeholder입니다',
    onChange: () => console.log('small'),
  },
}
