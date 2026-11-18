/**
 * Manually curated Instagram preview. This is NOT a live feed —
 * add photographs that are already posted on @sns_lenses (with permission).
 */
export interface InstagramPreview {
  id: string
  image: string
  alt: string
  placeholder?: boolean
}

export const instagramPreview: InstagramPreview[] = [
  { id: 'ig-1', image: '/images/portfolio/portraits/Photo_15.jpeg', alt: 'Placeholder Instagram preview — portrait', placeholder: true },
  { id: 'ig-2', image: '/images/portfolio/events/Photo_22.jpeg', alt: 'Placeholder Instagram preview — event', placeholder: true },
  { id: 'ig-3', image: '/images/portfolio/couples/Photo_26.jpeg', alt: 'Placeholder Instagram preview — couple', placeholder: true },
  { id: 'ig-4', image: '/images/portfolio/nature/Photo_14.jpeg', alt: 'Placeholder Instagram preview — nature', placeholder: true },
  { id: 'ig-5', image: '/images/portfolio/lifestyle/Photo_9.jpeg', alt: 'Placeholder Instagram preview — lifestyle', placeholder: true },
  { id: 'ig-6', image: '/images/portfolio/other/Photo_19.jpeg', alt: 'Placeholder Instagram preview — abstract', placeholder: true },
]
