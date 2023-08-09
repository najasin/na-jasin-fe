import localFont from 'next/font/local'

export const gmarketSans = localFont({
  src: [
    {
      path: './GmarketSansBold.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: './GmarketSansMedium.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: './GmarketSansLight.woff',
      weight: '300',
      style: 'normal',
    },
  ],
})

export const hsYuji = localFont({
  src: [
    {
      path: './HSYuji.woff',
      weight: '400',
      style: 'normal',
    },
  ],
})
