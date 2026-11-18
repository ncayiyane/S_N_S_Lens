import { AnimatePresence, motion } from 'motion/react'
import { useEffect } from 'react'
import { cinematicEase } from '../animations/motionVariants'
import { business } from '../data/business'
import { navigation } from '../data/navigation'
import { useScrollLock } from '../hooks/useScrollLock'
import { scrollToSection } from '../utils/scroll'
import { InstagramIcon } from './icons'
import { WhatsAppCTA } from './WhatsAppCTA'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  active: string
}

export function MobileMenu({ open, onClose, active }: MobileMenuProps) {
  useScrollLock(open)

  useEffect(() => {
    if (!open) return
    document.documentElement.setAttribute('data-menu-open', '')
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.removeAttribute('data-menu-open')
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  const go = (id: string) => {
    onClose()
    window.setTimeout(() => scrollToSection(id), 450)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-40 flex flex-col bg-charcoal px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-28 sm:px-10 lg:hidden"
          initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto">
            <ul className="flex flex-col">
              {navigation.map((item, i) => (
                <li key={item.id} className="overflow-hidden border-b border-bone/10">
                  <motion.a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      go(item.id)
                    }}
                    aria-current={active === item.id ? 'true' : undefined}
                    className="flex items-baseline gap-5 py-4 font-serif text-[clamp(2.5rem,11vw,4.5rem)] uppercase leading-none tracking-tight"
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '110%', transition: { duration: 0.3 } }}
                    transition={{ duration: 0.9, delay: 0.25 + i * 0.06, ease: cinematicEase }}
                  >
                    <span className="font-sans text-[10px] tracking-[0.3em] text-sand">0{i + 1}</span>
                    <span className={active === item.id ? 'italic text-sand' : ''}>{item.label}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
          </nav>
          <motion.div
            className="mt-8 flex flex-col gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: cinematicEase }}
          >
            <WhatsAppCTA label="Book a Session" variant="solid" size="lg" showIcon className="w-full" onClick={onClose} />
            <div className="flex items-center justify-between text-xs text-mist">
              <a href={business.phone.href} className="py-2 tracking-wider">
                {business.phone.display}
              </a>
              <a href={business.instagram.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 py-2 tracking-wider">
                <InstagramIcon size={16} /> {business.instagram.handle}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
