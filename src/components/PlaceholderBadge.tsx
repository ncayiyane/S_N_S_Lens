/** Marks development placeholder images so they are never mistaken for real SnS_Lenses work. */
export function PlaceholderBadge({ className = '' }: { className?: string }) {
  return (
    <span
      className={`pointer-events-none absolute left-3 top-3 z-10 bg-ink/60 px-2 py-1 font-sans text-[9px] font-medium uppercase tracking-[0.25em] text-bone/70 backdrop-blur-sm ${className}`}
    >
      Placeholder
    </span>
  )
}
