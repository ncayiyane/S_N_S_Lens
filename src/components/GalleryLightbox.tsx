import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { AnimatePresence, motion, type PanInfo } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { cinematicEase } from '../animations/motionVariants'
import type { GalleryImage } from '../data/gallery'
import { useScrollLock } from '../hooks/useScrollLock'
import { PlaceholderBadge } from './PlaceholderBadge'

interface GalleryLightboxProps {
  images: GalleryImage[]
  index: number
  onIndexChange: (index: number) => void
  onClose: () => void
}

const SWIPE_OFFSET = 70
const SWIPE_VELOCITY = 400

export default function GalleryLightbox({ images, index, onIndexChange, onClose }: GalleryLightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const [direction, setDirection] = useState(0)
  const image = images[index]
  const total = images.length

  useScrollLock(true)

  const go = useCallback(
    (step: number) => {
      if (total < 2) return
      setDirection(step)
      onIndexChange((index + step + total) % total)
    },
    [index, total, onIndexChange],
  )

  // Focus management: focus the close button, restore focus on close
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    return () => previous?.focus?.()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled])')
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, onClose])

  // Preload neighbours for instant navigation
  useEffect(() => {
    ;[1, -1].forEach((s) => {
      const n = images[(index + s + total) % total]
      if (n) new Image().src = n.image
    })
  }, [index, images, total])

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_OFFSET || info.velocity.x < -SWIPE_VELOCITY) go(1)
    else if (info.offset.x > SWIPE_OFFSET || info.velocity.x > SWIPE_VELOCITY) go(-1)
  }

  if (!image) return null

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Photograph viewer"
      className="fixed inset-0 z-[100] flex flex-col bg-ink/[0.97] backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: cinematicEase }}
    >
      <div className="flex items-center justify-between px-5 pt-[max(1.25rem,env(safe-area-inset-top))] sm:px-8 lg:px-12">
        <p className="text-[11px] uppercase tracking-[0.3em] text-mist" aria-live="polite">
          <span className="text-bone">{String(index + 1).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}
          <span className="sr-only">: {image.title}</span>
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close viewer"
          className="group -mr-3 flex h-12 w-12 items-center justify-center text-bone/80 transition-colors hover:text-bone"
        >
          <X className="h-6 w-6 transition-transform duration-500 group-hover:rotate-90" strokeWidth={1.25} />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 sm:px-20 lg:px-28">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={image.id}
            custom={direction}
            variants={{
              enter: (d: number) => ({ opacity: 0, x: d * 80, scale: d === 0 ? 0.94 : 1 }),
              center: { opacity: 1, x: 0, scale: 1 },
              exit: (d: number) => ({ opacity: 0, x: d * -80 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.7, ease: cinematicEase }}
            drag={total > 1 ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.5}
            onDragEnd={onDragEnd}
            className="relative flex max-h-full touch-pan-y items-center justify-center"
          >
            <img
              src={image.image}
              alt={image.alt}
              width={image.width}
              height={image.height}
              draggable={false}
              className="max-h-[calc(100svh-12rem)] w-auto max-w-full select-none object-contain"
            />
            {image.placeholder && <PlaceholderBadge />}
          </motion.div>
        </AnimatePresence>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photograph"
              className="absolute left-2 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center border border-bone/15 text-bone/80 transition-colors hover:border-bone hover:text-bone sm:flex lg:left-8"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.25} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photograph"
              className="absolute right-2 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center border border-bone/15 text-bone/80 transition-colors hover:border-bone hover:text-bone sm:flex lg:right-8"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.25} />
            </button>
          </>
        )}
      </div>

      <div className="flex items-end justify-between gap-6 px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4 sm:px-8 lg:px-12">
        <div className="min-w-0">
          <p className="truncate font-serif text-2xl sm:text-3xl">{image.title}</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-mist">{image.category}</p>
        </div>
        {total > 1 && (
          <div className="flex shrink-0 gap-2 sm:hidden">
            <button type="button" onClick={() => go(-1)} aria-label="Previous photograph" className="flex h-12 w-12 items-center justify-center border border-bone/15">
              <ChevronLeft className="h-5 w-5" strokeWidth={1.25} />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next photograph" className="flex h-12 w-12 items-center justify-center border border-bone/15">
              <ChevronRight className="h-5 w-5" strokeWidth={1.25} />
            </button>
          </div>
        )}
        <p className="hidden text-[10px] uppercase tracking-[0.3em] text-bone/40 sm:block">← → to navigate · Esc to close</p>
      </div>
    </motion.div>
  )
}
