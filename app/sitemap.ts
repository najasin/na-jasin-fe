import { MetadataRoute } from 'next'

const URL = 'https://na-jasin.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [''].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }))

  return [...routes]
}
