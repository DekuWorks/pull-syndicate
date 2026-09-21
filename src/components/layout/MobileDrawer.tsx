import { mobileNav } from '@/components/layout/nav'
import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'

export function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-onyx/70"
        aria-label="Close navigation"
        onClick={onClose}
      />
      <nav
        id="mobile-drawer"
        aria-label="Mobile"
        className="absolute inset-y-0 right-0 flex w-[min(86vw,22rem)] flex-col gap-2 bg-onyx p-6 shadow-card"
      >
        <button
          ref={closeRef}
          type="button"
          className="self-end text-sm uppercase tracking-[0.18em] text-gold"
          onClick={onClose}
        >
          Close
        </button>
        {mobileNav.map((item) => (
          <NavLink
            key={item.to + item.label}
            to={item.to}
            onClick={onClose}
            className="min-h-11 border-b border-arctic/10 py-3 text-lg"
          >
            {item.label}
          </NavLink>
        ))}
        <NavLink to="/shop" onClick={onClose} className="min-h-11 py-3 text-gold">
          Cart
        </NavLink>
        <NavLink to="/contact" onClick={onClose} className="min-h-11 py-3">
          Account
        </NavLink>
      </nav>
    </div>
  )
}
