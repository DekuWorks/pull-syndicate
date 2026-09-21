# Deployment

**Do not use Vercel.** Frontend deploys from GitHub Actions to GitHub Pages. Backend is Supabase.

## Environments

| Name | URL | Notes |
| --- | --- | --- |
| Local | `http://localhost:5173` | Vite |
| Production | `https://pullsyn.co` | GitHub Pages + custom domain |

## Frontend

- Vite `base: '/'` because the custom domain is the apex, not `username.github.io/pull-syndicate/`.
- After `vite build`, copy `dist/index.html` to `dist/404.html` so deep links hit the SPA ([GitHub Pages SPA fallback](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)).
- Workflow: `.github/workflows/ci.yml` on pull request; `.github/workflows/deploy-pages.yml` on `main`.
- Pages source: GitHub Actions, not the `gh-pages` branch.

### Private repository caveat

GitHub Pages from a private repo requires GitHub Pro (or equivalent). Free accounts can only publish Pages from public repos ([Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)).

The **website is public**. The **source stays private**.

### Fallback (if Pages is blocked)

Keep the private GitHub repo. Point Cloudflare Pages at the same repo and build command `npm run build` / output `dist`. Still not Vercel. Document the switch here if it happens.

## Custom domain

1. Repo Settings → Pages → Custom domain: `pullsyn.co`
2. DNS at the registrar:

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` |
| AAAA | `@` | `2606:50d8:e000::` GitHub IPv6 records from current docs |
| CNAME | `www` | `dekuworks.github.io` or the Pages hostname GitHub shows |

3. Enable “Enforce HTTPS” after the certificate provisions.
4. Commit `public/CNAME` containing `pullsyn.co`.

Exact A/AAAA values: [Managing a custom domain for your GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## GitHub Secrets

PR CI needs no secrets. Deploy needs:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Server-only secrets belong in Supabase Edge Function secrets, never in Vite:

- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY` (Phase 2)
- `STRIPE_WEBHOOK_SECRET` (Phase 2)
- Email provider keys

## Supabase

1. Create a project.
2. `supabase db push` or apply `supabase/migrations/` in the dashboard.
3. Run `supabase/seed.sql` in non-production first.
4. Deploy `submit-contact`.
5. Confirm Auth site URL `https://pullsyn.co` when Phase 4 starts.

## SSR migration (later, if needed)

If the SPA cannot meet SEO or checkout needs, evaluate Cloudflare Workers / Pages Functions or a small Node host. Do not couple the app to Vercel to get SSR.

## References

GitHub. (n.d.). *Configuring a custom domain for your GitHub Pages site*. https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
