import { describe, expect, it } from 'vitest'
import { canonical, organisationJsonLd, siteUrl } from '@/lib/seo'

describe('canonical', () => {
  it('joins the site origin to a path', () => {
    expect(canonical('/about')).toBe(`${siteUrl}/about`)
  })

  it('keeps the homepage slash', () => {
    expect(canonical('/')).toBe(`${siteUrl}/`)
  })
})

describe('organisationJsonLd', () => {
  it('describes Pull Syndicate', () => {
    const data = organisationJsonLd()
    expect(data.name).toBe('Pull Syndicate')
    expect(data.slogan).toBe('Collect • Build • Belong')
  })
})
