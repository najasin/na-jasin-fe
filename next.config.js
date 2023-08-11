/** @type {import('next').NextConfig} */
const nextConfig = {
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
