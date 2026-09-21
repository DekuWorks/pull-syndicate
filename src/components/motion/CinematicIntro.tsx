import { LogoReveal } from '@/components/motion/LogoReveal'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { INTRO_STORAGE_KEY, markIntroSeen, shouldShowIntro } from '@/lib/intro'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

function readIntroPreference(prefersReducedMotion: boolean) {
  if (typeof window === 'undefined') return false
  return shouldShowIntro(window.localStorage.getItem(INTRO_STORAGE_KEY), prefersReducedMotion)
}

export function CinematicIntro() {
  const reduced = usePrefersReducedMotion()
  const [open, setOpen] = useState(() =>
    readIntroPreference(
      typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    ),
  )

  function finish() {
    markIntroSeen()
    setOpen(false)
  }

  const visible = open && !reduced

  useEffect(() => {
    if (!visible) return
    const timer = window.setTimeout(finish, 3400)
    return () => window.clearTimeout(timer)
  }, [visible])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[70] grid place-items-center bg-onyx"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          role="dialog"
          aria-label="Pull Syndicate introduction"
        >
          <button
            type="button"
            onClick={finish}
            className="absolute right-5 top-5 text-sm uppercase tracking-[0.2em] text-arctic/70 hover:text-gold"
          >
            Skip intro
          </button>
          <div className="grid justify-items-center gap-6 px-6 text-center">
            <motion.div
              className="h-px w-24 bg-gold"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            />
            <LogoReveal className="h-24 w-24" />
            <motion.p
              className="font-display text-3xl tracking-[0.28em] text-arctic sm:text-4xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              PULL SYNDICATE
            </motion.p>
            <motion.p
              className="font-subhead text-sm tracking-[0.32em] text-gold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              COLLECT • BUILD • BELONG
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
