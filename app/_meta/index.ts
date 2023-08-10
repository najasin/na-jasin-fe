const META_ROOT = {
  title: {
    template: '%s : Na-JaSin',
    default: 'Na-JaSin',
  },
  description: '나에 대해서 파악하고, 나를 설명할 수 있게 해주는 서비스',
  metadataBase: new URL('https://na-jasin.com'),
  openGraph: {
    title: 'Na-JaSin',
    description: '나에 대해서 파악하고, 나를 설명할 수 있게 해주는 서비스',
    url: 'https://na-jasin.com',
    siteName: 'najasin',
    images: {
      url: 'https://i.ibb.co/DpfKPC9/img-info.png',
      width: 1168,
      height: 561,
      alt: 'najasin',
    },
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: {
      url: 'https://i.ibb.co/DpfKPC9/img-info.png',
      width: 1168,
      height: 561,
      alt: 'najasin',
    },
    title: 'Na-JaSin',
    description: '나에 대해서 파악하고, 나를 설명할 수 있게 해주는 서비스',
  },
}

export { META_ROOT }
