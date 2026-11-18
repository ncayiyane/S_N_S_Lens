import { prefersReducedMotion } from '../animations/gsapConfig'

export function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
  history.replaceState(null, '', id === 'home' ? window.location.pathname : `#${id}`)
}
