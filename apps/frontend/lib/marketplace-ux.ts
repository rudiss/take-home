import type { AdSlot } from '@/lib/types';

const TYPE_LABEL: Record<AdSlot['type'], string> = {
  DISPLAY: 'Display',
  VIDEO: 'Video',
  NATIVE: 'Native content',
  NEWSLETTER: 'Newsletter',
  PODCAST: 'Podcast',
};

/** Short bullets tailored by format — answers “what am I buying?” */
export function slotValueBullets(type: AdSlot['type']): string[] {
  switch (type) {
    case 'DISPLAY':
      return [
        'Premium placement alongside publisher content',
        'Ideal for awareness and retargeting campaigns',
        'Publisher coordinates creative specs and go-live',
      ];
    case 'VIDEO':
      return [
        'High-attention video placement with publisher audience',
        'Strong fit for storytelling and product demos',
        'Clear handoff on format, length, and hosting',
      ];
    case 'NATIVE':
      return [
        'Editorial-style placement that matches site voice',
        'Built for trust and engagement, not banner blindness',
        'Collaborative brief so the piece feels native',
      ];
    case 'NEWSLETTER':
      return [
        'Dedicated exposure to opted-in subscribers',
        'Great for launches, promos, and lead gen',
        'Publisher shares expected send volume and timing',
      ];
    case 'PODCAST':
      return [
        'Spoken endorsement or segment placement',
        'Reach listeners in a focused, lean-in context',
        'Script and talking points aligned with your brand',
      ];
  }
}

export function formatSlotTypeLabel(type: AdSlot['type']) {
  return TYPE_LABEL[type];
}
