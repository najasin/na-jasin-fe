import type { Meta, StoryObj } from '@storybook/react'

import ProgressBar from './progressBar'

const progressBar: Meta<typeof ProgressBar> = {
  component: ProgressBar,
}

export default progressBar
type Story = StoryObj<typeof ProgressBar>

export const First: Story = {
  args: { currentStep: '1', totalSteps: ['1', '2', '3', '4', '5'] },
}

export const Half: Story = {
  args: { currentStep: '3', totalSteps: ['1', '2', '3', '4', '5'] },
}

export const AllFilled: Story = {
  args: { currentStep: '5', totalSteps: ['1', '2', '3', '4', '5'] },
}
