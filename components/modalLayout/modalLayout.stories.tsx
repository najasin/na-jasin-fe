import type { Meta, StoryObj } from '@storybook/react'

import CommonBtn from '../commonBtn/commonBtn'
import ModalLayout from './modalLayout'

const contentModal: Meta<typeof ModalLayout> = {
  title: 'ModalLayout/ModalLayout',
  component: ModalLayout,
}

export default contentModal
type Story = StoryObj<typeof ModalLayout>

export const Content: Story = {
  args: {
    title: '자신이 다시 꾸미기',
    closeBtn: <button>X</button>,
    content: <div>Content</div>,
    completeBtn: <CommonBtn>완료</CommonBtn>,
  },
}

export const Character: Story = {
  args: {
    title: '자신이 다시 꾸미기',
    closeBtn: <button>X</button>,
    content: <div>Content</div>,
    character: <div>Character</div>,
  },
}
