'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { adSlotImageUrl } from '@/lib/ad-slot-image';
import { IconCheckCircle, IconShieldCheck } from '../../components/marketplace-icons';
import { trackMarketplaceEvent } from '@/lib/conversion-events';
import { formatSlotTypeLabel, slotValueBullets } from '@/lib/marketplace-ux';
import { getAdSlot } from '@/lib/api';
import { authClient } from '@/auth-client';
import { logger } from '@/lib/utils';
import type { AdSlot } from '@/lib/types';

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

const typeBadgeClass: Record<AdSlot['type'], string> = {
  DISPLAY: 'bg-sky-100 text-sky-800',
  VIDEO: 'bg-rose-100 text-rose-800',
  NATIVE: 'bg-emerald-100 text-emerald-800',
  NEWSLETTER: 'bg-violet-100 text-violet-800',
  PODCAST: 'bg-amber-100 text-amber-900',
};

interface Props {
  id: string;
}

export function AdSlotDetail({ id }: Readonly<Props>) {
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
    return <div className="py-12 text-center text-[--color-muted]">Loading...</div>;
  }

  if (error || !adSlot) {
    return (
      <div className="space-y-4">
        <Link href="/marketplace" className="text-[--color-primary] hover:underline">
          ← Back to Marketplace
        </Link>
        <div className="rounded border border-red-200 bg-red-50 p-4 text-red-600">
          {error || 'Ad slot not found'}
        </div>
      </div>
    );
  }

  const bullets = slotValueBullets(adSlot.type);
  const canBookAsSponsor =
    adSlot.isAvailable && !bookingSuccess && roleInfo?.role === 'sponsor' && !!roleInfo?.sponsorId;

  return (
    <div className="space-y-8">
      <Link
        href="/marketplace"
        className="inline-flex items-center text-sm font-medium text-[--color-primary] hover:underline"
      >
        ← Back to Marketplace
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1fr_min(100%,380px)] lg:items-start">
        <div className="min-w-0 space-y-6">
          <div className="relative aspect-[21/9] max-h-80 w-full overflow-hidden rounded-xl bg-[--color-surface] sm:aspect-[2/1]">
            <Image
              src={adSlotImageUrl(adSlot.id, 1200, 600)}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 66vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
              <span
                className={`inline-block rounded-md px-2.5 py-1 text-xs font-semibold ${typeBadgeClass[adSlot.type]}`}
              >
                {formatSlotTypeLabel(adSlot.type)}
              </span>
              <h1 className="mt-2 text-2xl font-bold text-white drop-shadow sm:text-3xl">
                {adSlot.name}
              </h1>
            </div>
          </div>

          {adSlot.publisher && (
            <div className="flex flex-wrap items-start gap-3 rounded-xl border border-[--color-border] bg-[--color-surface] p-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[--color-primary]/15 text-[--color-primary]">
                <IconShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[--color-muted]">
                  Published by
                </p>
                <p className="text-lg font-semibold text-[--color-foreground]">
                  {adSlot.publisher.name}
                </p>
                {adSlot.publisher.website && (
                  <a
                    href={adSlot.publisher.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 text-sm font-medium text-[--color-primary] hover:underline"
                  >
                    Visit publisher site
                  </a>
                )}
                <p className="mt-2 text-sm text-[--color-muted]">
                  You&apos;re booking directly with this publisher. They&apos;ll confirm timing,
                  creative requirements, and next steps after you reserve.
                </p>
              </div>
            </div>
          )}

          {adSlot.description && (
            <div>
              <h2 className="text-lg font-semibold text-[--color-foreground]">About this placement</h2>
              <p className="mt-2 text-[--color-muted]">{adSlot.description}</p>
            </div>
          )}

          <div>
            <h2 className="text-lg font-semibold text-[--color-foreground]">What you get</h2>
            <ul className="mt-3 space-y-2">
              {bullets.map((line) => (
                <li key={line} className="flex gap-2 text-sm text-[--color-muted]">
                  <IconCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[--color-primary]" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24">
          <div className="space-y-4 rounded-xl border-2 border-[--color-primary]/25 bg-[--color-background] p-6 shadow-[--shadow-card]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[--color-muted]">
                  Investment
                </p>
                <p className="text-3xl font-bold text-[--color-primary]">
                  ${Number(adSlot.basePrice).toLocaleString()}
                  <span className="text-lg font-semibold text-[--color-muted]">/mo</span>
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-[--color-surface] px-3 py-2">
              <p
                className={`text-sm font-semibold ${adSlot.isAvailable ? 'text-green-700' : 'text-[--color-muted]'}`}
              >
                {adSlot.isAvailable ? '● Available — reserve to lock in this slot' : '○ Currently booked'}
              </p>
              {adSlot.isAvailable && (
                <p className="mt-1 text-xs text-[--color-muted]">
                  Popular placements can fill quickly. Reserving starts the conversation with the
                  publisher — no payment is processed in this demo.
                </p>
              )}
            </div>

            {!adSlot.isAvailable && !bookingSuccess && isListingPublisher && (
              <button
                type="button"
                onClick={handleUnbook}
                className="w-full text-sm font-medium text-[--color-primary] underline hover:opacity-80"
              >
                Reset listing (publisher)
              </button>
            )}

            {adSlot.isAvailable && !bookingSuccess && (
              <>
                {roleLoading ? (
                  <div className="py-4 text-center text-sm text-[--color-muted]">Loading account…</div>
                ) : canBookAsSponsor ? (
                  <div className="space-y-4 border-t border-[--color-border] pt-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[--color-muted]">
                        Your organization
                      </p>
                      <p className="font-medium text-[--color-foreground]">
                        {roleInfo.name || user?.name}
                      </p>
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="mb-1 block text-sm font-medium text-[--color-foreground]"
                      >
                        Note to publisher <span className="font-normal text-[--color-muted]">(optional)</span>
                      </label>
                      <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Campaign goals, timing, or creative ideas…"
                        className="w-full rounded-lg border border-[--color-border] bg-[--color-background] px-3 py-2 text-[--color-foreground] placeholder:text-[--color-muted] focus:border-[--color-primary] focus:outline-none focus:ring-2 focus:ring-[--color-primary]/20"
                        rows={3}
                      />
                    </div>
                    {bookingError && <p className="text-sm text-red-600">{bookingError}</p>}
                    <button
                      type="button"
                      data-analytics="booking-cta"
                      onClick={handleBooking}
                      disabled={booking}
                      className="w-full rounded-xl bg-[--color-primary] px-4 py-3.5 text-base font-bold text-white shadow-md transition-colors hover:bg-[--color-primary-hover] disabled:opacity-50"
                    >
                      {booking ? 'Reserving…' : 'Reserve this placement'}
                    </button>
                    <p className="text-center text-xs text-[--color-muted]">
                      We&apos;ll notify the publisher instantly. You can coordinate details in your
                      campaigns dashboard.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 border-t border-[--color-border] pt-4">
                    {user && roleInfo?.role === 'publisher' ? (
                      <p className="text-sm text-[--color-muted]">
                        Publishers can&apos;t book placements. Switch to a sponsor account to buy
                        inventory, or browse other listings.
                      </p>
                    ) : (
                      <>
                        <p className="text-sm text-[--color-foreground]">
                          Sign in as a <strong>sponsor</strong> to reserve this placement and message
                          the publisher.
                        </p>
                        <Link
                          href={`/login?next=${encodeURIComponent(`/marketplace/${adSlot.id}`)}`}
                          className="flex w-full items-center justify-center rounded-xl bg-[--color-primary] px-4 py-3.5 text-base font-bold text-white shadow-md transition-colors hover:bg-[--color-primary-hover]"
                        >
                          Log in to continue
                        </Link>
                        <p className="text-center text-xs text-[--color-muted]">
                          New here? Use the demo sponsor account from the login page.
                        </p>
                      </>
                    )}
                  </div>
                )}
              </>
            )}

            {bookingSuccess && (
              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <h3 className="font-semibold text-green-800">You&apos;re on the list</h3>
                <p className="mt-1 text-sm text-green-800">
                  Your reservation is in. The publisher will follow up with next steps.
                </p>
                <p className="mt-3 text-xs text-green-800">
                  Only this publisher can mark the slot available again from their dashboard.
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
