import { useRef, type ReactNode } from 'react'
import { revealSplit, fadeUp } from '../animations/scrollAnimations'
import { useGsap } from '../hooks/useGsap'
import { SplitText } from './SplitText'

interface SectionHeadingProps {
  index: string
  eyebrow: string
  /** Each entry renders on its own line. */
  lines: string[]
  by?: 'words' | 'chars'
  /** Index of a line to render in italic sand accent. */
  accentLine?: number
  aside?: ReactNode
  className?: string
  id?: string
}

export function SectionHeading({ index, eyebrow, lines, by = 'words', accentLine, aside, className = '', id }: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGsap(() => {
    const el = ref.current
    if (!el) return
    revealSplit(el.querySelector('h2'), { trigger: el })
    fadeUp(el.querySelectorAll('[data-fade]'), { trigger: el, delay: 0.2 })
  }, ref)

  return (
    <div ref={ref} className={`flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between ${className}`}>
      <div>
        <p data-fade className="eyebrow mb-6 flex items-center gap-4">
          <span className="text-bone/50">{index}</span>
          <span className="h-px w-10 bg-sand/50" />
          {eyebrow}
        </p>
        <h2 id={id} className="font-serif text-[clamp(2.6rem,7.5vw,7.5rem)] font-normal uppercase leading-[0.92] tracking-[-0.02em]">
          {lines.map((line, i) => (
            <span key={line} className={`block ${i === accentLine ? 'italic text-sand normal-case' : ''}`}>
              <SplitText text={line} by={by} />
            </span>
          ))}
        </h2>
      </div>
      {aside && (
        <div data-fade className="max-w-sm">
          {aside}
        </div>
      )}
    </div>
  )
}
