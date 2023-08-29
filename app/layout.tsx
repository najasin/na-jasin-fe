import RecoilRootWrapper from '@/store/recoilRootWrapper'

import { cookies } from 'next/headers'
import Script from 'next/script'

import '@/styles/global.scss'
import { gmarketSans } from '@/styles/local.fonts'

import Footer from '@/components/footer/footer'
import Gnb from '@/components/gnb/gnb'
import GnbRight from '@/components/gnb/gnbRight'

import TanstackProvider from '@/api/tanstack/tanstackProvider.context'

import * as gtag from '@/helpers/gtag'

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
      <Script
        async={true}
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', ${gtag.GA_TRACKING_ID}, { 
        page_path: window.location.pathname,
      });
    `,
        }}
      />
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
