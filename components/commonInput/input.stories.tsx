import type { Meta, StoryObj } from '@storybook/react'

import { Input } from './input'

const meta: Meta<typeof Input.TextField> = {
  title: 'Input',
  component: Input.TextField,
}
export default meta

type Story = StoryObj<typeof Input>

export const Empty: Story = {
  args: {},
}

export const Small: Story = {
  args: {
    placeholder: 'small이어요',
    variant: 'small',
    onChange: () => console.log('small'),
  },
}

export const Medium: Story = {
  args: {
    placeholder: 'medium입니다.',
    variant: 'medium',
    onChange: () => console.log('medium'),
  },
}

export const Large: Story = {
  args: {
    placeholder: 'large입니다.',
    variant: 'large',
    onChange: () => console.log('large'),
  },
}
