/**
 * Central gallery data. Add, remove or recategorise photographs here —
 * no component changes needed.
 *
 * - Put image files in public/images/portfolio/<category>/
 * - `width` / `height` are the image's pixel dimensions (used for the masonry layout & to prevent layout shift)
 * - `featured: true` shows the image in the "A Collection of Moments" section
 * - `large: true` lets the image span two columns in the desktop gallery (best for landscape images)
 * - Remove `placeholder: true` once the image is a real SnS_Lenses photograph
 */

/** Edit this list to rename, add or remove categories. */
export const galleryCategories = ['Portraits', 'Events', 'Couples', 'Lifestyle', 'Nature', 'Other'] as const

export type GalleryCategory = (typeof galleryCategories)[number]

export interface GalleryImage {
  id: string
  title: string
  category: GalleryCategory
  image: string
  width: number
  height: number
  alt: string
  description?: string
  featured?: boolean
  large?: boolean
  placeholder?: boolean
}

export const gallery: GalleryImage[] = [
  {
    id: 'photo-001',
    title: 'Portrait Study I',
    category: 'Portraits',
    image: '/images/portfolio/portraits/Photo_34.jpeg',
    width: 1200,
    height: 1600,
    alt: 'Placeholder artwork for portraits photography — Portrait Study I',
    description: 'Placeholder image. Replace with an SnS_Lenses photograph.',
    featured: true,
    placeholder: true,
  },
  {
    id: 'photo-002',
    title: 'Portrait Study II',
    category: 'Portraits',
    image: '/images/portfolio/portraits/Photo_40.jpeg',
    width: 1200,
    height: 1500,
    alt: 'Placeholder artwork for portraits photography — Portrait Study II',
    description: 'Placeholder image. Replace with an SnS_Lenses photograph.',
    placeholder: true,
  },
  {
    id: 'photo-003',
    title: 'Portrait Study III',
    category: 'Portraits',
    image: '/images/portfolio/portraits/Photo_5.jpeg',
    width: 1200,
    height: 1800,
    alt: 'Placeholder artwork for portraits photography — Portrait Study III',
    description: 'Placeholder image. Replace with an SnS_Lenses photograph.',
    placeholder: true,
  },
  {
    id: 'photo-004',
    title: 'Evening Gathering',
    category: 'Events',
    image: '/images/portfolio/events/Photo_12.jpeg',
    width: 1600,
    height: 1067,
    alt: 'Placeholder artwork for events photography — Evening Gathering',
    description: 'Placeholder image. Replace with an SnS_Lenses photograph.',
    featured: true,
    large: true,
    placeholder: true,
  },
  {
    id: 'photo-005',
    title: 'Celebration',
    category: 'Events',
    image: '/images/portfolio/events/Photo_22.jpeg',
    width: 1600,
    height: 1200,
    alt: 'Placeholder artwork for events photography — Celebration',
    description: 'Placeholder image. Replace with an SnS_Lenses photograph.',
    placeholder: true,
  },
  {
    id: 'photo-006',
    title: 'Night Lights',
    category: 'Events',
    image: '/images/portfolio/events/Photo_23.jpeg',
    width: 1600,
    height: 1000,
    alt: 'Placeholder artwork for events photography — Night Lights',
    description: 'Placeholder image. Replace with an SnS_Lenses photograph.',
    placeholder: true,
  },
  {
    id: 'photo-007',
    title: 'Together',
    category: 'Couples',
    image: '/images/portfolio/couples/Photo_28.jpeg',
    width: 1200,
    height: 1500,
    alt: 'Placeholder artwork for couples photography — Together',
    description: 'Placeholder image. Replace with an SnS_Lenses photograph.',
    featured: true,
    placeholder: true,
  },
  {
    id: 'photo-008',
    title: 'Quiet Moment',
    category: 'Couples',
    image: '/images/portfolio/couples/Photo_29.jpeg',
    width: 1200,
    height: 1800,
    alt: 'Placeholder artwork for couples photography — Quiet Moment',
    description: 'Placeholder image. Replace with an SnS_Lenses photograph.',
    placeholder: true,
  },
  {
    id: 'photo-009',
    title: 'Golden Hour',
    category: 'Couples',
    image: '/images/portfolio/couples/Photo_27.jpeg',
    width: 1200,
    height: 1600,
    alt: 'Placeholder artwork for couples photography — Golden Hour',
    description: 'Placeholder image. Replace with an SnS_Lenses photograph.',
    placeholder: true,
  },
  {
    id: 'photo-010',
    title: 'Wanderer',
    category: 'Lifestyle',
    image: '/images/portfolio/lifestyle/Photo_17.jpeg',
    width: 1600,
    height: 1200,
    alt: 'Placeholder artwork for lifestyle photography — Wanderer',
    description: 'Placeholder image. Replace with an SnS_Lenses photograph.',
    featured: true,
    placeholder: true,
  },
  {
    id: 'photo-011',
    title: 'Open Road',
    category: 'Lifestyle',
    image: '/images/portfolio/lifestyle/Photo_5.jpeg',
    width: 1600,
    height: 1000,
    alt: 'Placeholder artwork for lifestyle photography — Open Road',
    description: 'Placeholder image. Replace with an SnS_Lenses photograph.',
    placeholder: true,
  },
  {
    id: 'photo-012',
    title: 'Slow Morning',
    category: 'Lifestyle',
    image: '/images/portfolio/lifestyle/Photo_9.jpeg',
    width: 1600,
    height: 1067,
    alt: 'Placeholder artwork for lifestyle photography — Slow Morning',
    description: 'Placeholder image. Replace with an SnS_Lenses photograph.',
    placeholder: true,
  },
  {
    id: 'photo-013',
    title: 'Mountain Light',
    category: 'Nature',
    image: '/images/portfolio/nature/Photo_41.jpeg',
    width: 1200,
    height: 1800,
    alt: 'Placeholder artwork for nature photography — Mountain Light',
    description: 'Placeholder image. Replace with an SnS_Lenses photograph.',
    featured: true,
    placeholder: true,
  },
  {
    id: 'photo-014',
    title: 'Highlands',
    category: 'Nature',
    image: '/images/portfolio/nature/Photo_40.jpeg',
    width: 1200,
    height: 1600,
    alt: 'Placeholder artwork for nature photography — Highlands',
    description: 'Placeholder image. Replace with an SnS_Lenses photograph.',
    placeholder: true,
  },
  {
    id: 'photo-015',
    title: 'Morning Haze',
    category: 'Nature',
    image: '/images/portfolio/nature/Photo_39.jpeg',
    width: 1200,
    height: 1500,
    alt: 'Placeholder artwork for nature photography — Morning Haze',
    description: 'Placeholder image. Replace with an SnS_Lenses photograph.',
    placeholder: true,
  },
  {
    id: 'photo-016',
    title: 'Abstract I',
    category: 'Other',
    image: '/images/portfolio/other/Photo_15.jpeg',
    width: 1600,
    height: 1000,
    alt: 'Placeholder artwork for other photography — Abstract I',
    description: 'Placeholder image. Replace with an SnS_Lenses photograph.',
    placeholder: true,
  },
  {
    id: 'photo-017',
    title: 'Abstract II',
    category: 'Other',
    image: '/images/portfolio/other/Photo_18.jpeg',
    width: 1600,
    height: 1067,
    alt: 'Placeholder artwork for other photography — Abstract II',
    description: 'Placeholder image. Replace with an SnS_Lenses photograph.',
    placeholder: true,
  },

]

export const featuredImages = gallery.filter((img) => img.featured)
