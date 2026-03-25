'use client';

import { useCallback, useId, useRef, useState } from 'react';
import { requestQuote } from '@/lib/api';
import { trackMarketplaceEvent } from '@/lib/conversion-events';
import { quoteRequestDialogTv } from '../marketplace.styles';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const BUDGET_OPTIONS = [
  { value: '', label: 'Prefer not to say' },
  { value: 'Under $1,000/mo', label: 'Under $1,000/mo' },
  { value: '$1,000 – $5,000/mo', label: '$1,000 – $5,000/mo' },
  { value: '$5,000 – $25,000/mo', label: '$5,000 – $25,000/mo' },
  { value: '$25,000+/mo', label: '$25,000+/mo' },
  { value: 'Custom / to discuss', label: 'Custom / to discuss' },
] as const;

const TIMELINE_OPTIONS = [
  { value: '', label: 'Prefer not to say' },
  { value: 'ASAP', label: 'ASAP' },
  { value: 'Within 1–3 months', label: 'Within 1–3 months' },
  { value: 'Within 3–6 months', label: 'Within 3–6 months' },
  { value: '6+ months out', label: '6+ months out' },
  { value: 'Flexible', label: 'Flexible' },
] as const;

export function QuoteRequestDialog({
  adSlotId,
  listingTitle,
  fromPriceMonthly,
  isAvailable,
  defaultEmail,
  defaultCompanyName,
}: Readonly<{
  adSlotId: string;
  listingTitle: string;
  fromPriceMonthly: number;
  isAvailable: boolean;
  defaultEmail?: string;
  defaultCompanyName?: string;
}>) {
  const dlg = quoteRequestDialogTv();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descId = useId();

  const [success, setSuccess] = useState(false);
  const [quoteId, setQuoteId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [budgetRange, setBudgetRange] = useState('');
  const [timeline, setTimeline] = useState('');
  const [campaignDetails, setCampaignDetails] = useState('');
  const [specialRequirements, setSpecialRequirements] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{
    companyName?: string;
    email?: string;
    campaignDetails?: string;
  }>({});

  const resetFormState = useCallback(() => {
    setSuccess(false);
    setQuoteId(null);
    setApiError(null);
    setFieldErrors({});
    setCompanyName(defaultCompanyName ?? '');
    setEmail(defaultEmail ?? '');
    setPhone('');
    setBudgetRange('');
    setTimeline('');
    setCampaignDetails('');
    setSpecialRequirements('');
  }, [defaultCompanyName, defaultEmail]);

  const openModal = () => {
    resetFormState();
    trackMarketplaceEvent({ name: 'quote_modal_open', slotId: adSlotId });
    dialogRef.current?.showModal();
  };

  const closeModal = () => {
    dialogRef.current?.close();
  };

  const validate = (): boolean => {
    const next: typeof fieldErrors = {};
    const co = companyName.trim();
    if (co.length < 2) next.companyName = 'Company name must be at least 2 characters';
    const em = email.trim();
    if (!em) next.email = 'Email is required';
    else if (!EMAIL_RE.test(em)) next.email = 'Enter a valid email address';
    const cd = campaignDetails.trim();
    if (cd.length < 10) {
      next.campaignDetails = 'Please share a bit more about goals, audience, or timing (10+ characters)';
    }
    setFieldErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    if (!validate()) return;

    trackMarketplaceEvent({ name: 'quote_submit', slotId: adSlotId });
    setSubmitting(true);

    try {
      const res = await requestQuote({
        adSlotId,
        companyName: companyName.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        budgetRange: budgetRange || undefined,
        timeline: timeline || undefined,
        campaignDetails: campaignDetails.trim(),
        specialRequirements: specialRequirements.trim() || undefined,
      });
      setQuoteId(res.quoteId);
      setSuccess(true);
      trackMarketplaceEvent({
        name: 'quote_submit_success',
        slotId: adSlotId,
        quoteId: res.quoteId,
      });
    } catch (err) {
      setApiError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const priceLabel = `$${fromPriceMonthly.toLocaleString()}/mo`;

  return (
    <>
      <button type="button" onClick={openModal} className={dlg.trigger()}>
        Request a quote
      </button>

      <dialog
        ref={dialogRef}
        className={dlg.dialog()}
        aria-labelledby={titleId}
        aria-describedby={descId}
        onClose={resetFormState}
      >
        {success ? (
          <div className="px-5 py-6">
            <h2 id={titleId} className={dlg.successTitle()}>
              Request received
            </h2>
            <p id={descId} className={dlg.successBody()}>
              Thanks — the publisher will review your message and follow up by email. Typical
              response time is <strong>within 2 business days</strong>.
            </p>
            {quoteId && (
              <p className={dlg.quoteId()}>
                Reference: <span className="select-all">{quoteId}</span>
              </p>
            )}
            <ul className={dlg.nextSteps()}>
              <li className={dlg.nextStepItem()}>
                <span aria-hidden>•</span>
                <span>Save your reference ID if you contact support.</span>
              </li>
              <li className={dlg.nextStepItem()}>
                <span aria-hidden>•</span>
                <span>No payment is taken for quote requests in this demo.</span>
              </li>
              <li className={dlg.nextStepItem()}>
                <span aria-hidden>•</span>
                <span>You can still reserve instantly if the slot is open and you&apos;re signed in as a sponsor.</span>
              </li>
            </ul>
            <button type="button" className={dlg.closeSuccessButton()} onClick={closeModal}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div className={dlg.header()}>
              <h2 id={titleId} className={dlg.title()}>
                Request a quote
              </h2>
              <p id={descId} className={dlg.subtitle()}>
                {isAvailable
                  ? `Tell ${listingTitle}'s publisher about your needs. They'll reply with pricing options or a custom package.`
                  : "This placement is currently booked. Share what you're looking for — the publisher may suggest similar inventory or future availability."}
              </p>
              <div className={dlg.priceContext()} aria-label="Listed price">
                <p className={dlg.priceLabel()}>Listed from</p>
                <p className="text-base font-semibold text-(--color-foreground)">{priceLabel}</p>
                <p className="mt-1 text-xs text-(--color-muted)">
                  Final pricing may vary based on scope, duration, and bundle.
                </p>
              </div>
            </div>

            <form className={dlg.body()} onSubmit={(e) => void handleSubmit(e)}>
              {apiError && (
                <div className={dlg.apiError()} role="alert">
                  {apiError}
                </div>
              )}

              <div className={dlg.field()}>
                <label htmlFor="qr-company" className={dlg.label()}>
                  Company name <span className="text-red-500">*</span>
                </label>
                <input
                  id="qr-company"
                  name="companyName"
                  autoComplete="organization"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className={dlg.input()}
                />
                {fieldErrors.companyName && (
                  <p className={dlg.fieldError()}>{fieldErrors.companyName}</p>
                )}
              </div>

              <div className={dlg.field()}>
                <label htmlFor="qr-email" className={dlg.label()}>
                  Work email <span className="text-red-500">*</span>
                </label>
                <input
                  id="qr-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={dlg.input()}
                />
                {fieldErrors.email && <p className={dlg.fieldError()}>{fieldErrors.email}</p>}
              </div>

              <div className={dlg.field()}>
                <label htmlFor="qr-phone" className={dlg.label()}>
                  Phone <span className={dlg.optional()}>(optional)</span>
                </label>
                <input
                  id="qr-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={dlg.input()}
                />
              </div>

              <div className={dlg.field()}>
                <label htmlFor="qr-budget" className={dlg.label()}>
                  Budget range <span className={dlg.optional()}>(optional)</span>
                </label>
                <select
                  id="qr-budget"
                  name="budgetRange"
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  className={dlg.select()}
                >
                  {BUDGET_OPTIONS.map((o) => (
                    <option key={o.label} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className={dlg.field()}>
                <label htmlFor="qr-timeline" className={dlg.label()}>
                  Timeline <span className={dlg.optional()}>(optional)</span>
                </label>
                <select
                  id="qr-timeline"
                  name="timeline"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className={dlg.select()}
                >
                  {TIMELINE_OPTIONS.map((o) => (
                    <option key={o.label} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className={dlg.field()}>
                <label htmlFor="qr-campaign" className={dlg.label()}>
                  Campaign goals & details <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="qr-campaign"
                  name="campaignDetails"
                  rows={4}
                  value={campaignDetails}
                  onChange={(e) => setCampaignDetails(e.target.value)}
                  placeholder="Audience, channels, KPIs, run dates, creative needs…"
                  className={dlg.textarea()}
                />
                {fieldErrors.campaignDetails && (
                  <p className={dlg.fieldError()}>{fieldErrors.campaignDetails}</p>
                )}
              </div>

              <div className={dlg.field()}>
                <label htmlFor="qr-special" className={dlg.label()}>
                  Special requirements <span className={dlg.optional()}>(optional)</span>
                </label>
                <textarea
                  id="qr-special"
                  name="specialRequirements"
                  rows={3}
                  value={specialRequirements}
                  onChange={(e) => setSpecialRequirements(e.target.value)}
                  placeholder="Exclusivity, reporting, integrations, compliance…"
                  className={dlg.textarea()}
                />
              </div>

              <div className={dlg.footer()}>
                <button type="button" className={dlg.cancelButton()} onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className={dlg.submitButton()}>
                  {submitting ? 'Sending…' : 'Send request'}
                </button>
              </div>
            </form>
          </>
        )}
      </dialog>
    </>
  );
}
