import { cn } from '@/lib/cn'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export function GlowCard({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const reduced = usePrefersReducedMotion()

  return (
    <motion.article
      className={cn(
        'rounded-2xl border border-arctic/10 bg-arctic/5 p-6 shadow-card',
        className,
      )}
      whileHover={reduced ? undefined : { y: -6, boxShadow: '0 0 32px rgb(212 175 55 / 0.28)' }}
      transition={{ duration: 0.28 }}
    >
      {children}
    </motion.article>
  )
}
