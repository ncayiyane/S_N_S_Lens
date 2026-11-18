import { useRef } from 'react'
import { drift, fadeUp, parallax, revealSplit } from '../animations/scrollAnimations'
import { siteImages } from '../data/business'
import { useGsap } from '../hooks/useGsap'
import { PlaceholderBadge } from './PlaceholderBadge'
import { SplitText } from './SplitText'
import { WhatsAppCTA } from './WhatsAppCTA'

export function BookingCTA() {
  const root = useRef<HTMLElement>(null)

  useGsap(() => {
    const el = root.current
    if (!el) return
    parallax(el.querySelector('.booking-bg'), 10, el)
    drift(el.querySelector('.booking-drift'), 25)
    revealSplit(el.querySelector('h2'))
    fadeUp(el.querySelectorAll('.booking-fade'), { trigger: el, start: 'top 60%', delay: 0.3 })
  }, root)

  return (
    <section ref={root} aria-labelledby="booking-title" className="relative flex min-h-[90svh] items-center overflow-hidden py-28">
      <div className="booking-bg absolute -inset-y-[12%] inset-x-0">
        <img src={siteImages.booking.src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-ink/70" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" aria-hidden="true" />
      {siteImages.booking.placeholder && <PlaceholderBadge className="!left-auto !right-5 lg:!right-12" />}

      <div aria-hidden="true" className="booking-drift pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 whitespace-nowrap font-serif text-[22vw] uppercase italic leading-none text-outline">
        Book a session — Book a session —
      </div>

      <div className="relative mx-auto w-full max-w-[1800px] px-5 text-center sm:px-8 lg:px-16">
        <p className="booking-fade eyebrow mb-8">Book a Session</p>
        <h2 id="booking-title" className="mx-auto max-w-[14ch] font-serif text-[clamp(2.8rem,8vw,8.5rem)] uppercase leading-[0.92] tracking-[-0.02em]">
          <SplitText text="Your moment," /> <span className="italic text-sand normal-case"><SplitText text="your story." /></span>
        </h2>
        <p className="booking-fade mx-auto mt-8 max-w-lg text-base leading-relaxed text-bone/75 sm:text-lg">
          Enquiries are handled personally on WhatsApp. Send a message to talk through your ideas, availability and pricing.
        </p>
        <div className="booking-fade mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <WhatsAppCTA label="Book Now" variant="solid" size="lg" showIcon className="w-full sm:w-auto" />
          <WhatsAppCTA label="Enquire About a Session" variant="outline" size="lg" className="w-full sm:w-auto" />
        </div>
        <p className="booking-fade mt-8 text-[10px] uppercase tracking-[0.3em] text-bone/45">No forms — just a conversation. Bookings are confirmed directly with the photographer.</p>
      </div>
    </section>
  )
}
