# Database

Sprint 1 ships a small public-content schema. Later commerce tables are specified here so Phase 2 does not invent a Pokémon-only model.

Apply migrations with the Supabase CLI against a real project when credentials exist. Never commit service-role keys.

## Conventions

- UUID primary keys (`gen_random_uuid()`)
- `created_at` / `updated_at` on every table
- Foreign keys with `on delete` rules
- Indexes on slugs, status, foreign keys, and search columns
- RLS enabled on every table that holds user or private data
- Generic product taxonomy: category / subcategory / brand — not TCG-specific schema

## Sprint 1 tables

### `profiles`

Created for Auth later. Sprint 1 may have zero rows.

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid PK | Matches `auth.users.id` |
| display_name | text | |
| role | text | `member` \| `admin`. Default `member` |
| avatar_url | text | |
| created_at, updated_at | timestamptz | |

RLS: users read/update own row. Admins read all (Phase 3). Service role bypasses RLS for triggers.

### `events`

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid PK | |
| title | text | |
| slug | text unique | |
| description | text | |
| location | text | |
| start_time, end_time | timestamptz | |
| image | text | Storage path or public URL |
| event_url | text | |
| featured | boolean | |
| published | boolean | Public list only when true |
| created_at, updated_at | timestamptz | |

RLS: public select where `published = true`. Writes: admin only.

### `contact_submissions`

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid PK | |
| name, email, subject, message | text | |
| user_agent | text | Optional diagnostics |
| created_at | timestamptz | |

RLS: no direct anon insert. Edge Function uses service role after validation, honeypot, and rate limit. Admins can select.

### `site_content`

Editable homepage/about/founder copy.

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid PK | |
| key | text unique | e.g. `founders`, `homepage.hero` |
| title | text | |
| body | jsonb | Structured blocks |
| published | boolean | |
| created_at, updated_at | timestamptz | |

RLS: public select where published. Writes: admin only.

### `newsletter_subscribers`

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid PK | |
| email | text unique | |
| source | text | |
| created_at | timestamptz | |

RLS: insert via Edge Function only.

## Phase 2+ tables (do not invent Pokémon-only columns)

`categories`, `products`, `product_images`, `inventory`, `carts`, `cart_items`, `orders`, `order_items`, `payments`, `addresses`, `wishlists`, `wishlist_items`.

Product fields must support TCG, LEGO, deck boxes, accessories, and future categories: `id`, `slug`, `sku`, `name`, `description`, `short_description`, `category`, `subcategory`, `brand`, `price`, `compare_at_price`, `cost`, `quantity`, `status`, `condition`, `grading_company`, `grade`, `featured`, timestamps. Images live in `product_images`.

Order status: `pending`, `paid`, `processing`, `shipped`, `delivered`, `cancelled`, `refunded`.

## Storage buckets (later)

`product-images`, `brand-assets`, `event-images`, `avatars`. Only admins upload product/brand/event assets. Users may upload their own avatar.

## Search (Phase 2)

Postgres full-text / `ilike` across product name, SKU, category, brand, description.

## References

Supabase. (n.d.). *Managing indexes*. https://supabase.com/docs/guides/database/postgres/indexes
