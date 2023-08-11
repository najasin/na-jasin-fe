import '@/styles/global.scss'
import { gmarketSans } from '@/styles/local.fonts'

import Gnb from '@/components/Gnb/Gnb'

import TanstackProvider from '@/api/tanstack/tanstackProvider.context'

import { META_ROOT } from './_meta'

export const metadata = META_ROOT

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={gmarketSans.className}>
      <body>
        <TanstackProvider>
          <Gnb />
          <main>{children}</main>
        </TanstackProvider>
      </body>
    </html>
  )
}
