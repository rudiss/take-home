export type MarketplaceAnalyticsEvent =
  | { name: 'marketplace_view' }
  | { name: 'listing_card_click'; slotId: string }
  | { name: 'listing_detail_view'; slotId: string }
  | { name: 'booking_cta_click'; slotId: string }
  | { name: 'booking_submit_success'; slotId: string };

/**
 * Fire-and-forget hook for product analytics. Replace body with Segment/GA4/PostHog.
 * Also dispatches `marketplace-analytics` on window for tag managers.
 */
export function trackMarketplaceEvent(event: MarketplaceAnalyticsEvent) {
  if (typeof window === 'undefined') return;

  const detail = { ...event, ts: Date.now() };
  window.dispatchEvent(new CustomEvent('marketplace-analytics', { detail }));

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console -- dev-only funnel debugging
    console.debug('[marketplace]', detail);
  }
}
