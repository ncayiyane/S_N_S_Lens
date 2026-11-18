import { useRef } from 'react'
import { fadeUp, scrubWords } from '../animations/scrollAnimations'
import { business } from '../data/business'
import { useGsap } from '../hooks/useGsap'
import { SplitText } from './SplitText'

const points = [
  { title: 'Creative Storytelling', text: 'Every session is approached as a story — composed with intention, emotion and a cinematic eye.' },
  { title: 'Attention to Detail', text: 'From light and framing to the small, fleeting expressions that make an image feel alive.' },
  { title: 'Personal Photography Experience', text: 'A relaxed, one-on-one approach where your ideas and your comfort come first.' },
  { title: 'Serving Kouga and Surrounding Areas', text: `Available across ${business.serviceAreas.slice(0, -1).join(', ')} and nearby.` },
]

export function WhyChooseUs() {
  const root = useRef<HTMLElement>(null)

  useGsap(() => {
    const el = root.current
    if (!el) return
    scrubWords(el.querySelector('h2'))
    fadeUp(el.querySelectorAll('.why-point'), { trigger: el.querySelector('.why-grid'), start: 'top 80%', stagger: 0.12 })
  }, root)

  return (
    <section ref={root} aria-labelledby="why-title" className="relative overflow-hidden bg-charcoal py-28 sm:py-36 lg:py-48">
      <div className="mx-auto max-w-[1800px] px-5 sm:px-8 lg:px-16 xl:px-20">
        <p className="eyebrow mb-10 flex items-center gap-4">
          <span className="text-bone/50">05</span>
          <span className="h-px w-10 bg-sand/50" />
          Why {business.name}
        </p>
        <h2 id="why-title" className="max-w-[18ch] font-serif text-[clamp(2.4rem,6.8vw,7rem)] uppercase leading-[0.95] tracking-[-0.02em]">
          <SplitText text="More than a photograph." /> <span className="italic text-sand normal-case"><SplitText text="A memory that lasts." /></span>
        </h2>

        <div className="why-grid mt-20 grid gap-px bg-bone/10 sm:grid-cols-2 lg:mt-28 lg:grid-cols-4">
          {points.map((p, i) => (
            <article key={p.title} className="why-point group flex flex-col gap-6 bg-charcoal p-8 transition-colors duration-700 hover:bg-ink lg:min-h-[22rem] lg:p-10">
              <span className="font-serif text-6xl italic text-bone/15 transition-colors duration-700 group-hover:text-sand">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-auto font-serif text-3xl leading-tight">{p.title}</h3>
              <p className="text-sm leading-relaxed text-mist">{p.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
