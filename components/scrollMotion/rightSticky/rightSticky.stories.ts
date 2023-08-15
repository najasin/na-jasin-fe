import type { Meta, StoryObj } from '@storybook/react'

import RightSticky from './rightSticky'

const meta: Meta<typeof RightSticky> = {
  title: 'OurStoryMotion/RightSticky',
  component: RightSticky,
}

export default meta
type Story = StoryObj<typeof RightSticky>

export const 스크롤시왼쪽텍스트에맞게오른쪽카드변경: Story = {
  args: {},
}
