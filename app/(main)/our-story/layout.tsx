import dynamic from 'next/dynamic'

const GhostCursorController = dynamic(
  () => import('@/components/shared/ghostCursor/ghostCursorController'),
  {
    ssr: false,
  },
)

export default function OurStoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <GhostCursorController />
    </>
  )
}
