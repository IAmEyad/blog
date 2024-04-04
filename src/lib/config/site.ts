import type { SiteConfig } from '$lib/types/site'

export const site: SiteConfig = {
  protocol: import.meta.env.URARA_SITE_PROTOCOL ?? import.meta.env.DEV ? 'http://' : 'https://',
  domain: 'iameyad.dev',
  title: 'iameyad',
  subtitle: 'Another devblog',
  lang: 'en-US',
  description: 'Another devblog',
  author: {
    avatar: '/assets/maskable@512.png',
    name: 'Eyad Hasan',
    status: '',
    bio: 'DevOps Engineer.  Powerlifter.  Video Game enjoyer.',
    metadata: [
      {
        icon: 'i-heroicons-solid-code-bracket-square',
        link: 'https://github.com/iameyad'
      },
      {
        icon: 'i-heroicons-solid-rss',
        link: '/atom.xml',
        rel: 'rss'
      }
    ]
  },
  themeColor: '#3D4451'
}
