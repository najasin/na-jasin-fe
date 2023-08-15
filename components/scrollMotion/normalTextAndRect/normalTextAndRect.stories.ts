import type { Meta, StoryObj } from '@storybook/react'

import NormalTextAndRect from './normalTextAndRect'

const meta: Meta<typeof NormalTextAndRect> = {
  title: 'OurStoryMotion/NormalTextAndRect',
  component: NormalTextAndRect,
}

export default meta
type Story = StoryObj<typeof NormalTextAndRect>

export const 스크롤시텍스트와이미지등장: Story = {
  args: {},
}
