import { MetadataRoute } from 'next'
import { ROUTE_CHAT, ROUTE_PRIVACY, ROUTE_PROFILE, ROUTE_ROOT, ROUTE_TERMS } from './lib/routes/routes'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: [
                ROUTE_ROOT,
                ROUTE_PRIVACY,
                ROUTE_TERMS
            ],
            disallow: [
                ROUTE_CHAT,
                ROUTE_PROFILE,
            ],
        },
        sitemap: 'https://warn.group/sitemap.xml',
    }
}