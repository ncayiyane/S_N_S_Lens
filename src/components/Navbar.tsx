import { motion } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'
import { cinematicEase } from '../animations/motionVariants'
import { business } from '../data/business'
import { navigation } from '../data/navigation'
import { useActiveSection } from '../hooks/useActiveSection'
import { scrollToSection } from '../utils/scroll'
import { MobileMenu } from './MobileMenu'
import { WhatsAppCTA } from './WhatsAppCTA'

const sectionIds = navigation.map((n) => n.id)

export function Logo({ className = '' }: { className?: string }) {
  const [first, rest] = business.name.split('_')
  return (
    <span className={`inline-flex items-baseline font-serif tracking-tight ${className}`}>
      {first}
      <span className="mx-[0.04em] inline-block origin-left text-sand transition-transform duration-700 ease-[var(--ease-cinematic)] group-hover:scale-x-[2.2]">_</span>
      <span className="transition-transform duration-700 ease-[var(--ease-cinematic)] group-hover:translate-x-[0.35em]">{rest}</span>
    </span>
  )
}

export function Navbar({ ready }: { ready: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(sectionIds)
  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const solid = scrolled && !open

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : undefined}
        transition={{ duration: 1.2, delay: 0.9, ease: cinematicEase }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,padding,border-color] duration-500 ${
          solid ? 'border-b border-bone/5 bg-ink/85 py-3 backdrop-blur-md lg:py-4' : 'border-b border-transparent py-5 lg:py-8'
        }`}
      >
        <nav aria-label="Primary" className="mx-auto flex max-w-[1800px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              close()
              scrollToSection('home')
            }}
            className="group relative z-10 text-2xl lg:text-[1.7rem]"
            aria-label="SnS_Lenses — back to top"
          >
            <Logo />
          </a>

          <ul className="hidden items-center gap-10 lg:flex xl:gap-14">
            {navigation.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.id)
                  }}
                  aria-current={active === item.id ? 'true' : undefined}
                  className={`link-underline text-[11px] font-medium uppercase tracking-[0.28em] transition-colors duration-300 ${
                    active === item.id ? 'text-bone' : 'text-bone/60 hover:text-bone'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <WhatsAppCTA label="Book a Session" variant="outline" size="sm" />
          </div>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="relative z-10 -mr-2 flex h-12 w-12 items-center justify-center lg:hidden"
          >
            <span className="relative block h-3 w-7">
              <span className={`absolute left-0 h-px w-full bg-bone transition-all duration-500 ease-[var(--ease-cinematic)] ${open ? 'top-1/2 rotate-45' : 'top-0'}`} />
              <span className={`absolute right-0 h-px bg-bone transition-all duration-500 ease-[var(--ease-cinematic)] ${open ? 'top-1/2 w-full -rotate-45' : 'top-full w-2/3'}`} />
            </span>
          </button>
        </nav>
      </motion.header>
      <MobileMenu open={open} onClose={close} active={active} />
    </>
  )
}
