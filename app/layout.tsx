import '@/styles/global.scss'
import { gmarketSans } from '@/styles/local.fonts'

import TanstackProvider from '@/api/tanstack/tanstackProvider.context'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={gmarketSans.className}>
      <body>
        <TanstackProvider>{children}</TanstackProvider>
      </body>
    </html>
  )
}
