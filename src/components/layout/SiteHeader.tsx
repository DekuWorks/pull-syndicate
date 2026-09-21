import { MobileDrawer } from '@/components/layout/MobileDrawer'
import { primaryNav } from '@/components/layout/nav'
import { SearchDialog } from '@/components/layout/SearchDialog'
import { BrandLockup } from '@/components/ui/BrandLockup'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-arctic/10 bg-onyx">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link to="/" className="flex items-center" aria-label="Pull Syndicate home">
          <BrandLockup compact />
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {primaryNav.map((item) => (
            <NavLink
              key={item.to + item.label}
              to={item.to}
              className={({ isActive }) => {
                const shopFilter = item.to.includes('?')
                const active = shopFilter ? false : isActive
                return `font-subhead text-xs tracking-[0.18em] uppercase ${active ? 'text-gold' : 'text-arctic/80 hover:text-gold'}`
              }}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3 font-subhead text-xs uppercase tracking-[0.16em]">
          <button
            type="button"
            className="hidden text-arctic/70 hover:text-gold sm:inline"
            onClick={() => window.dispatchEvent(new Event('ps:open-search'))}
          >
            Search
          </button>
          <button
            type="button"
            className="min-h-11 min-w-11 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-drawer"
            onClick={() => setOpen(true)}
          >
            Menu
          </button>
        </div>
      </div>
      <MobileDrawer open={open} onClose={() => setOpen(false)} />
      <SearchDialog />
    </header>
  )
}
