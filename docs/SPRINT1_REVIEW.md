# Sprint 1 review (internal)

Reviewer pass after Claude implementation. Ranked findings.

## Critical

None.

## High

- Route bundle is ~475 KB gzip 151 KB, mostly Framer Motion in the chrome. Lazy routes caused a black empty flash, so pages stay eager. Acceptable for Sprint 1.
- Admin/auth not present, so no privilege-escalation surface yet. Keep it that way until Phase 3.
- GitHub Pages from a private repo needs Pro. If deploy fails, use the Cloudflare Pages fallback in `DEPLOYMENT.md`.

## Medium

- `submit-contact` allows any origin (`Access-Control-Allow-Origin: *`). Tighten to `https://pullsyn.co` once the domain is live.
- Search dialog has no full focus trap. Keyboard close (Escape) and initial focus exist.
- Events JSON-LD is rendered as a `<script>` inside the page component; prefer a Helmet-style injector later.

## Low

- Framer Motion still ships on the homepage. Acceptable for Sprint 1 cinematic work.
- Social profile URLs are placeholders until accounts are confirmed.

## Verification

`npm run lint`, `typecheck`, `test` (11), `build` — passed on 21 Sep 2026.
