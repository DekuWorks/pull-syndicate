import { GlowCard } from '@/components/motion/GlowCard'
import { Reveal } from '@/components/motion/Reveal'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { Container } from '@/components/ui/Container'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import type { Founder } from '@/types'

const founders: Founder[] = [
  {
    name: 'Marcus Brown',
    role: 'DekuWorks — website, ecommerce, brand systems',
    bio: 'Builds the digital home, checkout path, and systems that keep Pull Syndicate honest as it grows.',
  },
  {
    name: 'Josh Schell',
    role: 'Collectibles, events, and community operations',
    bio: 'Sources product, runs booths, and keeps the collector relationships that make the brand real.',
  },
]

export function AboutPage() {
  useDocumentMeta({
    title: 'About',
    path: '/about',
    description: 'Built by collectors, for collectors. The Pull Syndicate story.',
  })

  return (
    <Container className="py-16 sm:py-24">
      <Reveal>
        <p className="font-subhead text-xs tracking-[0.28em] text-gold">ABOUT</p>
        <h1 className="mt-4 font-display text-4xl sm:text-6xl">
          BUILT BY COLLECTORS.
          <br />
          FOR COLLECTORS.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-arctic/80">
          Pull Syndicate LLC is a collector-first vendor and community brand. Pokémon at launch,
          then selected TCG, LEGO, accessories, and events as the room grows. Equal partners. One
          brand. One dedicated home at PullSyn.co.
        </p>
      </Reveal>
      <Reveal className="mt-12 max-w-3xl space-y-4 text-arctic/80">
        <p>
          We sell what we would buy: sealed product, singles, graded cards, and original PETG deck
          boxes. The shop opens after this brand site. Until then, find us at events and through
          the contact desk.
        </p>
        <p>
          A future collectibles software app is a separate product. This site is the vendor brand —
          not that app.
        </p>
      </Reveal>
      <Stagger className="mt-14 grid gap-5 md:grid-cols-2">
        {founders.map((founder) => (
          <StaggerItem key={founder.name}>
            <GlowCard>
              <h2 className="font-display text-2xl">{founder.name}</h2>
              <p className="mt-2 text-sm text-gold">{founder.role}</p>
              <p className="mt-4 text-arctic/80">{founder.bio}</p>
            </GlowCard>
          </StaggerItem>
        ))}
      </Stagger>
    </Container>
  )
}
