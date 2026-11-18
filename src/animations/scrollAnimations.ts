import { EASE, gsap, prefersReducedMotion } from './gsapConfig'

/**
 * Shared scroll-driven animations. Call these inside a gsap.context()
 * (see useGsap) so tweens and ScrollTriggers are reverted on unmount.
 */

type Target = gsap.TweenTarget

interface RevealOptions {
  trigger?: Element | null
  start?: string
  delay?: number
  stagger?: number
}

/** Masked word/character reveal for elements rendered with <SplitText />. */
export function revealSplit(container: Element | null, { trigger, start = 'top 85%', delay = 0, stagger }: RevealOptions = {}) {
  if (!container) return
  const items = container.querySelectorAll('.split-item')
  if (!items.length) return
  if (prefersReducedMotion()) return gsap.set(items, { yPercent: 0 })
  const isChars = container.querySelector('[data-split="chars"]') !== null
  return gsap.from(items, {
    yPercent: 115,
    rotate: isChars ? 0 : 2,
    duration: 1.2,
    delay,
    ease: EASE.reveal,
    stagger: stagger ?? (isChars ? 0.025 : 0.06),
    scrollTrigger: { trigger: trigger ?? container, start, once: true },
  })
}

/** Image reveal through a clipping mask, with the inner image settling from a slight zoom. */
export function clipReveal(wrapper: Element | null, { start = 'top 85%', delay = 0, direction = 'up' }: { start?: string; delay?: number; direction?: 'up' | 'left' | 'right' } = {}) {
  if (!wrapper) return
  const img = wrapper.querySelector('img')
  if (prefersReducedMotion()) return
  const from = direction === 'up' ? 'inset(100% 0% 0% 0%)' : direction === 'left' ? 'inset(0% 100% 0% 0%)' : 'inset(0% 0% 0% 100%)'
  const tl = gsap.timeline({ delay, scrollTrigger: { trigger: wrapper, start, once: true } })
  tl.fromTo(wrapper, { clipPath: from }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: EASE.inOut })
  if (img) tl.fromTo(img, { scale: 1.3 }, { scale: 1, duration: 1.8, ease: EASE.reveal }, 0)
  return tl
}

/** Subtle scroll-linked parallax. `amount` is a yPercent range. */
export function parallax(target: Element | null, amount = 8, trigger?: Element | null) {
  if (!target || prefersReducedMotion()) return
  return gsap.fromTo(
    target,
    { yPercent: -amount },
    {
      yPercent: amount,
      ease: 'none',
      scrollTrigger: { trigger: trigger ?? target.parentElement ?? target, start: 'top bottom', end: 'bottom top', scrub: true },
    },
  )
}

/** Staggered fade-up for text blocks. */
export function fadeUp(targets: Target, { trigger, start = 'top 85%', delay = 0, stagger = 0.12 }: RevealOptions = {}) {
  if (prefersReducedMotion()) return
  return gsap.from(targets, {
    autoAlpha: 0,
    y: 36,
    duration: 1.1,
    delay,
    stagger,
    ease: EASE.soft,
    scrollTrigger: trigger ? { trigger, start, once: true } : undefined,
  })
}

/** Scroll-scrubbed word highlight (words fade from dim to full opacity). */
export function scrubWords(container: Element | null) {
  if (!container) return
  const items = container.querySelectorAll('.split-item')
  if (prefersReducedMotion()) return
  return gsap.fromTo(
    items,
    { opacity: 0.12 },
    { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: container, start: 'top 80%', end: 'bottom 45%', scrub: 0.6 } },
  )
}

/** Horizontal scroll-linked drift for decorative oversized text. */
export function drift(target: Element | null, distance = 20) {
  if (!target || prefersReducedMotion()) return
  return gsap.fromTo(
    target,
    { xPercent: distance / 2 },
    { xPercent: -distance, ease: 'none', scrollTrigger: { trigger: target.parentElement ?? target, start: 'top bottom', end: 'bottom top', scrub: true } },
  )
}
