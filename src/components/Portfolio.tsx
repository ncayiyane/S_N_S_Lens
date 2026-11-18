import { AnimatePresence, motion } from 'motion/react'
import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { refreshScrollTriggers } from '../animations/gsapConfig'
import { cinematicEase } from '../animations/motionVariants'
import { gallery, galleryCategories, type GalleryCategory, type GalleryImage } from '../data/gallery'
import { PlaceholderBadge } from './PlaceholderBadge'
import { SectionHeading } from './SectionHeading'

type Filter = 'All Work' | GalleryCategory

interface PortfolioProps {
  onOpen: (images: GalleryImage[], index: number) => void
}

const CAPTION_HEIGHT = 56

interface Placement {
  x: number
  y: number
  w: number
  h: number
}

/** Shortest-column masonry. `large` images span two columns when 3+ columns are available. */
function computeLayout(items: GalleryImage[], width: number) {
  const cols = width >= 1024 ? 3 : width >= 600 ? 2 : 1
  const gap = width >= 1024 ? 32 : width >= 600 ? 24 : 40
  const colW = (width - gap * (cols - 1)) / cols
  const heights = new Array(cols).fill(0)
  const placements: Placement[] = items.map((item) => {
    const span = item.large && cols >= 3 ? 2 : 1
    let col = 0
    let top = Infinity
    for (let c = 0; c <= cols - span; c++) {
      const t = Math.max(...heights.slice(c, c + span))
      if (t < top - 1) {
        top = t
        col = c
      }
    }
    const w = colW * span + gap * (span - 1)
    const h = (w * item.height) / item.width + CAPTION_HEIGHT
    for (let c = col; c < col + span; c++) heights[c] = top + h + gap
    return { x: col * (colW + gap), y: top, w, h }
  })
  return { placements, height: Math.max(0, ...heights) - gap }
}

export function Portfolio({ onOpen }: PortfolioProps) {
  const [filter, setFilter] = useState<Filter>('All Work')
  const gridRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  const filters = useMemo<Filter[]>(() => ['All Work', ...galleryCategories.filter((c) => gallery.some((g) => g.category === c))], [])
  const items = useMemo(() => (filter === 'All Work' ? gallery : gallery.filter((g) => g.category === filter)), [filter])
  const { placements, height } = useMemo(() => computeLayout(items, width), [items, width])

  useLayoutEffect(() => {
    const el = gridRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useLayoutEffect(() => {
    refreshScrollTriggers(700)
  }, [height])

  const count = (f: Filter) => (f === 'All Work' ? gallery.length : gallery.filter((g) => g.category === f).length)

  return (
    <section id="portfolio" aria-labelledby="portfolio-title" className="relative bg-charcoal py-28 sm:py-36 lg:py-44">
      <div className="mx-auto max-w-[1800px] px-5 sm:px-8 lg:px-16 xl:px-20">
        <SectionHeading
          id="portfolio-title"
          index="03"
          eyebrow="Portfolio"
          lines={['The work.']}
          by="chars"
          aside={<p className="text-sm leading-relaxed text-mist">Explore the complete collection. Filter by category and open any photograph to view it full screen.</p>}
        />

        <div className="no-scrollbar -mx-5 mt-14 overflow-x-auto px-5 sm:mx-0 sm:px-0 lg:mt-20">
          <div role="group" aria-label="Filter portfolio by category" className="flex min-w-max gap-2 border-b border-bone/10 sm:gap-6 lg:gap-10">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`relative flex items-start gap-1.5 px-3 pb-5 pt-2 text-[11px] font-medium uppercase tracking-[0.25em] transition-colors duration-300 sm:px-0 ${
                  filter === f ? 'text-bone' : 'text-bone/45 hover:text-bone/80'
                }`}
              >
                {f}
                <sup className="text-[9px] tracking-normal text-sand">{count(f)}</sup>
                {filter === f && <motion.span layoutId="filter-indicator" className="absolute inset-x-0 -bottom-px h-px bg-sand" transition={{ duration: 0.6, ease: cinematicEase }} />}
              </button>
            ))}
          </div>
        </div>
        <p className="sr-only" aria-live="polite">
          Showing {items.length} photographs{filter !== 'All Work' ? ` in ${filter}` : ''}
        </p>

        <div ref={gridRef} className="relative mt-12 transition-[height] duration-700 ease-[var(--ease-cinematic)] lg:mt-16" style={{ height: width ? height : undefined }}>
          <AnimatePresence initial={false}>
            {width > 0 &&
              items.map((img, i) => {
                const p = placements[i]
                return (
                  <motion.div
                    key={img.id}
                    className="absolute left-0 top-0"
                    style={{ width: p.w }}
                    initial={{ opacity: 0, x: p.x, y: p.y + 40, scale: 0.96 }}
                    animate={{ opacity: 1, x: p.x, y: p.y, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.35 } }}
                    transition={{ duration: 0.9, ease: cinematicEase, delay: Math.min(i * 0.03, 0.3) }}
                  >
                    <motion.figure
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                      transition={{ duration: 1.1, ease: cinematicEase }}
                    >
                      <button
                        type="button"
                        data-cursor="view"
                        onClick={() => onOpen(items, i)}
                        aria-label={`View photograph: ${img.title} (${img.category})`}
                        className="group relative block w-full overflow-hidden bg-ink"
                        style={{ aspectRatio: `${img.width} / ${img.height}` }}
                      >
                        <img
                          src={img.image}
                          alt={img.alt}
                          width={img.width}
                          height={img.height}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[var(--ease-cinematic)] group-hover:scale-[1.07]"
                        />
                        <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-focus-visible:opacity-100" />
                        <span className="absolute bottom-5 left-5 translate-y-3 text-left font-serif text-2xl italic opacity-0 transition-all duration-700 ease-[var(--ease-cinematic)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                          View photograph
                        </span>
                        {img.placeholder && <PlaceholderBadge />}
                      </button>
                      <figcaption className="flex items-baseline justify-between gap-4 pt-4" style={{ height: CAPTION_HEIGHT }}>
                        <span className="truncate font-serif text-xl">{img.title}</span>
                        <span className="shrink-0 text-[10px] uppercase tracking-[0.3em] text-mist">{img.category}</span>
                      </figcaption>
                    </motion.figure>
                  </motion.div>
                )
              })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
