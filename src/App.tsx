import { MotionConfig } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'
import { refreshScrollTriggers } from './animations/gsapConfig'
import { Cursor } from './components/Cursor'
import { Preloader } from './components/Preloader'
import { useScrollLock } from './hooks/useScrollLock'
import { Home } from './pages/Home'

const PRELOADED_KEY = 'sns-preloaded'

const alreadyPreloaded = () => {
  try {
    return sessionStorage.getItem(PRELOADED_KEY) === '1'
  } catch {
    return false
  }
}

export default function App() {
  const [skipPreloader] = useState(alreadyPreloaded)
  const [ready, setReady] = useState(skipPreloader)
  const [showPreloader, setShowPreloader] = useState(!skipPreloader)

  useScrollLock(showPreloader)

  const onReveal = useCallback(() => setReady(true), [])
  const onDone = useCallback(() => {
    setShowPreloader(false)
    try {
      sessionStorage.setItem(PRELOADED_KEY, '1')
    } catch {
      /* storage unavailable */
    }
  }, [])

  useEffect(() => {
    const refresh = () => refreshScrollTriggers(100)
    window.addEventListener('load', refresh)
    document.fonts?.ready.then(refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  useEffect(() => {
    if (!showPreloader) refreshScrollTriggers(50)
  }, [showPreloader])

  return (
    <MotionConfig reducedMotion="user">
      <div className="grain">
        {showPreloader && <Preloader onReveal={onReveal} onDone={onDone} />}
        <Home ready={ready} />
        <Cursor />
      </div>
    </MotionConfig>
  )
}
