import { Container } from '@/components/ui/Container'
import { PsMark } from '@/components/ui/PsMark'
import { Link } from 'react-router-dom'

const footerLinks = [
  { to: '/shop', label: 'Cards' },
  { to: '/shop?category=lego', label: 'LEGO' },
  { to: '/shop', label: 'Collectibles' },
  { to: '/community', label: 'Community' },
  { to: '/about', label: 'Tech' },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-arctic/10 bg-onyx">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <PsMark className="h-8 w-8" />
          <div>
            <p className="font-display text-sm tracking-[0.2em]">PULL SYNDICATE</p>
            <p className="text-xs tracking-[0.24em] text-gold">COLLECT • BUILD • BELONG</p>
          </div>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-4 text-sm text-arctic/70">
          {footerLinks.map((link) => (
            <Link key={link.label} to={link.to} className="hover:text-gold">
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-sm text-gold">Collect today. Build tomorrow.</p>
      </Container>
    </footer>
  )
}
