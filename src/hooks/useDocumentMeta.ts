import { useEffect } from 'react'
import { canonical, defaultDescription, siteName } from '@/lib/seo'

type Meta = {
  title: string
  description?: string
  path: string
}

export function useDocumentMeta({ title, description = defaultDescription, path }: Meta) {
  useEffect(() => {
    document.title = `${title} · ${siteName}`

    const set = (selector: string, attr: string, value: string) => {
      const el = document.querySelector(selector)
      if (el) el.setAttribute(attr, value)
    }

    set('meta[name="description"]', 'content', description)
    set('link[rel="canonical"]', 'href', canonical(path))
    set('meta[property="og:title"]', 'content', `${title} · ${siteName}`)
    set('meta[property="og:description"]', 'content', description)
    set('meta[property="og:url"]', 'content', canonical(path))
    set('meta[name="twitter:title"]', 'content', `${title} · ${siteName}`)
    set('meta[name="twitter:description"]', 'content', description)
  }, [title, description, path])
}
