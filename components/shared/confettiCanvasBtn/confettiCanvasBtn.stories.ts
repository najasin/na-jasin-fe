import type { Meta, StoryObj } from '@storybook/react'

import ConfettiCanvasBtn from './confettiCanvasBtn'

const meta: Meta<typeof ConfettiCanvasBtn> = {
  title: 'Confetti/ConfettiCanvasBtn',
  component: ConfettiCanvasBtn,
}
export default meta

type Story = StoryObj<typeof ConfettiCanvasBtn>

export const Confetti: Story = {
  args: {},
}
