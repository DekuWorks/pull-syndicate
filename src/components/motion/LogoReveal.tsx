import { PsMark } from '@/components/ui/PsMark'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { motion } from 'framer-motion'

export function LogoReveal({ className = 'h-20 w-20' }: { className?: string }) {
  const reduced = usePrefersReducedMotion()

  if (reduced) return <PsMark className={className} />

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.86, filter: 'blur(8px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.8, ease: [0.77, 0, 0.18, 1] }}
    >
      <PsMark className={className} />
    </motion.div>
  )
}
