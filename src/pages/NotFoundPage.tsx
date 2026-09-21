import { Container } from '@/components/ui/Container'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { Link } from 'react-router-dom'

export function NotFoundPage() {
  useDocumentMeta({
    title: 'Not found',
    path: '/404',
    description: 'This Pull Syndicate page does not exist.',
  })

  return (
    <Container className="py-24">
      <h1 className="font-display text-4xl">PAGE NOT FOUND.</h1>
      <p className="mt-4 text-arctic/75">That route is not on the map.</p>
      <Link to="/" className="mt-6 inline-block text-gold">
        Back home
      </Link>
    </Container>
  )
}
