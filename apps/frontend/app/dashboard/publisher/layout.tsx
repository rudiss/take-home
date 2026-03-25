import type { ReactNode } from 'react';
import { publisherShellTv } from './publisher-dashboard.styles';

export default function PublisherDashboardLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <div className={publisherShellTv()}>{children}</div>;
}
