import { ContactForm } from '@/features/contact/ContactForm'
import { Reveal } from '@/components/motion/Reveal'
import { Container } from '@/components/ui/Container'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'

export function ContactPage() {
  useDocumentMeta({
    title: 'Contact',
    path: '/contact',
    description: 'Write the Syndicate desk — events, product, and partnership enquiries.',
  })

  return (
    <Container className="grid gap-10 py-16 sm:py-24 lg:grid-cols-[0.9fr_1.1fr]">
      <Reveal>
        <p className="font-subhead text-xs tracking-[0.28em] text-gold">CONTACT</p>
        <h1 className="mt-4 font-display text-4xl sm:text-6xl">WRITE THE DESK.</h1>
        <p className="mt-6 text-lg text-arctic/80">
          Events, deck boxes, vendor questions, and press. We read every message.
        </p>
      </Reveal>
      <ContactForm />
    </Container>
  )
}
