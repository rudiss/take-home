'use client';

import { publisherErrorTv } from './publisher-dashboard.styles';

export default function Error({ reset }: Readonly<{ reset: () => void }>) {
  const err = publisherErrorTv();

  return (
    <div className={err.root()}>
      <div className={err.panel()}>
        <div className={err.iconWrap()}>
          <span className={err.icon()} aria-hidden>
            !
          </span>
        </div>
        <h2 className={err.title()}>Couldn&apos;t load ad slots</h2>
        <p className={err.body()}>
          Check your connection and try again. If the problem continues, refresh the page.
        </p>
        <button type="button" onClick={reset} className={err.retry()}>
          Try again
        </button>
      </div>
    </div>
  );
}
