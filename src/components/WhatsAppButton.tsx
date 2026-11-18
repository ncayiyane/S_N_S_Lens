import { AnimatePresence, motion } from 'motion/react'
import { cinematicEase } from '../animations/motionVariants'
import { whatsappUrl } from '../utils/whatsapp'
import { WhatsAppIcon } from './icons'

/** Floating WhatsApp booking button. */
export function WhatsAppButton({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Book a photography session on WhatsApp (opens in a new tab)"
          className="wa-float group fixed bottom-[max(1.25rem,calc(env(safe-area-inset-bottom)+0.75rem))] right-4 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_10px_30px_-10px_rgba(37,211,102,0.6)] sm:right-6 lg:bottom-8 lg:right-8 lg:h-16 lg:w-16"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          transition={{ duration: 0.6, ease: cinematicEase }}
        >
          <span className="animate-wa-pulse absolute inset-0 rounded-full bg-whatsapp opacity-0" aria-hidden="true" />
          <WhatsAppIcon size={28} className="relative transition-transform duration-500 group-hover:rotate-[-10deg]" />
          <span
            role="tooltip"
            className="pointer-events-none absolute right-full mr-4 hidden translate-x-2 whitespace-nowrap bg-bone px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.2em] text-ink opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 lg:block"
          >
            Book a Photography Session
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
