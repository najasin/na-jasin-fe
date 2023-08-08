import type { Meta, StoryObj } from '@storybook/react'

import ProgressBar from './progressBar'

const progressBar: Meta<typeof ProgressBar> = {
  component: ProgressBar,
}

export default progressBar
type Story = StoryObj<typeof ProgressBar>

export const Default: Story = {
  args: { currentSteps: '3', totalSteps: ['1', '2', '3', '4', '5'] },
}

export const Empty: Story = {
  args: { currentSteps: '3', totalSteps: ['1', '2', '3', '4', '5'] },
}

export const Filled: Story = {
  args: { currentSteps: '3', totalSteps: ['1', '2', '3', '4', '5'] },
}


export const Testzz: Story = {

  args: { currentSteps: '3', totalSteps: ['1', '2', '3', '4', '5'] },
}