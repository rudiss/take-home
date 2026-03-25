import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { NavGuestAuthLinks } from './nav-guest-auth-links';
import { NavPrimaryLinks } from './nav-primary-links';
import { IconClose, IconMenu } from './nav-icons';
import { NavSignOutButton } from './nav-sign-out-button';
import { NavUserAvatar } from './nav-user-identity';
import {
  navMenuButton,
  navMobileBackdrop,
  navMobileCompactLogin,
  navMobileSheetName,
  navMobileSheetPanel,
  navMobileSheetRole,
  navMobileSheetSignedInSection,
  navMobileTrailingRoot,
} from './nav.styles';
import type { SessionUser, UserRole } from './types';

const FOCUSABLE =
  'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

export function NavMobileTrailing({
  isPending,
  user,
  mobileOpen,
  menuId,
  onToggleMenu,
}: Readonly<{
  isPending: boolean;
  user: SessionUser | undefined;
  mobileOpen: boolean;
  menuId: string;
  onToggleMenu: () => void;
}>) {
  return (
    <div className={navMobileTrailingRoot()}>
      {user && !isPending ? <NavUserAvatar user={user} shape="circle" /> : null}
      {!user && !isPending ? (
        <Link href="/login" className={navMobileCompactLogin()}>
          Log in
        </Link>
      ) : null}
      <button
        type="button"
        className={navMenuButton()}
        aria-expanded={mobileOpen}
        aria-controls={menuId}
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        onClick={onToggleMenu}
      >
        {mobileOpen ? <IconClose /> : <IconMenu />}
      </button>
    </div>
  );
}

function NavMobileSheetSignedIn({ user, role }: Readonly<{ user: SessionUser; role: UserRole }>) {
  return (
    <div className={navMobileSheetSignedInSection()}>
      <p className={navMobileSheetName()}>{user.name || user.email}</p>
      {role ? <p className={navMobileSheetRole()}>{role}</p> : null}
      <NavSignOutButton variant="mobile" />
    </div>
  );
}

export function NavMobileSheet({
  menuId,
  mobileOpen,
  closeMobile,
  isPending,
  user,
  role,
  dashboardHref,
}: Readonly<{
  menuId: string;
  mobileOpen: boolean;
  closeMobile: () => void;
  isPending: boolean;
  user: SessionUser | undefined;
  role: UserRole;
  dashboardHref: string | null;
}>) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;
    const panel = panelRef.current;
    if (!panel) return;

    // Focus first focusable element on open
    const first = panel.querySelector<HTMLElement>(FOCUSABLE);
    first?.focus();

    // Trap Tab within the panel
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusable.length === 0) return;
      const firstEl = focusable[0];
      const lastEl = focusable.at(-1)!;
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  if (!mobileOpen) return null;

  return (
    <>
      <button
        type="button"
        className={navMobileBackdrop()}
        aria-label="Close menu"
        onClick={closeMobile}
      />
      <div
        ref={panelRef}
        id={menuId}
        className={navMobileSheetPanel()}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <NavPrimaryLinks
          user={user}
          dashboardHref={dashboardHref}
          role={role}
          onNavigate={closeMobile}
          layout="mobile"
        />
        {user && !isPending ? <NavMobileSheetSignedIn user={user} role={role} /> : null}
        {!user && !isPending ? (
          <NavGuestAuthLinks layout="mobileSheet" onNavigate={closeMobile} />
        ) : null}
      </div>
    </>
  );
}
