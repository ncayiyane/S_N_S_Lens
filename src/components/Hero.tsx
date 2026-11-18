import { MapPin } from 'lucide-react'
import { useRef } from 'react'
import { EASE, gsap, isFinePointer, prefersReducedMotion } from '../animations/gsapConfig'
import { business, siteImages } from '../data/business'
import { useGsap } from '../hooks/useGsap'
import { CTAButton } from './CTAButton'
import { PlaceholderBadge } from './PlaceholderBadge'
import { WhatsAppCTA } from './WhatsAppCTA'

const headline = ['Capturing moments.', 'Creating memories.']

export function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null)
  const scrollLayer = useRef<HTMLDivElement>(null)
  const mouseLayer = useRef<HTMLDivElement>(null)
  const image = useRef<HTMLImageElement>(null)

  // Scroll parallax + desktop mouse parallax
  useGsap(() => {
    if (prefersReducedMotion()) return
    gsap.to(scrollLayer.current, {
      yPercent: 22,
      ease: 'none',
      scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
    })
    gsap.to('.hero-content', {
      yPercent: -12,
      opacity: 0.15,
      ease: 'none',
      scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
    })
    if (!isFinePointer() || !mouseLayer.current) return
    const xTo = gsap.quickTo(mouseLayer.current, 'x', { duration: 1.4, ease: 'power3' })
    const yTo = gsap.quickTo(mouseLayer.current, 'y', { duration: 1.4, ease: 'power3' })
    const onMove = (e: PointerEvent) => {
      xTo((e.clientX / window.innerWidth - 0.5) * -24)
      yTo((e.clientY / window.innerHeight - 0.5) * -16)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, root)

  // Entrance timeline, played once the preloader lifts
  useGsap(
    () => {
      if (prefersReducedMotion()) return
      gsap.set(image.current, { scale: 1.12 })
      gsap.set('.hero-line', { yPercent: 115 })
      gsap.set('.hero-fade', { autoAlpha: 0, y: 24 })
      gsap.set('.hero-cta', { autoAlpha: 0, y: 24 })
      if (!ready) return
      gsap
        .timeline({ defaults: { ease: EASE.reveal } })
        .to(image.current, { scale: 1, duration: 2.6 }, 0)
        .to('.hero-line', { yPercent: 0, duration: 1.4, stagger: 0.14 }, 0.15)
        .to('.hero-fade', { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.1, ease: EASE.soft }, 0.7)
        .to('.hero-cta', { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.12, ease: EASE.soft }, 0.95)
    },
    root,
    [ready],
  )

  return (
    <section ref={root} id="home" aria-labelledby="hero-title" className="relative flex h-[100svh] min-h-[600px] items-end overflow-hidden">
      <div ref={scrollLayer} className="absolute inset-0 will-change-transform">
        <div ref={mouseLayer} className="absolute -inset-[4%]">
          <img
            ref={image}
            src={siteImages.hero.src}
            alt={siteImages.hero.alt}
            width={siteImages.hero.width}
            height={siteImages.hero.height}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/20 to-ink" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" aria-hidden="true" />
      {siteImages.hero.placeholder && <PlaceholderBadge className="!left-auto !right-5 !top-24 lg:!top-32 lg:!right-12" />}

      {/* Viewfinder corners */}
      <div aria-hidden="true" className="hero-fade pointer-events-none absolute inset-6 hidden lg:block xl:inset-10">
        {['left-0 top-0 border-l border-t', 'right-0 top-0 border-r border-t', 'bottom-0 left-0 border-b border-l', 'bottom-0 right-0 border-b border-r'].map((c) => (
          <span key={c} className={`absolute h-6 w-6 border-bone/30 ${c}`} />
        ))}
      </div>

      <div className="hero-content relative mx-auto w-full max-w-[1800px] px-5 pb-24 sm:px-8 sm:pb-28 lg:px-16 lg:pb-24 xl:px-20">
        <p className="hero-fade eyebrow mb-6 flex items-center gap-4 lg:mb-8">
          <span className="h-px w-10 bg-sand/60" />
          {business.name} — Photography
        </p>
        <h1 id="hero-title" className="font-serif text-[clamp(2.75rem,11.5vw,4.75rem)] sm:text-[min(9.5vw,12svh)] lg:text-[min(6.6vw,15svh)] font-normal uppercase leading-[0.88] tracking-[-0.03em]">
          {headline.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <span className={`hero-line block will-change-transform ${i === 1 ? 'pl-[8vw] italic text-sand sm:pl-[12vw]' : ''}`}>{line}</span>
            </span>
          ))}
        </h1>

        <div className="mt-8 flex flex-col gap-8 lg:mt-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-md">
            <p className="hero-fade text-base leading-relaxed text-bone/75 sm:text-lg">Through the lens, every moment becomes a story worth remembering.</p>
            <p className="hero-fade mt-5 flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-mist">
              <MapPin className="h-3.5 w-3.5 text-sand" strokeWidth={1.5} aria-hidden="true" />
              {business.location.region} <span className="text-bone/30">|</span> {business.location.country}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <div className="hero-cta">
              <CTAButton href="#portfolio" variant="solid" className="w-full sm:w-auto">
                Explore My Work
              </CTAButton>
            </div>
            <div className="hero-cta">
              <WhatsAppCTA label="Book a Session" variant="outline" className="w-full sm:w-auto" />
            </div>
          </div>
        </div>
      </div>

      <div className="hero-fade absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex" aria-hidden="true">
        <span className="text-[9px] uppercase tracking-[0.4em] text-bone/50">Scroll</span>
        <span className="relative block h-12 w-px overflow-hidden bg-bone/15">
          <span className="animate-scroll-line absolute inset-0 bg-sand" />
        </span>
      </div>
    </section>
  )
}
