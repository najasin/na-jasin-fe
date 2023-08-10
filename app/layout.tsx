import '@/styles/global.scss'
import { gmarketSans } from '@/styles/local.fonts'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={gmarketSans.className}>
      <body>{children}</body>
    </html>
  )
}
