import { Reveal } from '@/components/motion/Reveal'
import { Container } from '@/components/ui/Container'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { Link } from 'react-router-dom'

export function ShopPlaceholderPage() {
  useDocumentMeta({
    title: 'Shop',
    path: '/shop',
    description: 'The Pull Syndicate shop is being built. Events and contact are live now.',
  })

  return (
    <Container className="py-24">
      <Reveal>
        <p className="font-subhead text-xs tracking-[0.28em] text-gold">SHOP</p>
        <h1 className="mt-4 font-display text-4xl sm:text-6xl">OPENING SOON.</h1>
        <p className="mt-6 max-w-xl text-lg text-arctic/80">
          Inventory, checkout, and the $15 PETG deck boxes ship in a later phase. Until then, meet
          us at events or send the desk a note.
        </p>
        <div className="mt-8 flex gap-4">
          <Link to="/events" className="text-gold hover:underline">
            See events
          </Link>
          <Link to="/contact" className="text-arctic/80 hover:text-gold">
            Contact
          </Link>
        </div>
      </Reveal>
    </Container>
  )
}
