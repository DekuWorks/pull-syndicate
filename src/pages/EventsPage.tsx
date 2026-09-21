import { EventCard } from '@/features/events/EventCard'
import { fetchPublishedEvents } from '@/features/events/api'
import { Reveal } from '@/components/motion/Reveal'
import { Container } from '@/components/ui/Container'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { organisationJsonLd } from '@/lib/seo'
import { useQuery } from '@tanstack/react-query'

export function EventsPage() {
  useDocumentMeta({
    title: 'Events',
    path: '/events',
    description: 'Card shows, trade nights, vendor tables, and community meetups.',
  })

  const events = useQuery({
    queryKey: ['events'],
    queryFn: fetchPublishedEvents,
  })

  const jsonLd = (events.data ?? []).map((event) => ({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    startDate: event.start_time,
    endDate: event.end_time ?? undefined,
    location: event.location
      ? { '@type': 'Place', name: event.location }
      : undefined,
    url: event.event_url ?? undefined,
  }))

  return (
    <Container className="py-16 sm:py-24">
      <script type="application/ld+json">{JSON.stringify([organisationJsonLd(), ...jsonLd])}</script>
      <Reveal>
        <p className="font-subhead text-xs tracking-[0.28em] text-gold">EVENTS</p>
        <h1 className="mt-4 font-display text-4xl sm:text-6xl">SHOW UP.</h1>
        <p className="mt-6 max-w-2xl text-lg text-arctic/80">
          Card shows, trade nights, vendor tables, community meetups, and livestreams.
        </p>
      </Reveal>
      {events.isError ? (
        <p className="mt-8 text-purple" role="alert">
          Events could not be loaded.
        </p>
      ) : null}
      {events.isLoading ? <p className="mt-8 text-arctic/70">Loading events…</p> : null}
      {events.data?.length === 0 ? (
        <p className="mt-8 text-arctic/70">The calendar is quiet. Follow the community page for the next drop.</p>
      ) : (
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {events.data?.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </Container>
  )
}
