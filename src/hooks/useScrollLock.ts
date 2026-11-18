import { useEffect } from 'react'

let locks = 0

/** Locks page scrolling while `active` is true. Supports nested locks. */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return
    const html = document.documentElement
    if (locks++ === 0) {
      const scrollbar = window.innerWidth - html.clientWidth
      html.style.overflow = 'hidden'
      if (scrollbar > 0) html.style.paddingRight = `${scrollbar}px`
    }
    return () => {
      if (--locks === 0) {
        html.style.overflow = ''
        html.style.paddingRight = ''
      }
    }
  }, [active])
}
