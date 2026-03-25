'use client';

import { sponsorErrorTv } from './sponsor-dashboard.styles';

export default function Error({ reset }: Readonly<{ reset: () => void }>) {
  const err = sponsorErrorTv();

  return (
    <div className={err.root()}>
      <div className={err.panel()}>
        <div className={err.iconWrap()}>
          <span className={err.icon()} aria-hidden>
            !
          </span>
        </div>
        <h2 className={err.title()}>Failed to load campaigns</h2>
        <p className={err.body()}>
          Something went wrong. Please check your connection and try again.
        </p>
        <button type="button" onClick={reset} className={err.retry()}>
          Try again
        </button>
      </div>
    </div>
  );
}
