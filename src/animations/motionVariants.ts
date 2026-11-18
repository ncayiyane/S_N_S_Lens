import type { Transition, Variants } from 'motion/react'

export const cinematicEase = [0.16, 1, 0.3, 1] as const

export const baseTransition: Transition = { duration: 1, ease: cinematicEase }

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
}

export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
})
