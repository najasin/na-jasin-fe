import dynamic from 'next/dynamic'

const GhostCursorController = dynamic(
  () => import('@/components/ghostCursor/ghostCursorController'),
  {
    ssr: false,
  },
)

export default function UserTypeLayout({
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
