export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div id="loader-portal"></div>
      {children}
    </>
  )
}
