import { describe, it, expect, vi } from 'vitest';
import { trackMarketplaceEvent } from './conversion-events';

describe('trackMarketplaceEvent', () => {
  it('dispatches a CustomEvent on window', () => {
    const listener = vi.fn();
    window.addEventListener('marketplace-analytics', listener);

    trackMarketplaceEvent({ name: 'marketplace_view' });

    expect(listener).toHaveBeenCalledTimes(1);
    const event = listener.mock.calls[0][0] as CustomEvent;
    expect(event.detail.name).toBe('marketplace_view');
    expect(typeof event.detail.ts).toBe('number');

    window.removeEventListener('marketplace-analytics', listener);
  });

  it('includes slot-specific data in event detail', () => {
    const listener = vi.fn();
    window.addEventListener('marketplace-analytics', listener);

    trackMarketplaceEvent({ name: 'listing_card_click', slotId: 'slot-123' });

    const event = listener.mock.calls[0][0] as CustomEvent;
    expect(event.detail.slotId).toBe('slot-123');

    window.removeEventListener('marketplace-analytics', listener);
  });
});
