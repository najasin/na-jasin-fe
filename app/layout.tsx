import Gnb from '@/components/Gnb/Gnb'
import '@/styles/global.scss'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <Gnb />
      <body>{children}</body>
    </html>
  )
}
