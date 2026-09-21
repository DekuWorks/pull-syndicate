# API

Sprint 1 has no public REST surface of its own. The browser talks to Supabase (anon key) and one Edge Function.

## Client access

| Client env | Purpose |
| --- | --- |
| `VITE_SUPABASE_URL` | Project URL |
| `VITE_SUPABASE_ANON_KEY` | RLS-scoped public key |

Never ship `SUPABASE_SERVICE_ROLE_KEY` or Stripe secrets to Vite.

## Public reads (anon + RLS)

- `events` where `published = true`
- `site_content` where `published = true`

Use TanStack Query. Empty states must work when the project is unconfigured (`VITE_SUPABASE_URL` missing).

## Edge Functions

### `submit-contact` (Sprint 1)

`POST /functions/v1/submit-contact`

Body: `{ name, email, subject, message, company? }`

- `company` is a honeypot. If filled, return 204 and drop.
- Validate lengths and email format.
- Rate-limit by IP.
- Insert with service role.
- Optionally send transactional mail through `src`/server email abstraction.

### Later functions (not implemented)

- `create-checkout-session` — server prices only
- `stripe-webhook` — verify signature
- `newsletter-subscribe`

## Email events (abstraction)

`account_verification`, `order_confirmation`, `shipping_confirmation`, `password_reset`, `contact_confirmation`. Sprint 1 implements the interface and contact confirmation hook only.

## Error shape

```json
{ "error": { "code": "validation_error", "message": "Enter a valid email." } }
```

Do not leak stack traces or table names to the client.
