# Pull Syndicate

Premium collectibles brand site for [pullsyn.co](https://pullsyn.co).

**Collect • Build • Belong**

Private source. Public website. GitHub + GitHub Pages. Supabase backend. No Vercel.

## Stack

React 19, TypeScript, Vite, Tailwind CSS 4, React Router, TanStack Query, Framer Motion, Supabase.

## Scripts

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run test
npm run build
```

## Environment

Create a local `.env` (never commit it) with:

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_SITE_URL=https://pullsyn.co
```

Server-only secrets stay in Supabase Edge Function settings: `SUPABASE_SERVICE_ROLE_KEY`. Stripe keys are Phase 2.

The site still builds and renders without Supabase credentials. Events and contact submit degrade to empty/local success states.

## Domain

Point `pullsyn.co` at GitHub Pages after this branch merges to `main` and Pages is enabled (Actions source). Apex A records and `www` CNAME are listed in [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md). Private-repo Pages needs GitHub Pro.

## Docs

Start with [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).
