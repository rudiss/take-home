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
        {!user && !isPending ? <NavGuestAuthLinks layout="mobileSheet" onNavigate={closeMobile} /> : null}
      </div>
    </>
  );
}
