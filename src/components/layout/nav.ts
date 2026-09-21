export const primaryNav = [
  { to: '/shop', label: 'Shop' },
  { to: '/shop?category=pokemon', label: 'Pokémon' },
  { to: '/shop?category=lego', label: 'LEGO' },
  { to: '/shop?category=accessories', label: 'Accessories' },
  { to: '/community', label: 'Community' },
  { to: '/about', label: 'About' },
] as const

export const mobileNav = [
  ...primaryNav,
  { to: '/contact', label: 'Contact' },
  { to: '/events', label: 'Events' },
] as const
