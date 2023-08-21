import type { Meta, StoryObj } from '@storybook/react'

import CircleButton from './circleButton'

const meta: Meta<typeof CircleButton> = {
  title: 'Fab/CircleButton',
  component: CircleButton,
}

export default meta
type Story = StoryObj<typeof CircleButton>

export const Plus: Story = {
  args: {
    size: 'lg',
    image: 'plus',
    action: true,
  },
}

export const Text: Story = {
  args: {
    size: 'md',
    text: '꿀팁받기',
    transparent: true,
  },
}

export const Facebook: Story = {
  args: {
    size: 'sm',
    image: 'facebook',
    action: true,
  },
}

export const Kakao: Story = {
  args: {
    size: 'sm',
    image: 'kakao',
    action: true,
  },
}
export const Instagram: Story = {
  args: {
    size: 'sm',
    image: 'instagram',
    action: true,
  },
}

export const Link: Story = {
  args: {
    size: 'sm',
    image: 'link',
    action: true,
  },
}
