import type { Meta, StoryObj } from '@storybook/react'

import dynamic from 'next/dynamic'

const GhostCursor = dynamic(
  () => import('@/components/ghostCursor/ghostCursor'),
  {
    ssr: false,
  },
)

const meta: Meta<typeof GhostCursor> = {
  title: 'GhostCursor/GhostCursor',
  component: GhostCursor,
}

export default meta
type Story = StoryObj<typeof GhostCursor>

export const GC: Story = {
  args: {},
}
