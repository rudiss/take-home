import { describe, it, expect } from 'vitest';
import { adSlotImageUrl } from './ad-slot-image';

describe('adSlotImageUrl', () => {
  it('generates a picsum URL with the correct dimensions', () => {
    const url = adSlotImageUrl('abc', 640, 400);
    expect(url).toBe('https://picsum.photos/seed/abc/640/400');
  });

  it('encodes special characters in the ID', () => {
    const url = adSlotImageUrl('slot with spaces', 100, 100);
    expect(url).toBe('https://picsum.photos/seed/slot%20with%20spaces/100/100');
  });

  it('returns deterministic URLs for the same ID', () => {
    const url1 = adSlotImageUrl('test-id', 640, 400);
    const url2 = adSlotImageUrl('test-id', 640, 400);
    expect(url1).toBe(url2);
  });
});
