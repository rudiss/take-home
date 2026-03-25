'use client';

import { useRef, useState } from 'react';
import { newsletterTv } from './newsletter.styles';

type Status = 'idle' | 'loading' | 'success' | 'error';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4291';

export function NewsletterForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const s = newsletterTv();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = new FormData(form).get('email') as string;

    if (!email?.trim()) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch(`${API_URL}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!res.ok) {
        let message = 'Something went wrong';
        try {
          const data = await res.json();
          if (data.error) message = data.error;
        } catch { /* ignore JSON parse failure — use default message */ }
        setStatus('error');
        setErrorMessage(message);
        return;
      }

      setStatus('success');
      formRef.current?.reset();
    } catch {
      setStatus('error');
      setErrorMessage('Unable to connect. Please try again later.');
    }
  }

  return (
    <div className={s.root()}>
      <h3 className={s.title()}>Stay in the loop</h3>
      <p className={s.description()}>
        Get marketplace updates, new listings, and sponsorship tips straight to your inbox.
      </p>

      {status === 'success' ? (
        <output className={s.success()}>Thanks for subscribing!</output>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} className={s.form()}>
          <input
            type="email"
            name="email"
            placeholder="you@company.com"
            required
            aria-label="Email address"
            className={s.input()}
            disabled={status === 'loading'}
          />
          <button type="submit" className={s.button()} disabled={status === 'loading'}>
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      )}

      {status === 'error' && <p className={s.error()} role="alert">{errorMessage}</p>}

      <p className={s.hint()}>No spam, unsubscribe anytime.</p>
    </div>
  );
}
