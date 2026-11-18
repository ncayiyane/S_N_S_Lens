import { useRef } from 'react'
import { gsap, prefersReducedMotion } from '../animations/gsapConfig'
import { clipReveal, fadeUp, parallax, revealSplit } from '../animations/scrollAnimations'
import { business, siteImages } from '../data/business'
import { useGsap } from '../hooks/useGsap'
import { PlaceholderBadge } from './PlaceholderBadge'
import { SplitText } from './SplitText'

export function About() {
  const root = useRef<HTMLElement>(null)

  useGsap(() => {
    const el = root.current
    if (!el) return
    const frame = el.querySelector('.about-frame')
    clipReveal(frame, { start: 'top 80%' })
    parallax(el.querySelector('.about-parallax'), 6, frame)
    revealSplit(el.querySelector('h2'))
    fadeUp(el.querySelectorAll('.about-fade'), { trigger: el.querySelector('.about-copy'), start: 'top 75%' })
    const path = el.querySelector<SVGPathElement>('.signature-path')
    if (path && !prefersReducedMotion()) {
      const len = path.getTotalLength()
      gsap.fromTo(path, { strokeDasharray: len, strokeDashoffset: len }, {
        strokeDashoffset: 0,
        duration: 1.8,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: path, start: 'top 90%', once: true },
      })
    }
  }, root)

  return (
    <section ref={root} id="about" aria-labelledby="about-title" className="relative overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-48">
      <div className="mx-auto grid max-w-[1800px] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-16 xl:px-20">
        <div className="relative lg:col-span-5">
          <div className="about-frame relative aspect-[4/5] overflow-hidden bg-charcoal">
            <div className="about-parallax absolute -inset-y-[8%] inset-x-0">
              <img
                src={siteImages.about.src}
                alt={siteImages.about.alt}
                width={siteImages.about.width}
                height={siteImages.about.height}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            {siteImages.about.placeholder && <PlaceholderBadge />}
          </div>
          <p className="about-fade mt-5 flex justify-between text-[10px] uppercase tracking-[0.3em] text-mist">
            <span>{business.photographer}</span>
            <span>Behind the lens</span>
          </p>
        </div>

        <div className="about-copy flex flex-col justify-center lg:col-span-6 lg:col-start-7">
          <p className="about-fade eyebrow mb-6 flex items-center gap-4">
            <span className="text-bone/50">01</span>
            <span className="h-px w-10 bg-sand/50" />
            About the Photographer
          </p>
          <h2 id="about-title" className="font-serif text-[clamp(2.4rem,5.6vw,5.75rem)] uppercase leading-[0.95] tracking-[-0.02em]">
            <SplitText text="Behind every frame," /> <span className="italic text-sand normal-case"><SplitText text="there's a story." /></span>
          </h2>

          <div className="mt-10 grid gap-6 text-base leading-relaxed text-bone/70 sm:text-lg lg:mt-14 lg:max-w-xl">
            <p className="about-fade">
              At {business.name}, photography is more than capturing an image. It is about preserving moments, expressing emotion and telling stories through the lens.
            </p>
            <p className="about-fade">
              Based in {business.location.region}, {business.name} brings creativity and visual storytelling to every frame. Behind the camera is {business.photographer}, the
              photographer and creative eye behind the brand.
            </p>
          </div>

          <dl className="about-fade mt-12 grid gap-8 border-t border-bone/10 pt-8 sm:grid-cols-2 lg:max-w-xl">
            <div>
              <dt className="eyebrow mb-3 !text-mist">Based in</dt>
              <dd className="font-serif text-2xl">{business.location.full}</dd>
            </div>
            <div>
              <dt className="eyebrow mb-3 !text-mist">Serving</dt>
              <dd className="text-sm leading-relaxed text-bone/70">{business.serviceAreas.join(' · ')}</dd>
            </div>
          </dl>

          <div className="about-fade mt-12 lg:mt-16" aria-hidden="true">
            <span className="relative inline-block font-serif text-5xl italic text-sand sm:text-6xl">
              {business.name}
              <svg viewBox="0 0 300 30" className="absolute -bottom-4 left-0 h-6 w-full overflow-visible" fill="none">
                <path className="signature-path" d="M2 18 C 60 4, 120 28, 180 14 S 270 8, 298 20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
