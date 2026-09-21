import { MagneticButton } from '@/components/motion/MagneticButton'
import { Parallax } from '@/components/motion/Parallax'
import { Reveal } from '@/components/motion/Reveal'
import { SectionTransition } from '@/components/motion/SectionTransition'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { GlowCard } from '@/components/motion/GlowCard'
import { Container } from '@/components/ui/Container'
import { PsMark } from '@/components/ui/PsMark'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { Link } from 'react-router-dom'

const portals = [
  { title: 'Pokémon / TCG', line: 'CHASE MORE', to: '/shop?category=pokemon', tone: 'gold' },
  { title: 'LEGO / Bricks', line: 'BUILD BIGGER', to: '/shop?category=lego', tone: 'cyan' },
  { title: 'Collectibles', line: 'FIND YOUR NEXT GRAIL', to: '/shop', tone: 'purple' },
  { title: 'Accessories', line: 'GEAR FOR COLLECTORS', to: '/shop?category=accessories', tone: 'gold' },
] as const

const pillars = [
  { title: 'CARDS', line: 'CHASE MORE', copy: 'Trusted sealed product, singles, and graded cards.' },
  { title: 'BRICKS', line: 'BUILD BIGGER', copy: 'Sets and display pieces for builders who collect.' },
  { title: 'COMMUNITY', line: 'BELONG TOGETHER', copy: 'Trade nights, vendor tables, and local collector culture.' },
  { title: 'TECH', line: 'COLLECT SMARTER', copy: 'Systems that keep inventory, drops, and the vault honest.' },
]

export function HomePage() {
  useDocumentMeta({
    title: 'Collect. Build. Belong.',
    path: '/',
    description:
      'Cards. LEGO. Collectibles. Community. Pull Syndicate is more than a store — it is a movement.',
  })

  return (
    <>
      <section className="relative isolate min-h-[100dvh] overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.16),transparent_36%),radial-gradient(circle_at_80%_30%,rgba(124,58,237,0.12),transparent_32%),radial-gradient(circle_at_60%_80%,rgba(0,229,255,0.08),transparent_28%)]"
        />
        <div aria-hidden className="absolute inset-0 opacity-40 [background-image:radial-gradient(#d4af37_0.6px,transparent_0.6px)] [background-size:18px_18px]" />
        <Container className="relative grid min-h-[100dvh] items-center gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="font-subhead text-xs tracking-[0.36em] text-gold">COLLECT • BUILD • BELONG</p>
            <h1 className="mt-5 font-display text-5xl leading-[0.95] tracking-[0.12em] sm:text-7xl">
              COLLECT.
              <br />
              BUILD.
              <br />
              BELONG.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-arctic/80">
              Cards. LEGO. Collectibles. Community. Pull Syndicate is more than a store — it is a
              movement.
            </p>
            <div className="mt-8">
              <MagneticButton>
                <Link
                  to="/community"
                  className="inline-flex min-h-11 items-center justify-center rounded-md bg-gold px-5 font-subhead text-xs uppercase tracking-[0.18em] text-onyx hover:bg-gold-dim"
                >
                  Join the Syndicate
                </Link>
              </MagneticButton>
            </div>
          </div>
          <Parallax className="relative mx-auto grid w-full max-w-md place-items-center">
            <div className="relative grid aspect-square w-full place-items-center rounded-3xl border border-gold/25 bg-black shadow-glow-gold">
              <div className="grid w-[80%] justify-items-center gap-6">
                <PsMark className="h-32 w-32" />
                <img
                  src="/branding/logo-wordmark.jpg"
                  alt="Pull Syndicate"
                  className="logo-on-black w-full object-contain"
                  width={420}
                  height={80}
                />
              </div>
            </div>
          </Parallax>
        </Container>
      </section>

      <section className="border-y border-arctic/10 py-6">
        <Container className="grid grid-cols-2 gap-4 text-center text-xs tracking-[0.16em] text-arctic/70 sm:grid-cols-4">
          <p>AUTHENTIC PRODUCTS</p>
          <p>FAST SHIPPING</p>
          <p>GROWING COMMUNITY</p>
          <p>SECURE CHECKOUT</p>
        </Container>
      </section>

      <SectionTransition className="py-20" tone="gold">
        <Container>
          <Reveal>
            <p className="font-subhead text-xs tracking-[0.28em] text-gold">COLLECTION PORTALS</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">Pick your lane.</h2>
          </Reveal>
          <Stagger className="mt-10 grid gap-5 md:grid-cols-2">
            {portals.map((portal) => (
              <StaggerItem key={portal.title}>
                <Link to={portal.to} className="block">
                  <GlowCard className="min-h-44">
                    <p className="font-subhead text-xs tracking-[0.24em] text-gold">{portal.line}</p>
                    <h3 className="mt-3 font-display text-2xl">{portal.title}</h3>
                    {portal.title === 'Accessories' ? (
                      <p className="mt-3 text-sm text-arctic/70">
                        Signature PETG deck boxes and collector gear — shop opens next.
                      </p>
                    ) : null}
                  </GlowCard>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </SectionTransition>

      <SectionTransition className="py-20" tone="purple">
        <Container>
          <Reveal>
            <h2 className="font-display text-3xl sm:text-5xl">
              MORE THAN CARDS.
              <br />
              A BIGGER CULTURE.
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-arctic/80">
              Collecting, building, community, and technology — one brand for people who take the
              hobby seriously.
            </p>
          </Reveal>
          <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => (
              <StaggerItem key={pillar.title}>
                <GlowCard>
                  <p className="font-display text-xl">{pillar.title}</p>
                  <p className="mt-2 text-xs tracking-[0.2em] text-gold">{pillar.line}</p>
                  <p className="mt-4 text-sm text-arctic/75">{pillar.copy}</p>
                </GlowCard>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </SectionTransition>
    </>
  )
}
