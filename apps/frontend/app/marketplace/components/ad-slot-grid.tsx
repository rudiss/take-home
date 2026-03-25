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
import {
  marketplaceCardAvailabilityTv,
  marketplaceListingCardTv,
  marketplaceListingGridTv,
  marketplaceStateMessageTv,
  marketplaceTypeBadgeTv,
} from '../marketplace.styles';

export function AdSlotGrid() {
  const [adSlots, setAdSlots] = useState<AdSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const card = marketplaceListingCardTv();

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
    return <div className={marketplaceStateMessageTv({ kind: 'loading' })}>Loading marketplace...</div>;
  }

  if (error) {
    return <div className={marketplaceStateMessageTv({ kind: 'error' })}>{error}</div>;
  }

  if (sorted.length === 0) {
    return (
      <div className={marketplaceStateMessageTv({ kind: 'empty' })}>
        No ad slots available at the moment.
      </div>
    );
  }

  return (
    <div className={marketplaceListingGridTv()}>
      {sorted.map((slot) => (
        <Link
          key={slot.id}
          href={`/marketplace/${slot.id}`}
          data-analytics="listing-card"
          data-slot-id={slot.id}
          onClick={() => trackMarketplaceEvent({ name: 'listing_card_click', slotId: slot.id })}
          className={card.link()}
        >
          <div className={card.imageWrap()}>
            <Image
              src={adSlotImageUrl(slot.id, 640, 400)}
              alt=""
              fill
              className={card.image()}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <span className={marketplaceCardAvailabilityTv({ available: slot.isAvailable })}>
              {slot.isAvailable ? 'Open for booking' : 'Booked'}
            </span>
            <span className={marketplaceTypeBadgeTv({ type: slot.type, placement: 'grid' })}>
              {formatSlotTypeLabel(slot.type)}
            </span>
          </div>

          <div className={card.body()}>
            <h3 className={card.cardTitle()}>{slot.name}</h3>
            {slot.publisher && (
              <p className={card.publisher()}>Publisher: {slot.publisher.name}</p>
            )}
            {slot.description && (
              <p className={card.description()}>{slot.description}</p>
            )}

            <div className={card.footer()}>
              <div>
                <p className={card.fromLabel()}>From</p>
                <p className={card.price()}>
                  ${Number(slot.basePrice).toLocaleString()}
                  <span className={card.priceSuffix()}>/mo</span>
                </p>
              </div>
              <span className={card.cta()}>
                View details
                <IconChevronRight />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
