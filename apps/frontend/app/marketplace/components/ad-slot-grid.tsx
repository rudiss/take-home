'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { adSlotImageUrl } from '@/lib/ad-slot-image';
import { IconChevronRight } from './marketplace-icons';
import { trackMarketplaceEvent } from '@/lib/conversion-events';
import { formatSlotTypeLabel } from '@/lib/marketplace-ux';
import { getAdSlots } from '@/lib/api';
import type { AdSlot } from '@/lib/types';

const typeBadgeClass: Record<AdSlot['type'], string> = {
  DISPLAY: 'bg-sky-100 text-sky-800',
  VIDEO: 'bg-rose-100 text-rose-800',
  NATIVE: 'bg-emerald-100 text-emerald-800',
  NEWSLETTER: 'bg-violet-100 text-violet-800',
  PODCAST: 'bg-amber-100 text-amber-900',
};

export function AdSlotGrid() {
  const [adSlots, setAdSlots] = useState<AdSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    trackMarketplaceEvent({ name: 'marketplace_view' });
  }, []);

  useEffect(() => {
    getAdSlots()
      .then(setAdSlots)
      .catch(() => setError('Failed to load ad slots'))
      .finally(() => setLoading(false));
  }, []);

  const sorted = useMemo(() => {
    return [...adSlots].sort((a, b) => {
      if (a.isAvailable === b.isAvailable) return 0;
      return a.isAvailable ? -1 : 1;
    });
  }, [adSlots]);

  if (loading) {
    return <div className="py-12 text-center text-[--color-muted]">Loading marketplace...</div>;
  }

  if (error) {
    return <div className="rounded border border-red-200 bg-red-50 p-4 text-red-600">{error}</div>;
  }

  if (sorted.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-[--color-border] p-12 text-center text-[--color-muted]">
        No ad slots available at the moment.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {sorted.map((slot) => (
        <Link
          key={slot.id}
          href={`/marketplace/${slot.id}`}
          data-analytics="listing-card"
          data-slot-id={slot.id}
          onClick={() => trackMarketplaceEvent({ name: 'listing_card_click', slotId: slot.id })}
          className="group flex flex-col overflow-hidden rounded-xl border border-[--color-border] bg-[--color-background] shadow-[--shadow-card] transition-shadow hover:shadow-[--shadow-card-hover]"
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-[--color-surface]">
            <Image
              src={adSlotImageUrl(slot.id, 640, 400)}
              alt=""
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {slot.isAvailable ? (
              <span className="absolute left-3 top-3 rounded-full bg-green-600 px-2.5 py-0.5 text-xs font-semibold text-white shadow-sm">
                Open for booking
              </span>
            ) : (
              <span className="absolute left-3 top-3 rounded-full bg-[--color-foreground]/80 px-2.5 py-0.5 text-xs font-semibold text-white shadow-sm">
                Booked
              </span>
            )}
            <span
              className={`absolute right-3 top-3 rounded-md px-2 py-0.5 text-xs font-medium ${typeBadgeClass[slot.type]}`}
            >
              {formatSlotTypeLabel(slot.type)}
            </span>
          </div>

          <div className="flex flex-1 flex-col p-4">
            <h3 className="text-lg font-bold leading-snug text-[--color-foreground] group-hover:text-[--color-primary]">
              {slot.name}
            </h3>
            {slot.publisher && (
              <p className="mt-1 text-sm text-[--color-muted]">Publisher: {slot.publisher.name}</p>
            )}
            {slot.description && (
              <p className="mt-2 line-clamp-2 flex-1 text-sm text-[--color-muted]">
                {slot.description}
              </p>
            )}

            <div className="mt-4 flex items-end justify-between gap-3 border-t border-[--color-border] pt-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[--color-muted]">
                  From
                </p>
                <p className="text-xl font-bold text-[--color-primary]">
                  ${Number(slot.basePrice).toLocaleString()}
                  <span className="text-sm font-semibold text-[--color-muted]">/mo</span>
                </p>
              </div>
              <span className="inline-flex items-center gap-0.5 text-sm font-semibold text-[--color-primary]">
                View details
                <IconChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
