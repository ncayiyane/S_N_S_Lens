import { motion } from 'motion/react'
import { useRef } from 'react'
import { cinematicEase } from '../animations/motionVariants'
import { business } from '../data/business'
import { instagramPreview } from '../data/instagram'
import { CTAButton } from './CTAButton'
import { InstagramIcon } from './icons'
import { PlaceholderBadge } from './PlaceholderBadge'
import { SectionHeading } from './SectionHeading'

export function InstagramSection() {
  const root = useRef<HTMLElement>(null)

  return (
    <section ref={root} aria-labelledby="instagram-title" className="relative py-28 sm:py-36 lg:py-44">
      <div className="mx-auto max-w-[1800px] px-5 sm:px-8 lg:px-16 xl:px-20">
        <SectionHeading
          id="instagram-title"
          index="06"
          eyebrow="Instagram"
          lines={['Follow the', 'journey.']}
          accentLine={1}
          aside={
            <div className="flex flex-col items-start gap-6">
              <p className="text-sm leading-relaxed text-mist">Discover more moments, creativity and stories through the {business.name} Instagram page.</p>
              <a href={business.instagram.url} target="_blank" rel="noopener noreferrer" className="link-underline flex items-center gap-3 font-serif text-2xl">
                <InstagramIcon size={22} className="text-sand" /> {business.instagram.handle}
              </a>
            </div>
          }
        />

        <ul className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:mt-24 lg:grid-cols-6 lg:gap-5">
          {instagramPreview.map((item, i) => (
            <motion.li
              key={item.id}
              className={i % 2 ? 'lg:mt-16' : ''}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 1.1, delay: (i % 6) * 0.08, ease: cinematicEase }}
            >
              <a
                href={business.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${business.name} on Instagram (opens in a new tab)`}
                className="group relative block aspect-square overflow-hidden bg-charcoal"
              >
                <img src={item.image} alt={item.alt} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[var(--ease-cinematic)] group-hover:scale-110" />
                <span className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors duration-500 group-hover:bg-ink/50">
                  <InstagramIcon size={26} className="scale-75 opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100" />
                </span>
                {item.placeholder && <PlaceholderBadge />}
              </a>
            </motion.li>
          ))}
        </ul>

        <div className="mt-14 flex flex-col items-center gap-4 text-center lg:mt-20">
          <CTAButton href={business.instagram.url} external variant="outline" size="lg" icon={<InstagramIcon size={16} />}>
            Follow on Instagram
          </CTAButton>
          <p className="text-[10px] uppercase tracking-[0.3em] text-bone/35">A curated preview — see the latest work on Instagram</p>
        </div>
      </div>
    </section>
  )
}
