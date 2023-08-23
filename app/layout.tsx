import RecoilRootWrapper from '@/store/recoilRootWrapper'

import { cookies } from 'next/headers'
import Script from 'next/script'

import '@/styles/global.scss'
import { gmarketSans } from '@/styles/local.fonts'

import Footer from '@/components/footer/footer'
import Gnb from '@/components/gnb/gnb'
import GnbRight from '@/components/gnb/gnbRight'

import TanstackProvider from '@/api/tanstack/tanstackProvider.context'

import { META_ROOT } from './_meta'

export const metadata = META_ROOT

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()

  const rft = cookieStore.get('rft')
  const act = cookieStore.get('act')

  return (
    <html lang="ko" className={gmarketSans.className}>
      <body>
        <TanstackProvider>
          <RecoilRootWrapper>
            <Gnb>
              <GnbRight isLog={!!(rft || act)} />
            </Gnb>
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
