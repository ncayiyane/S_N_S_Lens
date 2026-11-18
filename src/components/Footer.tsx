import { ArrowUp } from 'lucide-react'
import { business } from '../data/business'
import { navigation } from '../data/navigation'
import { useMagnetic } from '../hooks/useMagnetic'
import { scrollToSection } from '../utils/scroll'
import { whatsappUrl } from '../utils/whatsapp'
import { InstagramIcon, WhatsAppIcon } from './icons'

const year = new Date().getFullYear()

export function Footer() {
  const topRef = useMagnetic<HTMLButtonElement>(0.35)
  const [first, rest] = business.name.split('_')

  return (
    <footer className="relative overflow-hidden border-t border-bone/10 bg-ink pb-[max(2rem,env(safe-area-inset-bottom))] pt-20 lg:pt-28">
      <div className="mx-auto max-w-[1800px] px-5 sm:px-8 lg:px-16 xl:px-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-serif text-3xl italic text-sand sm:text-4xl">{business.name} — {business.tagline}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-mist">Photography by {business.photographer}, based in {business.location.full}.</p>
          </div>
          <nav aria-label="Footer" className="lg:col-span-2 lg:col-start-7">
            <p className="eyebrow mb-5 !text-mist">Navigate</p>
            <ul className="flex flex-col gap-3">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(item.id)
                    }}
                    className="link-underline text-sm text-bone/80 hover:text-bone"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="lg:col-span-3">
            <p className="eyebrow mb-5 !text-mist">Connect</p>
            <ul className="flex flex-col gap-3 text-sm text-bone/80">
              <li>
                <a href={business.instagram.url} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-2 hover:text-bone">
                  <InstagramIcon size={15} /> {business.instagram.handle}
                </a>
              </li>
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-2 hover:text-bone">
                  <WhatsAppIcon size={15} /> {business.whatsapp.display}
                </a>
              </li>
              <li>
                <a href={business.email.href} className="link-underline break-all hover:text-bone">
                  {business.email.display}
                </a>
              </li>
              <li className="text-mist">{business.location.full}</li>
            </ul>
          </div>
          <div className="flex items-start sm:justify-end lg:col-span-1 lg:col-start-12">
            <button
              ref={topRef}
              type="button"
              onClick={() => scrollToSection('home')}
              aria-label="Back to top"
              className="group flex h-16 w-16 items-center justify-center rounded-full border border-bone/20 transition-colors duration-500 hover:border-sand hover:bg-sand hover:text-ink"
            >
              <ArrowUp className="h-5 w-5 transition-transform duration-500 group-hover:-translate-y-1" strokeWidth={1.25} />
            </button>
          </div>
        </div>

        <p aria-hidden="true" className="mt-20 select-none whitespace-nowrap text-center font-serif text-[17.5vw] leading-[0.8] tracking-[-0.04em] text-bone/[0.06] lg:mt-28">
          {first}
          <span className="text-sand/20">_</span>
          {rest}
        </p>

        <div className="mt-10 flex flex-col gap-3 border-t border-bone/10 pt-8 text-[10px] uppercase tracking-[0.25em] text-bone/40 sm:flex-row sm:justify-between">
          <p>© {year} {business.name}. All rights reserved.</p>
          <p>{business.location.region} · {business.location.country}</p>
        </div>
      </div>
    </footer>
  )
}
