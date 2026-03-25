'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { adSlotImageUrl } from '@/lib/ad-slot-image';
import { QuoteRequestDialog } from '../../components/quote-request-dialog';
import { IconCheckCircle, IconShieldCheck } from '../../components/marketplace-icons';
import { trackMarketplaceEvent } from '@/lib/conversion-events';
import { formatSlotTypeLabel, slotValueBullets } from '@/lib/marketplace-ux';
import { getAdSlot } from '@/lib/api';
import { authClient } from '@/auth-client';
import { logger } from '@/lib/utils';
import type { AdSlot } from '@/lib/types';
import {
  adSlotDetailSidebarStatusTv,
  adSlotDetailTv,
  marketplaceTypeBadgeTv,
  quoteRequestSidebarTv,
} from '../../marketplace.styles';

interface User {
  id: string;
  name: string;
  email: string;
}

interface RoleInfo {
  role: 'sponsor' | 'publisher' | null;
  sponsorId?: string;
  publisherId?: string;
  name?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4291';

interface Props {
  id: string;
}

export function AdSlotDetail({ id }: Readonly<Props>) {
  const d = adSlotDetailTv();
  const qs = quoteRequestSidebarTv();
  const [adSlot, setAdSlot] = useState<AdSlot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [roleInfo, setRoleInfo] = useState<RoleInfo | null>(null);
  const [roleLoading, setRoleLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [booking, setBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  useEffect(() => {
    getAdSlot(id)
      .then((slot) => {
        setAdSlot(slot);
        trackMarketplaceEvent({ name: 'listing_detail_view', slotId: slot.id });
      })
      .catch(() => setError('Failed to load ad slot details'))
      .finally(() => setLoading(false));

    authClient
      .getSession()
      .then(({ data }) => {
        if (data?.user) {
          const sessionUser = data.user as User;
          setUser(sessionUser);

          fetch(`${API_URL}/api/auth/role/${sessionUser.id}`)
            .then((res) => res.json())
            .then((data) => setRoleInfo(data))
            .catch(() => setRoleInfo(null))
            .finally(() => setRoleLoading(false));
        } else {
          setRoleLoading(false);
        }
      })
      .catch(() => setRoleLoading(false));
  }, [id]);

  const isListingPublisher =
    roleInfo?.role === 'publisher' &&
    !!roleInfo.publisherId &&
    adSlot?.publisher?.id === roleInfo.publisherId;

  const handleBooking = async () => {
    if (!roleInfo?.sponsorId || !adSlot) return;

    trackMarketplaceEvent({ name: 'booking_cta_click', slotId: adSlot.id });
    setBooking(true);
    setBookingError(null);

    try {
      const response = await fetch(`${API_URL}/api/ad-slots/${adSlot.id}/book`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: message || undefined,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to book placement');
      }

      setBookingSuccess(true);
      setAdSlot({ ...adSlot, isAvailable: false });
      trackMarketplaceEvent({ name: 'booking_submit_success', slotId: adSlot.id });
    } catch (err) {
      setBookingError(err instanceof Error ? err.message : 'Failed to book placement');
    } finally {
      setBooking(false);
    }
  };

  const handleUnbook = async () => {
    if (!adSlot || !isListingPublisher) return;

    try {
      const response = await fetch(`${API_URL}/api/ad-slots/${adSlot.id}/unbook`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to reset booking');
      }

      setBookingSuccess(false);
      setAdSlot({ ...adSlot, isAvailable: true });
      setMessage('');
    } catch (err) {
      logger.error('Failed to unbook:', err);
    }
  };

  if (loading) {
    return <div className={d.detailLoading()}>Loading...</div>;
  }

  if (error || !adSlot) {
    return (
      <div className={d.errorStack()}>
        <Link href="/marketplace" className={d.backLinkPlain()}>
          ← Back to Marketplace
        </Link>
        <div className={d.errorBanner()}>{error || 'Ad slot not found'}</div>
      </div>
    );
  }

  const bullets = slotValueBullets(adSlot.type);
  const canBookAsSponsor =
    adSlot.isAvailable && !bookingSuccess && roleInfo?.role === 'sponsor' && !!roleInfo?.sponsorId;

  return (
    <div className={d.root()}>
      <Link href="/marketplace" className={d.backLink()}>
        ← Back to Marketplace
      </Link>

      <div className={d.layout()}>
        <div className={d.main()}>
          <div className={d.hero()}>
            <Image
              src={adSlotImageUrl(adSlot.id, 1200, 600)}
              alt=""
              fill
              className={d.heroImage()}
              sizes="(max-width: 1024px) 100vw, 66vw"
              priority
            />
            <div className={d.heroGradient()} />
            <div className={d.heroOverlay()}>
              <span className={marketplaceTypeBadgeTv({ type: adSlot.type, placement: 'hero' })}>
                {formatSlotTypeLabel(adSlot.type)}
              </span>
              <h1 className={d.heroTitle()}>{adSlot.name}</h1>
            </div>
          </div>

          {adSlot.publisher && (
            <div className={d.publisherCard()}>
              <div className={d.publisherIconWrap()}>
                <IconShieldCheck />
              </div>
              <div>
                <p className={d.publisherLabel()}>Published by</p>
                <p className={d.publisherName()}>{adSlot.publisher.name}</p>
                {adSlot.publisher.website && (
                  <a
                    href={adSlot.publisher.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={d.publisherSiteLink()}
                  >
                    Visit publisher site
                  </a>
                )}
                <p className={d.publisherBlurb()}>
                  You&apos;re booking directly with this publisher. They&apos;ll confirm timing,
                  creative requirements, and next steps after you reserve.
                </p>
              </div>
            </div>
          )}

          {adSlot.description && (
            <div>
              <h2 className={d.sectionTitle()}>About this placement</h2>
              <p className={d.sectionBody()}>{adSlot.description}</p>
            </div>
          )}

          <div>
            <h2 className={d.sectionTitle()}>What you get</h2>
            <ul className={d.bulletList()}>
              {bullets.map((line) => (
                <li key={line} className={d.bulletItem()}>
                  <IconCheckCircle />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className={d.aside()}>
          <div className={d.sidebarPanel()}>
            <div className={d.sidebarHeaderRow()}>
              <div>
                <p className={d.investmentLabel()}>Investment</p>
                <p className={d.investmentPrice()}>
                  ${Number(adSlot.basePrice).toLocaleString()}
                  <span className={d.investmentSuffix()}>/mo</span>
                </p>
              </div>
            </div>

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

            {!adSlot.isAvailable && !bookingSuccess && isListingPublisher && (
              <button type="button" onClick={handleUnbook} className={d.unbookButton()}>
                Reset listing (publisher)
              </button>
            )}

            {adSlot.isAvailable && !bookingSuccess && (
              <>
                {roleLoading ? (
                  <div className={d.accountLoading()}>Loading account…</div>
                ) : canBookAsSponsor ? (
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
                    {bookingError && <p className={d.bookingError()}>{bookingError}</p>}
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
                )}
              </>
            )}

            {bookingSuccess && (
              <div className={d.successBox()}>
                <h3 className={d.successTitle()}>You&apos;re on the list</h3>
                <p className={d.successBody()}>
                  Your reservation is in. The publisher will follow up with next steps.
                </p>
                <p className={d.successNote()}>
                  Only this publisher can mark the slot available again from their dashboard.
                </p>
              </div>
            )}

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
      </div>
    </div>
  );
}
