import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

export function Parallax({
  children,
  className,
  offset = 40,
}: {
  children: ReactNode
  className?: string
  offset?: number
}) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset])

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}
