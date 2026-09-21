const SITE_URL = import.meta.env.VITE_SITE_URL ?? 'https://pullsyn.co'

export const siteName = 'Pull Syndicate'
export const siteUrl = SITE_URL.replace(/\/$/, '')
export const defaultDescription =
  'Cards. LEGO. Collectibles. Community. Pull Syndicate is more than a store — it is a movement.'

export function canonical(path: string) {
  const normalised = path.startsWith('/') ? path : `/${path}`
  return `${siteUrl}${normalised === '/' ? '/' : normalised}`
}

export function organisationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    url: siteUrl,
    slogan: 'Collect • Build • Belong',
    logo: `${siteUrl}/branding/logo-lockup.jpg`,
  }
}
