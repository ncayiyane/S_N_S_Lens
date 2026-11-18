import { useEffect, useRef, useState } from 'react'
import { gsap } from '../animations/gsapConfig'
import { fadeUp } from '../animations/scrollAnimations'
import { services } from '../data/services'
import { useGsap } from '../hooks/useGsap'
import { useFinePointer, useIsDesktop } from '../hooks/useMediaQuery'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { PlaceholderBadge } from './PlaceholderBadge'
import { SectionHeading } from './SectionHeading'
import { WhatsAppCTA } from './WhatsAppCTA'

export function Services() {
  const root = useRef<HTMLElement>(null)
  const preview = useRef<HTMLDivElement>(null)
  const desktop = useIsDesktop()
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const hoverPreview = desktop && fine && !reduced
  const [active, setActive] = useState<number | null>(null)

  useGsap(() => {
    fadeUp(root.current?.querySelectorAll('.service-row') ?? [], { trigger: root.current?.querySelector('ul'), start: 'top 80%', stagger: 0.1 })
  }, root)

  // Cursor-following image preview (desktop only)
  useEffect(() => {
    const el = preview.current
    const list = root.current?.querySelector('ul')
    if (!hoverPreview || !el || !list) return
    gsap.set(el, { xPercent: -50, yPercent: -50 })
    const xTo = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'power3' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'power3' })
    const move = (e: PointerEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
    }
    list.addEventListener('pointermove', move)
    return () => list.removeEventListener('pointermove', move)
  }, [hoverPreview])

  return (
    <section ref={root} id="services" aria-labelledby="services-title" className="relative py-28 sm:py-36 lg:py-44">
      <div className="mx-auto max-w-[1800px] px-5 sm:px-8 lg:px-16 xl:px-20">
        <SectionHeading
          id="services-title"
          index="04"
          eyebrow="Services"
          lines={['What we capture.']}
          by="chars"
          aside={<p className="text-sm leading-relaxed text-mist">Every session is tailored to you. Pricing and availability are shared personally — enquire on WhatsApp about any service.</p>}
        />

        <ul className="mt-16 border-b border-bone/10 lg:mt-24" onPointerLeave={() => setActive(null)}>
          {services.map((service, i) => (
            <li
              key={service.id}
              onPointerEnter={() => setActive(i)}
              className="service-row group grid grid-cols-1 gap-6 border-t border-bone/10 py-10 lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-12"
            >
              {!hoverPreview && (
                <div className="relative aspect-[4/3] overflow-hidden bg-charcoal sm:aspect-[16/9] lg:col-span-12">
                  <img src={service.image} alt={service.alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                  {service.placeholder && <PlaceholderBadge />}
                </div>
              )}
              <span className="hidden text-[11px] tracking-[0.3em] text-sand lg:col-span-1 lg:block">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="font-serif text-[clamp(2rem,4.6vw,4.25rem)] uppercase leading-[0.95] tracking-[-0.01em] transition-all duration-700 ease-[var(--ease-cinematic)] lg:col-span-5 lg:group-hover:translate-x-4 lg:group-hover:italic lg:group-hover:text-sand">
                <span className="mr-4 align-top font-sans text-[11px] tracking-[0.3em] text-sand lg:hidden">{String(i + 1).padStart(2, '0')}</span>
                {service.title}
              </h3>
              <p className="max-w-md text-sm leading-relaxed text-mist transition-colors duration-500 group-hover:text-bone/80 lg:col-span-3">{service.description}</p>
              <div className="lg:col-span-3 lg:flex lg:justify-end">
                <WhatsAppCTA label="Enquire on WhatsApp" service={service.title} variant="text" size="sm" />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {hoverPreview && (
        <div
          ref={preview}
          aria-hidden="true"
          className={`pointer-events-none fixed left-0 top-0 z-30 aspect-[4/5] w-[min(22vw,320px)] overflow-hidden transition-[opacity,scale] duration-500 ease-[var(--ease-cinematic)] ${
            active === null ? 'scale-75 opacity-0' : 'scale-100 opacity-100'
          }`}
        >
          {services.map((s, i) => (
            <img
              key={s.id}
              src={s.image}
              alt=""
              loading="lazy"
              className={`absolute inset-0 h-full w-full object-cover transition-[opacity,scale] duration-700 ease-[var(--ease-cinematic)] ${active === i ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}
            />
          ))}
          {services[active ?? 0]?.placeholder && <PlaceholderBadge />}
        </div>
      )}
    </section>
  )
}
