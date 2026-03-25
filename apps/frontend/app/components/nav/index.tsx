'use client';

import { useCallback, useId, useState } from 'react';
import { authClient } from '@/auth-client';
import { NavBrand } from './nav-brand';
import { NavDesktopAuth, NavDesktopLinks } from './nav-desktop';
import { useMobileMenuLock } from './hooks/use-mobile-menu-lock';
import { useRoleForUser } from './hooks/use-role-for-user';
import { NavMobileSheet, NavMobileTrailing } from './nav-mobile';
import type { SessionUser } from './types';
import { navBar, navHeader } from './nav.styles';
import { resolvedRole, resolveDashboardHref } from './utils';

export function Nav() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user as SessionUser | undefined;
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuId = useId();
  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const toggleMobile = useCallback(() => setMobileOpen((o) => !o), []);

  const roleForUser = useRoleForUser(user?.id);
  useMobileMenuLock(mobileOpen, closeMobile);

  const role = resolvedRole(user, roleForUser);
  const dashboardHref = resolveDashboardHref(role);

  return (
    <header className={navHeader()}>
      <nav className={navBar()} aria-label="Main">
        <NavBrand />
        <NavDesktopLinks user={user} dashboardHref={dashboardHref} role={role} />
        <NavDesktopAuth isPending={isPending} user={user} role={role} />
        <NavMobileTrailing
          isPending={isPending}
          user={user}
          mobileOpen={mobileOpen}
          menuId={menuId}
          onToggleMenu={toggleMobile}
        />
      </nav>

      <NavMobileSheet
        menuId={menuId}
        mobileOpen={mobileOpen}
        closeMobile={closeMobile}
        isPending={isPending}
        user={user}
        role={role}
        dashboardHref={dashboardHref}
      />
    </header>
  );
}
