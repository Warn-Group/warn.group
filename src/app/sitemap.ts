import { MetadataRoute } from 'next'

import { ROUTE_BASE } from './lib/routes/routes'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: `${ROUTE_BASE}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
    ]
}