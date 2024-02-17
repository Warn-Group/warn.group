import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const base_url = 'https://warn.group'

    return [
        {
            url: `${base_url}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
    ]
}