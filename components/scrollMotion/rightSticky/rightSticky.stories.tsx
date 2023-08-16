import type { Meta, StoryObj } from '@storybook/react'

import MockHeight from '../shared/mockHeight'
import RightSticky from './rightSticky'

const meta: Meta<typeof RightSticky> = {
  title: 'OurStoryMotion/RightSticky',
  component: RightSticky,
  decorators: [
    // eslint-disable-next-line @typescript-eslint/naming-convention
    (Story: () => JSX.Element) => (
      <div>
        <MockHeight />
        <Story />
        <MockHeight />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof RightSticky>

export const 스크롤시왼쪽텍스트에맞게오른쪽카드변경: Story = {
  args: {},
}
