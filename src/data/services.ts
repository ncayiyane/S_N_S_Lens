/**
 * Photography services. Edit, add or remove entries here.
 * Each service gets its own "Enquire on WhatsApp" button with a pre-filled message.
 * No prices are listed — pricing is discussed directly on WhatsApp.
 */
export interface Service {
  id: string
  title: string
  description: string
  image: string
  alt: string
  placeholder?: boolean
}

export const services: Service[] = [
  {
    id: 'portrait',
    title: 'Portrait Photography',
    description: 'Portraits that capture personality, expression and character — natural, honest and true to you.',
    image: '/images/services/Photo_15.jpeg',
    alt: 'Placeholder artwork for portrait photography',
    placeholder: true,
  },
  {
    id: 'events',
    title: 'Event Photography',
    description: 'Celebrations and gatherings documented as they unfold — the atmosphere, the people and the moments in between.',
    image: '/images/services/Photo_14.jpeg',
    alt: 'Placeholder artwork for event photography',
    placeholder: true,
  },
  {
    id: 'lifestyle',
    title: 'Lifestyle Photography',
    description: 'Natural, story-driven images of everyday life — wherever your story happens.',
    image: '/images/services/Photo_17.jpeg',
    alt: 'Placeholder artwork for lifestyle photography',
    placeholder: true,
  },
  {
    id: 'outdoor',
    title: 'Outdoor Photography',
    description: 'Sessions set against the open landscapes and natural light of the Kouga region.',
    image: '/images/services/Photo_20.jpeg',
    alt: 'Placeholder artwork for outdoor photography',
    placeholder: true,
  },
  {
    id: 'custom',
    title: 'Custom Photography Sessions',
    description: 'Have something specific in mind? Share your idea and let’s talk about bringing it to life.',
    image: '/images/services/Photo_19.jpeg',
    alt: 'Placeholder artwork for a custom photography session',
    placeholder: true,
  },
]
