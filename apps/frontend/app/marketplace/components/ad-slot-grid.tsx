'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useReducer } from 'react';
import { adSlotImageUrl } from '@/lib/ad-slot-image';
import { IconChevronRight } from './marketplace-icons';
import { trackMarketplaceEvent } from '@/lib/conversion-events';
import { formatSlotTypeLabel } from '@/lib/marketplace-ux';
import { getMarketplaceAdSlots } from '@/lib/api';
import type { AdSlot } from '@/lib/types';
import {
  marketplaceCardAvailabilityTv,
  marketplaceListingCardTv,
  marketplaceListingGridTv,
  marketplacePaginationTv,
  marketplaceStateMessageTv,
  marketplaceTypeBadgeTv,
} from '../marketplace.styles';

const PAGE_SIZE = 6;

interface State {
  adSlots: AdSlot[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  total: number;
}

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; data: AdSlot[]; page: number; totalPages: number; total: number }
  | { type: 'FETCH_ERROR'; error: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        adSlots: action.data,
        page: action.page,
        totalPages: action.totalPages,
        total: action.total,
      };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.error };
  }
}

const initialState: State = {
  adSlots: [],
  loading: true,
  error: null,
  page: 1,
  totalPages: 1,
  total: 0,
};

export function AdSlotGrid() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { adSlots, loading, error, page, totalPages, total } = state;
  const card = marketplaceListingCardTv();
  const pag = marketplacePaginationTv();

  useEffect(() => {
    trackMarketplaceEvent({ name: 'marketplace_view' });
  }, []);

  useEffect(() => {
    let cancelled = false;
    dispatch({ type: 'FETCH_START' });
    getMarketplaceAdSlots(1, PAGE_SIZE)
      .then((res) => {
        if (!cancelled) {
          dispatch({
            type: 'FETCH_SUCCESS',
            data: res.data,
            page: res.pagination.page,
            totalPages: res.pagination.totalPages,
            total: res.pagination.total,
          });
        }
      })
      .catch(() => {
        if (!cancelled) dispatch({ type: 'FETCH_ERROR', error: 'Failed to load ad slots' });
      });
    return () => { cancelled = true; };
  }, []);

  function goToPage(p: number) {
    dispatch({ type: 'FETCH_START' });
    getMarketplaceAdSlots(p, PAGE_SIZE)
      .then((res) => {
        dispatch({
          type: 'FETCH_SUCCESS',
          data: res.data,
          page: res.pagination.page,
          totalPages: res.pagination.totalPages,
          total: res.pagination.total,
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .catch(() => dispatch({ type: 'FETCH_ERROR', error: 'Failed to load ad slots' }));
  }

  if (loading && adSlots.length === 0) {
    return <div className={marketplaceStateMessageTv({ kind: 'loading' })}>Loading marketplace...</div>;
  }

  if (error && adSlots.length === 0) {
    return <div className={marketplaceStateMessageTv({ kind: 'error' })}>{error}</div>;
  }

  if (!loading && adSlots.length === 0) {
    return (
      <div className={marketplaceStateMessageTv({ kind: 'empty' })}>
        No ad slots available at the moment.
      </div>
    );
  }

  const start = (page - 1) * PAGE_SIZE + 1;
  const end = Math.min(page * PAGE_SIZE, total);

  return (
    <>
      <div className={marketplaceListingGridTv({ class: loading ? 'opacity-60 pointer-events-none' : '' })}>
        {adSlots.map((slot) => (
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

      {totalPages > 1 && (
        <nav className={pag.root()} aria-label="Marketplace pagination">
          <p className={pag.info()}>
            Showing {start}–{end} of {total} listings
          </p>
          <div className={pag.buttons()}>
            <button
              onClick={() => goToPage(page - 1)}
              disabled={page <= 1 || loading}
              className={pag.button()}
              aria-label="Previous page"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => goToPage(p)}
                disabled={loading}
                className={pag.pageNumber({ active: p === page })}
                aria-label={`Page ${p}`}
                aria-current={p === page ? 'page' : undefined}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => goToPage(page + 1)}
              disabled={page >= totalPages || loading}
              className={pag.button()}
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        </nav>
      )}
    </>
  );
}
