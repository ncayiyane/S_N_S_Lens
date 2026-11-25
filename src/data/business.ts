/** Central business information. Update details here and they change site-wide. */
export const business = {
  name: 'SnS_Lenses',
  photographer: 'Snomelhlwana',
  tagline: 'Every frame tells a story.',
  location: {
    region: 'Kouga, Eastern Cape',
    country: 'South Africa',
    full: 'Kouga, Eastern Cape, South Africa',
  },
  serviceAreas: ['Humansdorp', 'Jeffreys Bay', 'St Francis Bay', 'Hankey', 'Thornhill', 'Surrounding Kouga areas'],
  phone: { display: '063 346 7410', href: 'tel:+27633467410' },
  email: { display: 'snomehlwana1@gmail.com', href: 'mailto:snomehlwana1@gmail.com' },
  instagram: { handle: '@SnS_Lenses', url: 'https://www.instagram.com/sns_lenses/' },
  whatsapp: { number: '27633467410', display: '+27 63 346 7410' },
} as const

export interface SiteImage {
  src: string
  alt: string
  width: number
  height: number
  /** Set to false once replaced with a real SnS_Lenses photograph. */
  placeholder?: boolean
}

/** Single-use images. Replace the files in public/images and flip `placeholder` to false. */
export const siteImages = {
  hero: {
    src: '/images/hero/Photo_30.jpeg',
    alt: 'Placeholder hero artwork — replace with a signature SnS_Lenses photograph',
    width: 2400,
    height: 1500,
    placeholder: true,
  },
  about: {
    src: '/images/about/Photo_2.jpeg',
    alt: 'Placeholder artwork — replace with a photograph of the photographer or behind the scenes',
    width: 1200,
    height: 1500,
    placeholder: true,
  },
  booking: {
    src: '/images/portfolio/nature/photo-014.webp',
    alt: 'Placeholder landscape artwork',
    width: 1200,
    height: 1600,
    placeholder: true,
  },
} satisfies Record<string, SiteImage>
