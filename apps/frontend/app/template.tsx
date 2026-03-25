import type { ReactNode } from 'react';

/**
 * Remounts on navigation so a subtle enter animation runs without pathname subscriptions.
 */
export default function Template({ children }: Readonly<{ children: ReactNode }>) {
  return <div className="animate-page-enter">{children}</div>;
}
