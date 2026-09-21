import { EventCard } from '@/features/events/EventCard'
import { fetchPublishedEvents } from '@/features/events/api'
import { Reveal } from '@/components/motion/Reveal'
import { Container } from '@/components/ui/Container'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

const socials = [
  { href: 'https://instagram.com/pullsyndicate', label: 'Instagram' },
  { href: 'https://tiktok.com/@pullsyn', label: 'TikTok' },
  { href: 'https://discord.com', label: 'Discord' },
  { href: 'https://youtube.com', label: 'YouTube' },
]

export function CommunityPage() {
  useDocumentMeta({
    title: 'Community',
    path: '/community',
    description: 'Join the Syndicate — events, socials, and collector culture.',
  })

  const events = useQuery({
    queryKey: ['events', 'featured'],
    queryFn: fetchPublishedEvents,
  })

  const featured = (events.data ?? []).filter((item) => item.featured).slice(0, 3)

  return (
    <Container className="py-16 sm:py-24">
      <Reveal>
        <p className="font-subhead text-xs tracking-[0.28em] text-gold">COMMUNITY</p>
        <h1 className="mt-4 font-display text-4xl sm:text-6xl">JOIN THE SYNDICATE</h1>
        <p className="mt-6 max-w-2xl text-lg text-arctic/80">
          This is not a social network yet. It is the door: events, content, and a list of people
          who actually show up.
        </p>
      </Reveal>
      <div className="mt-10 flex flex-wrap gap-3">
        {socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            className="rounded-md border border-arctic/15 px-4 py-2 text-sm hover:border-gold hover:text-gold"
            rel="noreferrer"
            target="_blank"
          >
            {social.label}
          </a>
        ))}
        <Link
          to="/contact"
          className="rounded-md bg-gold px-4 py-2 text-sm text-onyx hover:bg-gold-dim"
        >
          Newsletter desk
        </Link>
      </div>
      <section className="mt-16">
        <h2 className="font-display text-2xl">Featured events</h2>
        {events.isLoading ? <p className="mt-4 text-arctic/70">Loading events…</p> : null}
        {featured.length === 0 && !events.isLoading ? (
          <p className="mt-4 text-arctic/70">
            No public events yet. Check back or <Link to="/contact">ask us what is next</Link>.
          </p>
        ) : (
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {featured.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>
    </Container>
  )
}
