import { NavGuestAuthLinks } from './nav-guest-auth-links';
import { NavPrimaryLinks } from './nav-primary-links';
import { NavSignOutButton } from './nav-sign-out-button';
import { NavUserAvatar, NavUserIdentityText } from './nav-user-identity';
import {
  navAuthPending,
  navDesktopAuthRow,
  navUserChip,
  navUserChipTextCol,
} from './nav.styles';
import type { SessionUser, UserRole } from './types';

function NavDesktopAuthPending() {
  return <div className={navAuthPending()} aria-hidden />;
}

function NavDesktopAuthSignedIn({ user, role }: Readonly<{ user: SessionUser; role: UserRole }>) {
  return (
    <div className={navDesktopAuthRow()}>
      <div className={navUserChip()}>
        <NavUserAvatar user={user} shape="square" />
        <div className={navUserChipTextCol()}>
          <NavUserIdentityText user={user} role={role} />
        </div>
      </div>
      <NavSignOutButton variant="desktop" />
    </div>
  );
}

export function NavDesktopLinks({
  user,
  dashboardHref,
  role,
}: Readonly<{
  user: SessionUser | undefined;
  dashboardHref: string | null;
  role: UserRole;
}>) {
  return (
    <NavPrimaryLinks
      user={user}
      dashboardHref={dashboardHref}
      role={role}
      layout="desktop"
    />
  );
}

export function NavDesktopAuth({
  isPending,
  user,
  role,
}: Readonly<{
  isPending: boolean;
  user: SessionUser | undefined;
  role: UserRole;
}>) {
  if (isPending) return <NavDesktopAuthPending />;
  if (user) return <NavDesktopAuthSignedIn user={user} role={role} />;
  return <NavGuestAuthLinks layout="desktop" />;
}
