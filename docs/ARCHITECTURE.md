# Architecture

Pull Syndicate is a premium collectibles brand and commerce platform. The public site lives at [https://pullsyn.co](https://pullsyn.co). This document describes the current Sprint 1 shape and the contracts later phases must honour.

**Do not rewrite working architecture for style.** Inspect existing code before changing it.

## System shape

```
Browser (Vite SPA)
  → GitHub Pages (pullsyn.co)
  → Supabase Postgres + RLS (public reads, private writes)
  → Supabase Edge Functions (contact, later Stripe/webhooks)
  → Email provider abstraction (transactional events)
```

| Layer | Choice | Why |
| --- | --- | --- |
| Frontend | React + TypeScript + Vite | Fast SPA, typed UI, no Vercel coupling |
| Styling | Tailwind CSS + design tokens | Brand tokens stay in one place |
| Routing | React Router | Client routes on GitHub Pages |
| Server state | TanStack Query | Cache public events/content |
| Client state | Zustand only if needed | Avoid global stores for server data |
| Motion | Framer Motion; GSAP for cinematic intro only | Intentional hierarchy, reduced-motion support |
| Backend | Supabase | Postgres, Auth, Storage, RLS, Edge Functions |
| Payments (later) | Stripe via Edge Functions | Secrets never reach the browser |
| Hosting | GitHub Pages + Actions | Source stays private; site is public |
| Forbidden | Vercel | Explicit product constraint |

**Pros:** one backend for data/auth/files; static frontend is cheap and portable; later commerce can sit on Edge Functions without moving host.

**Cons:** GitHub Pages cannot run server code; Stripe and webhooks stay on Supabase; private-repo Pages needs GitHub Pro.

## Repository layout

Feature-oriented. Sprint 1 implements brand pages. Commerce/auth folders exist as stubs so later phases do not reshape the tree.

```
src/
  app/                 # providers, router, SEO shell
  assets/
  components/
    ui/
    layout/
    motion/
    commerce/          # stub until Phase 2
  features/
    auth/              # stub until Phase 4
    products/          # stub until Phase 2
    collections/
    cart/
    checkout/
    orders/
    community/
    events/
    contact/
  hooks/
  lib/                 # supabase, analytics, email, seo
  pages/
  services/
  stores/
  styles/
  types/
  utils/
supabase/
  migrations/
  functions/
  seed.sql
public/
  branding/
  images/
  video/
  textures/
docs/
```

## Routing (Sprint 1)

| Path | Page | Data |
| --- | --- | --- |
| `/` | Home + optional cinematic intro | Static + optional `site_content` |
| `/about` | Brand story + founders | `site_content` |
| `/community` | Join CTA, socials, featured events | Static + `events` |
| `/events` | Event list | `events` |
| `/contact` | Enquiry form | Edge Function → `contact_submissions` |
| `/shop`, `/product/:slug` | Placeholder “coming soon” | None |
| `/login`, `/signup`, `/account`, `/admin` | Not shipped | Phase 3–4 |

Unknown routes render a branded 404.

## Motion hierarchy

1. Navigation and buttons
2. Cards and content reveals
3. Major cinematic moments (intro, hero)

Animations never block use. First-visit intro is 2–4 seconds, skippable, stored in `localStorage`, and skipped when `prefers-reduced-motion` is set.

## Analytics and email abstractions

`src/lib/analytics.ts` and `src/lib/email.ts` expose interfaces only. Sprint 1 can no-op or console-log in development. Do not couple the app to one vendor.

Tracked events (implement when a provider is wired): `page_view`, `product_view`, `search`, `add_to_cart`, `remove_from_cart`, `begin_checkout`, `purchase`, `wishlist_add`, `event_view`.

## Later-phase contracts

- **Phase 2 Commerce:** products, cart (guest local + auth sync), Stripe Checkout, server-authoritative prices, webhooks.
- **Phase 3 Admin:** `/admin` with server-side role checks. Never trust a client `isAdmin` flag.
- **Phase 4 Accounts:** Supabase Auth, profiles, orders, My Vault.
- **Phase 5:** advanced motion, personalisation, separate collectibles-app partnership. That app is a different brand.

## Codex review checklist

After each phase, review: architecture, TypeScript, React patterns, performance, accessibility, security, RLS, database, Stripe (when present), SEO, mobile, tests. Rank Critical / High / Medium / Low. Fix Critical and High only unless asked.

## References

GitHub. (n.d.). *Creating a GitHub Pages site*. https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

Supabase. (n.d.). *Row Level Security*. https://supabase.com/docs/guides/database/postgres/row-level-security
