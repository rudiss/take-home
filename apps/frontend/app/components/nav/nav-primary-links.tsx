import { NavLink } from './nav-link';
import { navPrimaryLinksRoot } from './nav.styles';
import { dashboardNavLabel, shouldShowDashboardLink } from './utils';
import type { SessionUser, UserRole } from './types';

export function NavPrimaryLinks({
  user,
  dashboardHref,
  role,
  onNavigate,
  layout,
}: Readonly<{
  user: SessionUser | undefined;
  dashboardHref: string | null;
  role: UserRole;
  onNavigate?: () => void;
  layout: 'desktop' | 'mobile';
}>) {
  const show = shouldShowDashboardLink(user, role, dashboardHref);

  return (
    <div className={navPrimaryLinksRoot({ layout })}>
      <NavLink href="/marketplace" onNavigate={onNavigate}>
        Marketplace
      </NavLink>
      {show ? (
        <NavLink href={dashboardHref!} onNavigate={onNavigate}>
          {dashboardNavLabel(role)}
        </NavLink>
      ) : null}
    </div>
  );
}
