import type { Meta, StoryObj } from '@storybook/react'

import ScrollSlides from './scrollSlides'

const meta: Meta<typeof ScrollSlides> = {
  title: 'OurStoryMotion/ScrollSlides',
  component: ScrollSlides,
}

export default meta
type Story = StoryObj<typeof ScrollSlides>

export const 스크롤시캐러셀: Story = {
  args: {},
}
