import { Container } from '@/components/ui/Container'
import { BrandLockup } from '@/components/ui/BrandLockup'
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
        <Link to="/" aria-label="Pull Syndicate home">
          <BrandLockup />
        </Link>
        <nav aria-label="Footer" className="flex flex-wrap gap-4 font-subhead text-xs uppercase tracking-[0.18em] text-arctic/70">
          {footerLinks.map((link) => (
            <Link key={link.label} to={link.to} className="hover:text-gold">
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="font-subhead text-xs uppercase tracking-[0.2em] text-gold">
          Collect today. Build tomorrow.
        </p>
      </Container>
    </footer>
  )
}
