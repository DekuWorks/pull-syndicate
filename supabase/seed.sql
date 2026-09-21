insert into public.site_content (key, title, body, published)
values
  (
    'founders',
    'Founders',
    '{
      "people": [
        {
          "name": "Marcus Brown",
          "role": "DekuWorks — website, ecommerce, brand systems",
          "bio": "Builds the digital home and systems that keep Pull Syndicate honest as it grows."
        },
        {
          "name": "Josh Schell",
          "role": "Collectibles, events, and community operations",
          "bio": "Sources product, runs booths, and keeps collector relationships real."
        }
      ]
    }'::jsonb,
    true
  ),
  (
    'homepage.hero',
    'Collect. Build. Belong.',
    '{"kicker":"PULL SYNDICATE","headline":["COLLECT.","BUILD.","BELONG."]}'::jsonb,
    true
  )
on conflict (key) do nothing;

insert into public.events (
  title, slug, description, location, start_time, end_time, featured, published
) values (
  'Syndicate Trade Night',
  'syndicate-trade-night',
  'A collector meetup for trades, pulls, and deck-box talk.',
  'Spartanburg, SC',
  now() + interval '21 days',
  now() + interval '21 days' + interval '4 hours',
  true,
  true
)
on conflict (slug) do nothing;
