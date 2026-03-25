import { describe, it, expect } from 'vitest';
import { slotValueBullets, formatSlotTypeLabel } from './marketplace-ux';

describe('formatSlotTypeLabel', () => {
  it.each([
    ['DISPLAY', 'Display'],
    ['VIDEO', 'Video'],
    ['NATIVE', 'Native content'],
    ['NEWSLETTER', 'Newsletter'],
    ['PODCAST', 'Podcast'],
  ] as const)('formats %s as %s', (type, expected) => {
    expect(formatSlotTypeLabel(type)).toBe(expected);
  });
});

describe('slotValueBullets', () => {
  it.each(['DISPLAY', 'VIDEO', 'NATIVE', 'NEWSLETTER', 'PODCAST'] as const)(
    'returns an array of bullets for %s',
    (type) => {
      const bullets = slotValueBullets(type);
      expect(Array.isArray(bullets)).toBe(true);
      expect(bullets.length).toBeGreaterThan(0);
      bullets.forEach((b) => expect(typeof b).toBe('string'));
    },
  );

  it('returns different bullets for different types', () => {
    const display = slotValueBullets('DISPLAY');
    const video = slotValueBullets('VIDEO');
    expect(display).not.toEqual(video);
  });
});
