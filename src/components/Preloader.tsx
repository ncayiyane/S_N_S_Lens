import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../animations/gsapConfig'
import { business, siteImages } from '../data/business'

interface PreloaderProps {
  /** Fired as the curtain starts lifting — hero entrance begins here. */
  onReveal: () => void
  /** Fired once the preloader has fully left the screen. */
  onDone: () => void
}

const MAX_WAIT_MS = 3500

export function Preloader({ onReveal, onDone }: PreloaderProps) {
  const root = useRef<HTMLDivElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    let heroLoaded = false
    let resume: (() => void) | undefined
    const img = new Image()
    const markLoaded = () => {
      heroLoaded = true
      resume?.()
    }
    img.onload = img.onerror = markLoaded
    img.src = siteImages.hero.src
    const fallback = window.setTimeout(markLoaded, MAX_WAIT_MS)

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.timeline({ onComplete: onDone }).call(onReveal, [], 0.2).to(root.current, { autoAlpha: 0, duration: 0.4 }, 0.2)
        return
      }
      const counter = { v: 0 }
      const tl = gsap.timeline({ onComplete: onDone })
      tl.from('.pl-char', { yPercent: 120, duration: 1.1, stagger: 0.045, ease: 'expo.out' })
        .from('.pl-meta', { autoAlpha: 0, y: 12, duration: 0.7, stagger: 0.08 }, 0.3)
        .to(counter, {
          v: 100,
          duration: 1.5,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (countRef.current) countRef.current.textContent = String(Math.round(counter.v)).padStart(3, '0')
          },
        }, 0.2)
        .to('.pl-bar', { scaleX: 1, duration: 1.5, ease: 'power2.inOut' }, 0.2)
        .call(() => {
          if (!heroLoaded) {
            tl.pause()
            resume = () => tl.play()
          }
        })
        .to('.pl-char', { yPercent: -120, duration: 0.7, stagger: 0.025, ease: 'power3.in' }, '+=0.15')
        .to('.pl-meta, .pl-bar-wrap', { autoAlpha: 0, duration: 0.4 }, '<')
        .call(onReveal, [], '-=0.1')
        .to(root.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.1, ease: 'expo.inOut' }, '-=0.15')
    }, root)

    return () => {
      window.clearTimeout(fallback)
      ctx.revert()
    }
  }, [onReveal, onDone])

  return (
    <div
      ref={root}
      role="status"
      aria-live="polite"
      aria-label="Loading SnS_Lenses"
      className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-ink px-6"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
    >
      <div className="pl-meta eyebrow mb-8 text-mist">Photography — {business.location.region}</div>
      <div className="overflow-hidden pb-2">
        <h1 aria-hidden="true" className="flex font-serif text-[clamp(3rem,12vw,10rem)] leading-none tracking-[-0.03em]">
          {business.name.split('').map((c, i) => (
            <span key={i} className={`pl-char inline-block ${c === '_' ? 'text-sand' : ''}`}>
              {c}
            </span>
          ))}
        </h1>
      </div>
      <div className="pl-bar-wrap mt-10 flex w-[min(320px,70vw)] items-center gap-4">
        <div className="relative h-px flex-1 bg-bone/15">
          <div className="pl-bar absolute inset-0 origin-left scale-x-0 bg-sand" />
        </div>
        <span ref={countRef} className="pl-meta w-8 text-right font-sans text-[11px] tabular-nums tracking-widest text-bone/70">
          000
        </span>
      </div>
    </div>
  )
}
