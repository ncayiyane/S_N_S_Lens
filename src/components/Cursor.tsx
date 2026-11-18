import { useEffect, useRef, useState } from 'react'
import { gsap } from '../animations/gsapConfig'
import { useFinePointer } from '../hooks/useMediaQuery'
import { useReducedMotion } from '../hooks/useReducedMotion'

type Mode = 'default' | 'link' | 'view' | 'hidden'

/** Desktop-only custom cursor. Expands to "View" over elements with data-cursor="view". */
export function Cursor() {
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const enabled = fine && !reduced
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [mode, setMode] = useState<Mode>('hidden')

  useEffect(() => {
    if (!enabled || !dotRef.current || !ringRef.current) return
    const root = document.documentElement
    root.classList.add('has-custom-cursor')
    gsap.set([dotRef.current, ringRef.current], { xPercent: -50, yPercent: -50 })
    const dx = gsap.quickTo(dotRef.current, 'x', { duration: 0.12, ease: 'power3' })
    const dy = gsap.quickTo(dotRef.current, 'y', { duration: 0.12, ease: 'power3' })
    const rx = gsap.quickTo(ringRef.current, 'x', { duration: 0.5, ease: 'power3' })
    const ry = gsap.quickTo(ringRef.current, 'y', { duration: 0.5, ease: 'power3' })
    let current: Mode = 'hidden'
    const update = (next: Mode) => {
      if (next !== current) {
        current = next
        setMode(next)
      }
    }
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      dx(e.clientX)
      dy(e.clientY)
      rx(e.clientX)
      ry(e.clientY)
      const target = e.target as Element | null
      if (target?.closest('[data-cursor="view"]')) update('view')
      else if (target?.closest('a, button, [role="button"], label')) update('link')
      else update('default')
    }
    const leave = () => update('hidden')
    const press = () => update('default')
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', leave)
    window.addEventListener('pointerdown', press)
    return () => {
      root.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
      window.removeEventListener('pointerdown', press)
    }
  }, [enabled])

  if (!enabled) return null

  const ringSize = mode === 'view' ? 'h-24 w-24 bg-bone border-bone' : mode === 'link' ? 'h-14 w-14 border-sand' : 'h-9 w-9 border-bone/50'

  return (
    <div aria-hidden="true" className={`pointer-events-none fixed inset-0 z-[110] transition-opacity duration-300 ${mode === 'hidden' ? 'opacity-0' : 'opacity-100'}`}>
      <div ref={ringRef} className="fixed left-0 top-0">
        <div className={`flex items-center justify-center rounded-full border transition-all duration-500 ease-[var(--ease-cinematic)] ${ringSize}`}>
          <span className={`text-[10px] font-medium uppercase tracking-[0.3em] text-ink transition-opacity duration-300 ${mode === 'view' ? 'opacity-100' : 'opacity-0'}`}>View</span>
        </div>
      </div>
      <div ref={dotRef} className={`fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-sand transition-opacity duration-200 ${mode === 'view' ? 'opacity-0' : 'opacity-100'}`} />
    </div>
  )
}
