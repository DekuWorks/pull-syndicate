export type AnalyticsEvent =
  | 'page_view'
  | 'product_view'
  | 'search'
  | 'add_to_cart'
  | 'remove_from_cart'
  | 'begin_checkout'
  | 'purchase'
  | 'wishlist_add'
  | 'event_view'

export type AnalyticsProvider = {
  track: (event: AnalyticsEvent, props?: Record<string, string | number | boolean>) => void
}

const noop: AnalyticsProvider = {
  track: () => undefined,
}

let provider: AnalyticsProvider = noop

export function setAnalyticsProvider(next: AnalyticsProvider) {
  provider = next
}

export function track(
  event: AnalyticsEvent,
  props?: Record<string, string | number | boolean>,
) {
  provider.track(event, props)
}
