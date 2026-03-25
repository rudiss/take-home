import Link from 'next/link';
import {
  navGuestAuthRoot,
  navGuestMobileOutlineLink,
  navGuestMobilePrimaryLink,
  navGuestMutedLink,
  navGuestPrimaryLink,
} from './nav.styles';

export function NavGuestAuthLinks({
  layout,
  onNavigate,
}: Readonly<{
  layout: 'desktop' | 'mobileSheet';
  onNavigate?: () => void;
}>) {
  if (layout === 'desktop') {
    return (
      <div className={navGuestAuthRoot({ layout: 'desktop' })}>
        <Link href="/login" className={navGuestMutedLink()}>
          Log in
        </Link>
        <Link href="/login" className={navGuestPrimaryLink()}>
          Get started
        </Link>
      </div>
    );
  }

  return (
    <div className={navGuestAuthRoot({ layout: 'mobileSheet' })}>
      <Link href="/login" onClick={onNavigate} className={navGuestMobileOutlineLink()}>
        Log in
      </Link>
      <Link href="/login" onClick={onNavigate} className={navGuestMobilePrimaryLink()}>
        Get started
      </Link>
    </div>
  );
}
