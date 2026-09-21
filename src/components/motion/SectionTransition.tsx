import { cn } from '@/lib/cn'
import type { ReactNode } from 'react'

export function SectionTransition({
  children,
  className,
  tone = 'gold',
}: {
  children: ReactNode
  className?: string
  tone?: 'gold' | 'cyan' | 'purple'
}) {
  const glow = {
    gold: 'from-gold/15',
    cyan: 'from-cyan/12',
    purple: 'from-purple/16',
  }[tone]

  return (
    <section className={cn('relative overflow-hidden', className)}>
      <div
        aria-hidden
        className={cn('pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r', glow)}
      />
      {children}
    </section>
  )
}
