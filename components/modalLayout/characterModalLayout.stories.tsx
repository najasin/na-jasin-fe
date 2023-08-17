import type { Meta, StoryObj } from '@storybook/react'

import CharacterModalLayout from './characterModalLayout'

const characterModal: Meta<typeof CharacterModalLayout> = {
  title: 'ModalLayout/CharacterModalLayout',
  component: CharacterModalLayout,
}

export default characterModal
type Story = StoryObj<typeof CharacterModalLayout>

export const Default: Story = {
  args: {
    title: '자신이 다시 꾸미기',
    closeBtn: <button>X</button>,
    character: <div>Character</div>,
    children: <div>Content</div>,
  },
}
