import { ArrowUpRight } from 'lucide-react'
import type { MouseEvent, ReactNode } from 'react'
import { useMagnetic } from '../hooks/useMagnetic'
import { scrollToSection } from '../utils/scroll'

export type CTAVariant = 'solid' | 'outline' | 'text' | 'whatsapp'
export type CTASize = 'sm' | 'md' | 'lg'

export interface CTAButtonProps {
  children: ReactNode
  href: string
  variant?: CTAVariant
  size?: CTASize
  external?: boolean
  icon?: ReactNode
  className?: string
  ariaLabel?: string
  magnetic?: boolean
  onClick?: () => void
}

const variants: Record<CTAVariant, string> = {
  solid: 'bg-bone text-ink hover:bg-sand',
  outline: 'border border-bone/30 text-bone hover:border-bone hover:bg-bone hover:text-ink',
  text: 'text-bone hover:text-sand !px-0',
  whatsapp: 'bg-whatsapp text-ink hover:bg-bone',
}

const sizes: Record<CTASize, string> = {
  sm: 'px-5 py-3 text-[10px]',
  md: 'px-7 py-4 text-[11px]',
  lg: 'px-9 py-5 text-xs',
}

/** Magnetic call-to-action link with animated arrow. Internal links (#id) scroll smoothly. */
export function CTAButton({ children, href, variant = 'solid', size = 'md', external, icon, className = '', ariaLabel, magnetic = true, onClick }: CTAButtonProps) {
  const ref = useMagnetic<HTMLAnchorElement>(magnetic && variant !== 'text' ? 0.25 : 0)

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.()
    if (!external && href.startsWith('#')) {
      e.preventDefault()
      scrollToSection(href.slice(1))
    }
  }

  return (
    <a
      ref={ref}
      href={href}
      onClick={handleClick}
      aria-label={ariaLabel}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`group relative inline-flex items-center justify-center gap-3 font-sans font-medium uppercase tracking-[0.25em] transition-colors duration-500 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className={variant === 'text' ? 'link-underline' : ''}>{children}</span>
      <span className="relative inline-flex h-4 w-4 shrink-0 overflow-hidden" aria-hidden="true">
        <ArrowUpRight className="absolute inset-0 h-4 w-4 transition-transform duration-500 ease-[var(--ease-cinematic)] group-hover:-translate-y-full group-hover:translate-x-full" strokeWidth={1.5} />
        <ArrowUpRight className="absolute inset-0 h-4 w-4 -translate-x-full translate-y-full transition-transform duration-500 ease-[var(--ease-cinematic)] group-hover:translate-x-0 group-hover:translate-y-0" strokeWidth={1.5} />
      </span>
    </a>
  )
}
