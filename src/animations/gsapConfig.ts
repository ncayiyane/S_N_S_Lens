import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
gsap.defaults({ ease: 'power3.out', duration: 1 })
ScrollTrigger.config({ ignoreMobileResize: true })

export const EASE = {
  reveal: 'expo.out',
  inOut: 'power4.inOut',
  soft: 'power2.out',
} as const

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const isFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches

let refreshTimer: number | undefined
/** Debounced ScrollTrigger refresh, used after layout changes (filters, image loads). */
export function refreshScrollTriggers(delay = 150) {
  window.clearTimeout(refreshTimer)
  refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), delay)
}

export { gsap, ScrollTrigger }
