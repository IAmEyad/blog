import type { SiteConfig } from '$lib/types/site'

export const site: SiteConfig = {
  protocol: import.meta.env.URARA_SITE_PROTOCOL ?? import.meta.env.DEV ? 'http://' : 'https://',
  domain: import.meta.env.URARA_SITE_DOMAIN ?? 'urara-demo.netlify.app',
  title: 'iameyad',
  subtitle: 'Another devblog',
  lang: 'en-US',
  description: 'Powered by a lack of sleep',
  author: {
    avatar: '/assets/maskable@512.png',
    name: 'Eyad Hasan',
    status: '',
    bio: 'Powerlifting DevOps Engineer.',
    metadata: [
      {
        icon: 'i-mdi-github',
        link: 'https://github.com/iameyad'
      },
      {
        icon: 'i-ic-twotone-rss-feed',
        link: '/atom.xml',
        rel: 'rss'
      }
    ]
  },
  themeColor: '#3D4451'
}
