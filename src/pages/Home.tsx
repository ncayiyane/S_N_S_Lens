import { AnimatePresence } from 'motion/react'
import { lazy, Suspense, useCallback, useState } from 'react'
import { About } from '../components/About'
import { BookingCTA } from '../components/BookingCTA'
import { Contact } from '../components/Contact'
import { FeaturedWork } from '../components/FeaturedWork'
import { Footer } from '../components/Footer'
import { Hero } from '../components/Hero'
import { InstagramSection } from '../components/InstagramSection'
import { Navbar } from '../components/Navbar'
import { Portfolio } from '../components/Portfolio'
import { Services } from '../components/Services'
import { WhatsAppButton } from '../components/WhatsAppButton'
import { WhyChooseUs } from '../components/WhyChooseUs'
import type { GalleryImage } from '../data/gallery'

const GalleryLightbox = lazy(() => import('../components/GalleryLightbox'))

interface LightboxState {
  images: GalleryImage[]
  index: number
}

export function Home({ ready }: { ready: boolean }) {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null)
  const open = useCallback((images: GalleryImage[], index: number) => setLightbox({ images, index }), [])
  const close = useCallback(() => setLightbox(null), [])
  const setIndex = useCallback((index: number) => setLightbox((lb) => (lb ? { ...lb, index } : lb)), [])

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[130] focus:bg-bone focus:px-4 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <Navbar ready={ready} />
      <main id="main">
        <Hero ready={ready} />
        <About />
        <FeaturedWork onOpen={open} />
        <Portfolio onOpen={open} />
        <Services />
        <WhyChooseUs />
        <InstagramSection />
        <BookingCTA />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton visible={ready && !lightbox} />
      <AnimatePresence>
        {lightbox && (
          <Suspense fallback={null}>
            <GalleryLightbox key="lightbox" images={lightbox.images} index={lightbox.index} onIndexChange={setIndex} onClose={close} />
          </Suspense>
        )}
      </AnimatePresence>
    </>
  )
}
