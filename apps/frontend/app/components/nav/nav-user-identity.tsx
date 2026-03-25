import {
  navUserAvatar,
  navUserDisplayName,
  navUserRoleLine,
  navUserSignedInLine,
} from './nav.styles';
import { userInitials } from './utils';
import type { SessionUser, UserRole } from './types';

export function NavUserAvatar({
  user,
  shape,
}: Readonly<{ user: SessionUser; shape: 'square' | 'circle' }>) {
  return (
    <span className={navUserAvatar({ shape })} aria-hidden>
      {userInitials(user.name, user.email)}
    </span>
  );
}

export function NavUserIdentityText({
  user,
  role,
  nameClassName,
}: Readonly<{
  user: SessionUser;
  role: UserRole;
  nameClassName?: string;
}>) {
  return (
    <>
      <p className={nameClassName ? navUserDisplayName({ class: nameClassName }) : navUserDisplayName()}>
        {user.name || user.email}
      </p>
      {role ? (
        <p className={navUserRoleLine()}>{role}</p>
      ) : (
        <p className={navUserSignedInLine()}>Signed in</p>
      )}
    </>
  );
}
