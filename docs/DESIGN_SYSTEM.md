# Design system

Visual law is the approved Pull Syndicate brand board, not the older partnership-PDF colour line.

**Superseded:** “Cobalt / royal blue with controlled yellow-gold accents” from the 21 Sep 2026 partnership blueprint. **Current:** Onyx, Arctic White, Syndicate Gold, Neo Purple, Electric Cyan.

Do not generate trademarked Pokémon or LEGO artwork as permanent brand assets. Official product photos may appear later when legally sourced. Original PS marks, slabs, and deck-box forms are the brand.

## Tokens

Defined in `src/styles/tokens.css` and mapped into Tailwind `@theme`.

### Colour

| Token | Hex | Use |
| --- | --- | --- |
| `--color-onyx` | `#0B0B0D` | Surfaces, hero, chrome |
| `--color-arctic` | `#F5F5F5` | Body text on dark, light surfaces |
| `--color-gold` | `#D4AF37` | Primary premium accent |
| `--color-purple` | `#7C3AED` | Interactive / tech states |
| `--color-cyan` | `#00E5FF` | Effects, ambient light |
| `--color-gold-dim` | `#9A7B20` | Hover/pressed gold |

Gold is the primary accent. Purple and cyan support interaction, technology features, and lighting — they should not dominate the brand.

### Type

| Role | Family | Rule |
| --- | --- | --- |
| Display / headlines | Michroma (Orbitron fallback) | Short headlines only. Matches the official lockup wordmark. |
| Subheads | Montserrat Semibold | Section labels, portals |
| UI / body | Inter | All long copy, forms, nav |

Do not set body copy in Orbitron.

Load via `index.html` with `display=swap`. Preload only the display cut used above the fold if Lighthouse justifies it.

### Space, radius, shadow, glow

| Token | Value |
| --- | --- |
| Space scale | 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 px |
| Radius sm / md / lg / xl | 4 / 8 / 16 / 24 px |
| Shadow card | `0 12px 40px rgb(0 0 0 / 0.45)` |
| Glow gold | `0 0 32px rgb(212 175 55 / 0.35)` |
| Glow cyan | `0 0 28px rgb(0 229 255 / 0.25)` |

### Motion

| Token | Value |
| --- | --- |
| `--duration-fast` | 150ms |
| `--duration-base` | 280ms |
| `--duration-slow` | 600ms |
| `--ease-standard` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `--ease-cinematic` | `cubic-bezier(0.77, 0, 0.18, 1)` |

Respect `prefers-reduced-motion: reduce`: no intro, no parallax, no pointer-follow glow. Instant opacity/transform none.

### Breakpoints

| Name | Min |
| --- | --- |
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |
| 2xl | 1536px |

### Z-index

`base` 0, `raised` 10, `sticky` 20, `nav` 40, `drawer` 50, `modal` 60, `intro` 70, `toast` 80.

## Components

Sprint 1 motion primitives: `Reveal`, `Stagger`, `Parallax`, `GlowCard`, `MagneticButton`, `LogoReveal`, `SectionTransition`.

Level 1: nav/buttons. Level 2: cards. Level 3: intro/hero only.

## Voice

Premium collector culture. Direct. Not SaaS marketing copy. Tagline: Collect • Build • Belong.

## References

Pull Syndicate brand board (approved mockup, Sep 2026). Internal asset.
