import { useLayoutEffect, type DependencyList, type RefObject } from 'react'
import { gsap } from '../animations/gsapConfig'

/** Runs GSAP code inside a scoped context that is fully reverted on unmount / dependency change. */
export function useGsap(setup: () => void | (() => void), scope: RefObject<Element | null>, deps: DependencyList = []) {
  useLayoutEffect(() => {
    let cleanup: void | (() => void)
    const ctx = gsap.context(() => {
      cleanup = setup()
    }, scope.current ?? undefined)
    return () => {
      cleanup?.()
      ctx.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
