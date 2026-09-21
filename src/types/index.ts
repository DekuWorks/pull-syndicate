export type EventRecord = {
  id: string
  title: string
  slug: string
  description: string | null
  location: string | null
  start_time: string
  end_time: string | null
  image: string | null
  event_url: string | null
  featured: boolean
}

export type SiteContent = {
  id: string
  key: string
  title: string | null
  body: Record<string, unknown>
}

export type ContactPayload = {
  name: string
  email: string
  subject: string
  message: string
  company?: string
}

export type Founder = {
  name: string
  role: string
  bio: string
}
