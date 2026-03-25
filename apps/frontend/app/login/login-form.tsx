'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useId, useState } from 'react';
import { authClient } from '@/auth-client';
import {
  alert,
  card,
  heading,
  logo,
  page,
  roleIcon,
  roleOption,
  submitButton,
  subtitle,
} from './login-form.styles';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4291';

type Role = 'sponsor' | 'publisher';

const roles: { value: Role; label: string; email: string; description: string }[] = [
  {
    value: 'sponsor',
    label: 'Sponsor',
    email: 'sponsor@example.com',
    description: 'Browse ad slots and manage campaigns',
  },
  {
    value: 'publisher',
    label: 'Publisher',
    email: 'publisher@example.com',
    description: 'List ad slots and manage inventory',
  },
];

function safeInternalPath(raw: string | null): string | null {
  if (!raw || !raw.startsWith('/') || raw.startsWith('//')) return null;
  return raw;
}

function IconMegaphone(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38a.75.75 0 0 1-1.021-.27l-.112-.194a9.015 9.015 0 0 1-.738-2.21m1.006-2v-5.18m0 5.18a26.1 26.1 0 0 0 5.693 1.124c.592.065 1.134-.38 1.134-.978V6.874c0-.597-.542-1.043-1.134-.978A26.1 26.1 0 0 0 10.34 7.02M18.75 12a2.25 2.25 0 0 0 2.25-2.25v-.75a2.25 2.25 0 0 0-2.25-2.25"
      />
    </svg>
  );
}

function IconNewspaper(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5"
      />
    </svg>
  );
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = safeInternalPath(searchParams.get('next'));
  const [role, setRole] = useState<Role>('sponsor');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const groupId = useId();

  const selected = roles.find((r) => r.value === role)!;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: signInError } = await authClient.signIn.email(
      { email: selected.email, password: 'password' },
      {
        onRequest: () => setLoading(true),
        onSuccess: async (ctx) => {
          if (returnTo) {
            router.push(returnTo);
            return;
          }
          try {
            const userId = ctx.data?.user?.id;
            if (userId) {
              const roleRes = await fetch(`${API_URL}/api/auth/role/${userId}`);
              const roleData = await roleRes.json();
              if (roleData.role === 'sponsor') router.push('/dashboard/sponsor');
              else if (roleData.role === 'publisher') router.push('/dashboard/publisher');
              else router.push('/');
            } else {
              router.push('/');
            }
          } catch {
            router.push('/');
          }
        },
        onError: (ctx) => {
          setError(ctx.error.message || 'Login failed. Please try again.');
          setLoading(false);
        },
      },
    );

    if (signInError) {
      setError(signInError.message || 'Login failed. Please try again.');
      setLoading(false);
    }
  };

  const roleIcons = { sponsor: IconMegaphone, publisher: IconNewspaper } as const;

  return (
    <div className={page()}>
      <div className={card()}>
        {/* Brand */}
        <div className={logo()} aria-hidden="true">
          A
        </div>
        <h1 className={heading()}>Welcome back</h1>
        <p className={subtitle()}>Sign in to your Anvara account</p>

        {/* Return-to hint */}
        {returnTo ? (
          <div className={alert({ intent: 'info', class: 'mt-5' })} role="status">
            <p>You&apos;ll return to where you left off after signing in.</p>
          </div>
        ) : null}

        {/* Error */}
        {error ? (
          <div className={alert({ intent: 'error', class: 'mt-5' })} role="alert">
            <p>{error}</p>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Role picker */}
          <fieldset>
            <legend className="mb-2 text-sm font-medium text-[--color-foreground]">
              Choose account
            </legend>
            <div className="grid gap-2" role="radiogroup" aria-labelledby={groupId}>
              {roles.map((r) => {
                const Icon = roleIcons[r.value];
                const isSelected = role === r.value;
                return (
                  <label key={r.value} className={roleOption({ selected: isSelected })}>
                    <input
                      type="radio"
                      name="role"
                      value={r.value}
                      checked={isSelected}
                      onChange={() => setRole(r.value)}
                      className="sr-only"
                    />
                    <div className={roleIcon({ role: r.value })}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[--color-foreground]">{r.label}</p>
                      <p className="text-xs text-[--color-muted]">{r.description}</p>
                    </div>
                    {isSelected ? (
                      <svg
                        className="ml-auto h-5 w-5 shrink-0 text-[--color-primary]"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : null}
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* Credentials hint */}
          <p className="text-center text-xs text-[--color-muted]">
            Demo account: <span className="font-medium">{selected.email}</span>
          </p>

          {/* Submit */}
          <button type="submit" disabled={loading} className={submitButton()}>
            {loading ? (
              <>
                <Spinner />
                Signing in&hellip;
              </>
            ) : (
              <>
                Continue as {selected.label}
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
