import type { Meta, StoryObj } from '@storybook/react'

import SimpleLayout from './simpleLayout'

const meta: Meta<typeof SimpleLayout> = {
  title: 'SimpleLayout/SimpleLayout',
  component: SimpleLayout,
}

export default meta
type Story = StoryObj<typeof SimpleLayout>

export const layout: Story = {
  args: {
    title: '제목입니다',
    children: '컨텐츠입니다',
  },
}
