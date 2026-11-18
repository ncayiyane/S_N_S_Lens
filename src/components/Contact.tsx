import { ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'
import { fadeUp, revealSplit } from '../animations/scrollAnimations'
import { business } from '../data/business'
import { useGsap } from '../hooks/useGsap'
import { whatsappUrl } from '../utils/whatsapp'
import { InstagramIcon, WhatsAppIcon } from './icons'
import { SplitText } from './SplitText'
import { WhatsAppCTA } from './WhatsAppCTA'

const rows = [
  { label: 'WhatsApp', value: business.whatsapp.display, href: whatsappUrl(), external: true, icon: <WhatsAppIcon size={18} /> },
  { label: 'Phone', value: business.phone.display, href: business.phone.href },
  { label: 'Email', value: business.email.display, href: business.email.href },
  { label: 'Instagram', value: business.instagram.handle, href: business.instagram.url, external: true, icon: <InstagramIcon size={18} /> },
]

export function Contact() {
  const root = useRef<HTMLElement>(null)

  useGsap(() => {
    const el = root.current
    if (!el) return
    revealSplit(el.querySelector('h2'))
    fadeUp(el.querySelectorAll('.contact-fade'), { trigger: el, start: 'top 70%', delay: 0.2 })
    fadeUp(el.querySelectorAll('.contact-row'), { trigger: el.querySelector('.contact-list'), start: 'top 80%', stagger: 0.08 })
  }, root)

  return (
    <section ref={root} id="contact" aria-labelledby="contact-title" className="relative py-28 sm:py-36 lg:py-44">
      <div className="mx-auto grid max-w-[1800px] gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-16 xl:px-20">
        <div className="lg:col-span-6">
          <p className="contact-fade eyebrow mb-6 flex items-center gap-4">
            <span className="text-bone/50">07</span>
            <span className="h-px w-10 bg-sand/50" />
            Contact
          </p>
          <h2 id="contact-title" className="font-serif text-[clamp(2.6rem,6.4vw,6.5rem)] uppercase leading-[0.92] tracking-[-0.02em]">
            <SplitText text="Let's create something" /> <span className="italic text-sand normal-case"><SplitText text="beautiful." /></span>
          </h2>
          <p className="contact-fade mt-8 max-w-md text-base leading-relaxed text-bone/70 sm:text-lg">Have a moment worth capturing? Let's talk and bring your vision to life.</p>
          <div className="contact-fade mt-10">
            <WhatsAppCTA label="Let's Work Together" variant="whatsapp" size="lg" showIcon className="w-full sm:w-auto" />
          </div>
        </div>

        <div className="contact-list lg:col-span-5 lg:col-start-8 lg:self-end">
          <ul className="border-b border-bone/10">
            {rows.map((row) => (
              <li key={row.label} className="contact-row border-t border-bone/10">
                <a
                  href={row.href}
                  {...(row.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex items-center justify-between gap-4 py-6"
                >
                  <span className="flex flex-col gap-2">
                    <span className="eyebrow !text-mist">{row.label}</span>
                    <span className="flex items-center gap-3 break-all font-serif text-2xl transition-colors duration-500 group-hover:text-sand sm:text-3xl">
                      {row.icon && <span className="text-sand">{row.icon}</span>}
                      {row.value}
                    </span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-bone/40 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-sand" strokeWidth={1.25} aria-hidden="true" />
                </a>
              </li>
            ))}
            <li className="contact-row border-t border-bone/10 py-6">
              <span className="eyebrow !text-mist">Location</span>
              <p className="mt-2 font-serif text-2xl sm:text-3xl">{business.location.full}</p>
              <p className="mt-3 text-sm leading-relaxed text-mist">Serving {business.serviceAreas.join(', ')}.</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
