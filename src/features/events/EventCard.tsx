import { GlowCard } from '@/components/motion/GlowCard'
import { track } from '@/lib/analytics'
import type { EventRecord } from '@/types'

export function EventCard({ event }: { event: EventRecord }) {
  const date = new Date(event.start_time).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  return (
    <GlowCard>
      <p className="font-subhead text-xs tracking-[0.22em] text-gold">
        {event.featured ? 'FEATURED' : 'EVENT'}
      </p>
      <h3 className="mt-2 font-display text-xl">{event.title}</h3>
      <p className="mt-2 text-sm text-arctic/70">{date}</p>
      {event.location ? <p className="text-sm text-arctic/70">{event.location}</p> : null}
      {event.description ? <p className="mt-3 text-arctic/85">{event.description}</p> : null}
      {event.event_url ? (
        <a
          href={event.event_url}
          className="mt-4 inline-flex text-sm text-cyan hover:text-gold"
          onClick={() => track('event_view', { slug: event.slug })}
        >
          Event details
        </a>
      ) : null}
    </GlowCard>
  )
}
