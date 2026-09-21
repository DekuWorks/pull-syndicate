import { CinematicIntro } from '@/components/motion/CinematicIntro'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { Outlet } from 'react-router-dom'

export function SiteShell() {
  return (
    <div className="flex min-h-dvh flex-col bg-onyx text-arctic">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <CinematicIntro />
      <SiteHeader />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}
