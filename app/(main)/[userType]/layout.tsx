export default function UserTypeLayout({
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
