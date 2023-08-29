import type { Meta, StoryObj } from '@storybook/react'

import FormBox from './formBox'

const meta: Meta<typeof FormBox> = {
  title: 'formBox/FormBox',
  component: FormBox,
}

export default meta
type Story = StoryObj<typeof FormBox>

const handleBackClick = () => console.log('back click')

export const Default: Story = {
  args: {
    title: '제목',
    children: '컨텐츠',
    showBack: true,
    paddingTop: 23,
    onBackClick: handleBackClick,
  },
}
