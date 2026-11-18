import { Fragment } from 'react'

interface SplitTextProps {
  text: string
  by?: 'words' | 'chars'
  className?: string
}

/**
 * Renders text split into masked words or characters (`.split-item`) for GSAP reveals.
 * Screen readers get the plain text.
 */
export function SplitText({ text, by = 'words', className = '' }: SplitTextProps) {
  const words = text.split(' ')
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" data-split={by}>
        {words.map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            <span className="inline-block overflow-hidden whitespace-nowrap pb-[0.12em] -mb-[0.12em] align-bottom">
              {by === 'chars' ? (
                word.split('').map((char, j) => (
                  <span key={j} className="split-item inline-block will-change-transform">
                    {char}
                  </span>
                ))
              ) : (
                <span className="split-item inline-block will-change-transform">{word}</span>
              )}
            </span>
            {i < words.length - 1 && ' '}
          </Fragment>
        ))}
      </span>
    </span>
  )
}
