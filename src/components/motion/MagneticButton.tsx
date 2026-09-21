import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import type { ReactNode } from 'react'

export function MagneticButton({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const reduced = usePrefersReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 240, damping: 18 })
  const springY = useSpring(y, { stiffness: 240, damping: 18 })

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        x.set((event.clientX - rect.left - rect.width / 2) * 0.25)
        y.set((event.clientY - rect.top - rect.height / 2) * 0.25)
      }}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}
