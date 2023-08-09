import type { Meta, StoryObj } from '@storybook/react'

import CircleButton from './circleButton'

const meta: Meta<typeof CircleButton> = {
  title: 'CircleButton',
  component: CircleButton,
}

export default meta
type Story = StoryObj<typeof CircleButton>

export const Plus: Story = {
  args: {
    size: 'lg',
    image: 'plus',
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
  },
}

export const Kakao: Story = {
  args: {
    size: 'sm',
    image: 'kakao',
  },
}
export const Instagram: Story = {
  args: {
    size: 'sm',
    image: 'instagram',
  },
}

export const Link: Story = {
  args: {
    size: 'sm',
    image: 'link',
  },
}
