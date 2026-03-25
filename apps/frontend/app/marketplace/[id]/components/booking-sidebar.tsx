'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { QuoteRequestDialog } from '../../components/quote-request-dialog';
import { trackMarketplaceEvent } from '@/lib/conversion-events';
import { logger } from '@/lib/utils';
import type { AdSlot } from '@/lib/types';
import type { RoleData } from '@/lib/auth-helpers';
import {
  adSlotDetailSidebarStatusTv,
  adSlotDetailTv,
  quoteRequestSidebarTv,
} from '../../marketplace.styles';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4291';

interface SessionUser {
  id: string;
  name?: string;
  email?: string;
}

interface Props {
  adSlot: AdSlot;
  user: SessionUser | null;
  roleInfo: RoleData | null;
}

export function BookingSidebar({ adSlot: initialAdSlot, user, roleInfo }: Readonly<Props>) {
  const d = adSlotDetailTv();
  const qs = quoteRequestSidebarTv();

  const [adSlot, setAdSlot] = useState(initialAdSlot);
  const [message, setMessage] = useState('');
  const [booking, setBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  useEffect(() => {
    trackMarketplaceEvent({ name: 'listing_detail_view', slotId: adSlot.id });
  }, [adSlot.id]);

  const isListingPublisher =
    roleInfo?.role === 'publisher' &&
    !!roleInfo.publisherId &&
    adSlot.publisher?.id === roleInfo.publisherId;

  const canBookAsSponsor =
    adSlot.isAvailable && !bookingSuccess && roleInfo?.role === 'sponsor' && !!roleInfo?.sponsorId;

  const handleBooking = useCallback(async () => {
    if (!roleInfo?.sponsorId) return;

    trackMarketplaceEvent({ name: 'booking_cta_click', slotId: adSlot.id });
    setBooking(true);
    setBookingError(null);

    try {
      const response = await fetch(`${API_URL}/api/ad-slots/${adSlot.id}/book`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message || undefined }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to book placement');
      }

      setBookingSuccess(true);
      setAdSlot((prev) => ({ ...prev, isAvailable: false }));
      trackMarketplaceEvent({ name: 'booking_submit_success', slotId: adSlot.id });
    } catch (err) {
      setBookingError(err instanceof Error ? err.message : 'Failed to book placement');
    } finally {
      setBooking(false);
    }
  }, [adSlot, message, roleInfo?.sponsorId]);

  const handleUnbook = useCallback(async () => {
    if (!isListingPublisher) return;

    try {
      const response = await fetch(`${API_URL}/api/ad-slots/${adSlot.id}/unbook`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Failed to reset booking');

      setBookingSuccess(false);
      setAdSlot((prev) => ({ ...prev, isAvailable: true }));
      setMessage('');
    } catch (err) {
      logger.error('Failed to unbook:', err);
    }
  }, [adSlot, isListingPublisher]);

  return (
    <aside className={d.aside()}>
      <div className={d.sidebarPanel()}>
        {/* Price */}
        <div className={d.sidebarHeaderRow()}>
          <div>
            <p className={d.investmentLabel()}>Investment</p>
            <p className={d.investmentPrice()}>
              ${Number(adSlot.basePrice).toLocaleString()}
              <span className={d.investmentSuffix()}>/mo</span>
            </p>
          </div>
        </div>

        {/* Status */}
        <div className={d.statusBox()}>
          <p className={adSlotDetailSidebarStatusTv({ available: adSlot.isAvailable })}>
            {adSlot.isAvailable
              ? '● Available — reserve to lock in this slot'
              : '○ Currently booked'}
          </p>
          {adSlot.isAvailable && (
            <p className={d.statusHint()}>
              Popular placements can fill quickly. Reserving starts the conversation with the
              publisher — no payment is processed in this demo.
            </p>
          )}
        </div>

        {/* Publisher unbook */}
        {!adSlot.isAvailable && !bookingSuccess && isListingPublisher && (
          <button type="button" onClick={handleUnbook} className={d.unbookButton()}>
            Reset listing (publisher)
          </button>
        )}

        {/* Booking form / login gate */}
        {adSlot.isAvailable && !bookingSuccess && (
          canBookAsSponsor ? (
            <div className={d.bookingSection()}>
              <div>
                <p className={d.orgLabel()}>Your organization</p>
                <p className={d.orgName()}>{roleInfo.name || user?.name}</p>
              </div>
              <div>
                <label htmlFor="message" className={d.fieldLabel()}>
                  Note to publisher <span className={d.fieldHint()}>(optional)</span>
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Campaign goals, timing, or creative ideas…"
                  className={d.textarea()}
                  rows={3}
                />
              </div>
              {bookingError && <p className={d.bookingError()} role="alert">{bookingError}</p>}
              <button
                type="button"
                data-analytics="booking-cta"
                onClick={handleBooking}
                disabled={booking}
                className={d.primaryButton()}
              >
                {booking ? 'Reserving…' : 'Reserve this placement'}
              </button>
              <p className={d.sidebarHint()}>
                We&apos;ll notify the publisher instantly. You can coordinate details in your
                campaigns dashboard.
              </p>
            </div>
          ) : (
            <div className={d.gateSection()}>
              {user && roleInfo?.role === 'publisher' ? (
                <p className={d.gateTextMuted()}>
                  Publishers can&apos;t book placements. Switch to a sponsor account to buy
                  inventory, or browse other listings.
                </p>
              ) : (
                <>
                  <p className={d.gateText()}>
                    Sign in as a <strong>sponsor</strong> to reserve this placement and message
                    the publisher.
                  </p>
                  <Link
                    href={`/login?next=${encodeURIComponent(`/marketplace/${adSlot.id}`)}`}
                    className={d.primaryButton()}
                  >
                    Log in to continue
                  </Link>
                  <p className={d.sidebarHint()}>
                    New here? Use the demo sponsor account from the login page.
                  </p>
                </>
              )}
            </div>
          )
        )}

        {/* Success */}
        {bookingSuccess && (
          <output className={d.successBox()}>
            <h3 className={d.successTitle()}>You&apos;re on the list</h3>
            <p className={d.successBody()}>
              Your reservation is in. The publisher will follow up with next steps.
            </p>
            <p className={d.successNote()}>
              Only this publisher can mark the slot available again from their dashboard.
            </p>
          </output>
        )}

        {/* Quote CTA */}
        {!isListingPublisher && !bookingSuccess && (
          <div className={qs.section()}>
            <p className={qs.hint()}>Prefer to discuss pricing or a custom package first?</p>
            <QuoteRequestDialog
              adSlotId={adSlot.id}
              listingTitle={adSlot.name}
              fromPriceMonthly={Number(adSlot.basePrice)}
              isAvailable={adSlot.isAvailable}
              defaultEmail={user?.email}
              defaultCompanyName={roleInfo?.role === 'sponsor' ? roleInfo.name : undefined}
            />
          </div>
        )}
      </div>
    </aside>
  );
}
