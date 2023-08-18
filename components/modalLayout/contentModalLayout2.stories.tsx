import type { Meta, StoryObj } from '@storybook/react'

import CommonBtn from '../commonBtn/commonBtn'
import ContentModalLayout from './contentModalLayout'

const contentModal: Meta<typeof ContentModalLayout> = {
  title: 'ModalLayout/ContentModalLayout',
  component: ContentModalLayout,
}

export default contentModal
type Story = StoryObj<typeof ContentModalLayout>

export const Default: Story = {
  args: {
    title: '자신이 다시 꾸미기',
    closeBtn: <button>X</button>,
    completeBtn: <CommonBtn>완료</CommonBtn>,
  },
}
