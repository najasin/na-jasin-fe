import RecoilRootWrapper from '@/store/recoilRootWrapper'

import Script from 'next/script'

import '@/styles/global.scss'
import { gmarketSans } from '@/styles/local.fonts'

import Footer from '@/components/footer/footer'
import Gnb from '@/components/gnb/gnb'

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
          <RecoilRootWrapper>
            <Gnb />
            <main>{children}</main>
            <Footer />
          </RecoilRootWrapper>
        </TanstackProvider>
        <Script
          src="https://developers.kakao.com/sdk/js/kakao.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  )
}
