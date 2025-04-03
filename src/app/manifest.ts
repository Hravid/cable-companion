import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Cable Spacing Calculator',
    short_name: 'Cable Calc',
    description: 'Calculate and visualize cable spacing patterns for optimal distribution',
    start_url: '/',
    display: 'standalone',
    background_color: '#DDE6ED',
    theme_color: '#27374D',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
} 