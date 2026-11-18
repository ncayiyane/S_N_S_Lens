import { Plus } from 'lucide-react'
import { useRef } from 'react'
import { clipReveal, fadeUp, parallax } from '../animations/scrollAnimations'
import { featuredImages, type GalleryImage } from '../data/gallery'
import { useGsap } from '../hooks/useGsap'
import { CTAButton } from './CTAButton'
import { PlaceholderBadge } from './PlaceholderBadge'
import { SectionHeading } from './SectionHeading'

interface FeaturedWorkProps {
  onOpen: (images: GalleryImage[], index: number) => void
}

/** Asymmetrical editorial placements, cycled if there are more featured images than layouts. */
const layouts = [
  { wrap: 'lg:col-span-7', frame: 'aspect-[4/5]' },
  { wrap: 'lg:col-span-4 lg:col-start-9 lg:mt-48', frame: 'aspect-[3/4]' },
  { wrap: 'lg:col-span-5 lg:col-start-2 lg:-mt-8', frame: 'aspect-[3/2]' },
  { wrap: 'lg:col-span-5 lg:col-start-8 lg:-mt-40', frame: 'aspect-[4/5]' },
  { wrap: 'lg:col-span-8 lg:col-start-3', frame: 'aspect-[16/10]' },
]

export function FeaturedWork({ onOpen }: FeaturedWorkProps) {
  const root = useRef<HTMLElement>(null)

  useGsap(() => {
    root.current?.querySelectorAll('.feature-item').forEach((item, i) => {
      const frame = item.querySelector('.feature-frame')
      clipReveal(frame, { start: 'top 88%', direction: i % 2 ? 'right' : 'up' })
      parallax(item.querySelector('.feature-parallax'), 5, frame)
      fadeUp(item.querySelectorAll('.feature-caption'), { trigger: item, start: 'top 70%', delay: 0.4 })
    })
  }, root)

  if (!featuredImages.length) return null

  return (
    <section ref={root} aria-labelledby="featured-title" className="relative py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1800px] px-5 sm:px-8 lg:px-16 xl:px-20">
        <SectionHeading
          id="featured-title"
          index="02"
          eyebrow="Featured Work"
          lines={['A collection', 'of moments.']}
          accentLine={1}
          aside={
            <div className="flex flex-col items-start gap-6">
              <p className="text-sm leading-relaxed text-mist">Selected frames — each one a moment held still. Tap any photograph to view it full screen.</p>
              <CTAButton href="#portfolio" variant="text" size="sm">
                View the full portfolio
              </CTAButton>
            </div>
          }
        />

        <div className="mt-20 grid grid-cols-1 gap-x-8 gap-y-16 sm:mt-24 lg:grid-cols-12 lg:gap-y-24">
          {featuredImages.map((img, i) => {
            const layout = layouts[i % layouts.length]
            return (
              <figure key={img.id} className={`feature-item ${layout.wrap} ${i % 2 ? 'ml-[10%] sm:ml-[25%] lg:ml-0' : 'mr-[6%] sm:mr-[15%] lg:mr-0'}`}>
                <button
                  type="button"
                  data-cursor="view"
                  onClick={() => onOpen(featuredImages, i)}
                  aria-label={`View photograph: ${img.title}`}
                  className="group relative block w-full text-left"
                >
                  <div className={`feature-frame relative overflow-hidden bg-charcoal ${layout.frame}`}>
                    <div className="feature-parallax absolute -inset-y-[6%] inset-x-0">
                      <img
                        src={img.image}
                        alt={img.alt}
                        width={img.width}
                        height={img.height}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[var(--ease-cinematic)] group-hover:scale-[1.06]"
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors duration-700 group-hover:bg-ink/45 group-focus-visible:bg-ink/45">
                      <span className="flex translate-y-4 items-center gap-3 text-[11px] uppercase tracking-[0.3em] opacity-0 transition-all duration-700 ease-[var(--ease-cinematic)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                        <Plus className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" /> View Photograph
                      </span>
                    </div>
                    {img.placeholder && <PlaceholderBadge />}
                  </div>
                </button>
                <figcaption className="feature-caption mt-5 flex items-baseline justify-between gap-4 border-t border-bone/10 pt-4">
                  <span className="flex items-baseline gap-4">
                    <span className="text-[10px] tracking-[0.3em] text-sand">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-serif text-2xl sm:text-3xl">{img.title}</span>
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-mist">{img.category}</span>
                </figcaption>
              </figure>
            )
          })}
        </div>
      </div>
    </section>
  )
}
