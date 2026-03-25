import { navSignOutButton } from './nav.styles';
import { signOutAndRedirectHome } from './sign-out';

export function NavSignOutButton({ variant }: Readonly<{ variant: 'desktop' | 'mobile' }>) {
  return (
    <button
      type="button"
      className={navSignOutButton({ variant })}
      onClick={() => void signOutAndRedirectHome()}
    >
      Log out
    </button>
  );
}
