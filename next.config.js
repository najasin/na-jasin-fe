/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'https://api.na-jasin.com/:path*',
      },
    ]
  },
  sassOptions: {
    prependData:
      '@use "styles/_utils.scss" as *; @use "styles/_mixin.scss" as *;',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
  },
}

module.exports = nextConfig
