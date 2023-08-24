import dynamic from 'next/dynamic'

const GhostCursorController = dynamic(
  () => import('@/components/ghostCursor/ghostCursorController'),
  {
    ssr: false,
  },
)

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div id="modal-root"></div>
      {children}
      <GhostCursorController />
    </>
  )
}
