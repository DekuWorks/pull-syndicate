# Security

Codex must review this list after backend work. Admin authorisation is always validated on the server.

## Secrets

Never commit `.env`, Stripe secret keys, or the Supabase service-role key. Client may hold the anon key only. Document variables in `.env.example`.

## RLS

Every table with user or private data has RLS enabled. Public tables expose published rows only. Contact and newsletter writes go through Edge Functions, not wide-open anon inserts.

## Auth and admin (Phase 3–4)

- Roles live in `profiles.role` (or a `user_roles` table later).
- Edge Functions and RPC check role with the service role after verifying the user JWT.
- Hide `/admin` in the UI, but never rely on the UI.

## Stripe (Phase 2)

- Server calculates prices from the database.
- Webhooks verify `STRIPE_WEBHOOK_SECRET`.
- Never trust cart totals from the browser.

## Contact spam

Honeypot field, length limits, and IP rate limiting on `submit-contact`.

## Uploads (later)

Storage policies: admins upload product/brand/event assets. Validate MIME type and size. Avatars: authenticated user, own prefix only.

## Web

- Escape user content (React default).
- No `dangerouslySetInnerHTML` for CMS HTML unless sanitised.
- GitHub Pages is static — CSRF is limited; Edge Functions still require origin checks where relevant.
- Parameterised SQL only (Supabase client / Postgres).
- Rate-limit public functions.

## Review targets

RLS, auth, admin authorisation, API validation, Stripe webhook verification, storage policies, environment variables, XSS, CSRF, SQL injection, rate limiting, file uploads, contact spam, privilege escalation.

## References

OWASP Foundation. (n.d.). *OWASP Top 10*. https://owasp.org/www-project-top-ten/

Supabase. (n.d.). *Row Level Security*. https://supabase.com/docs/guides/database/postgres/row-level-security
