import localFont from 'next/font/local'

export const gmarketSans = localFont({
  src: [
    {
      path: '../public/fonts/GmarketSansBold.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fdonts/GmarketSansMedium.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/GmarketSansLight.woff',
      weight: '300',
      style: 'normal',
    },
  ],
})

export const hsYuji = localFont({
  src: [
    {
      path: '../public/fonts/HSYuji.woff',
      weight: '400',
      style: 'normal',
    },
  ],
})
