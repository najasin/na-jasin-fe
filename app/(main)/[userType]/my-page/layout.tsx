export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div id="modal-root"></div>
      {children}
    </>
  )
}
