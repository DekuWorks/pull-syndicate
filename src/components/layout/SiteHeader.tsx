import { MobileDrawer } from '@/components/layout/MobileDrawer'
import { primaryNav } from '@/components/layout/nav'
import { SearchDialog } from '@/components/layout/SearchDialog'
import { PsMark } from '@/components/ui/PsMark'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-arctic/10 bg-onyx/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link to="/" className="flex items-center gap-3" aria-label="Pull Syndicate home">
          <PsMark className="h-9 w-9" />
          <span className="hidden font-display text-sm tracking-[0.22em] sm:inline">
            PULL SYNDICATE
          </span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {primaryNav.map((item) => (
            <NavLink
              key={item.to + item.label}
              to={item.to}
              className={({ isActive }) => {
                const shopFilter = item.to.includes('?')
                const active = shopFilter ? false : isActive
                return `text-sm tracking-wide ${active ? 'text-gold' : 'text-arctic/80 hover:text-gold'}`
              }}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="hidden text-sm text-arctic/70 hover:text-gold sm:inline"
            onClick={() => window.dispatchEvent(new Event('ps:open-search'))}
          >
            Search
          </button>
          <Link to="/contact" className="text-sm text-arctic/70 hover:text-gold">
            Account
          </Link>
          <Link to="/shop" className="text-sm text-gold">
            Cart
          </Link>
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
