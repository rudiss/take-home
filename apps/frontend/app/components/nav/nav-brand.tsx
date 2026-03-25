import Link from 'next/link';
import {
  navBrandLink,
  navBrandMark,
  navBrandRoot,
  navBrandSubtitle,
  navBrandTextCol,
  navBrandTitle,
} from './nav.styles';

export function NavBrand() {
  return (
    <div className={navBrandRoot()}>
      <Link href="/" className={navBrandLink()}>
        <span className={navBrandMark()} aria-hidden>
          A
        </span>
        <span className={navBrandTextCol()}>
          <span className={navBrandTitle()}>Anvara</span>
          <span className={navBrandSubtitle()}>Marketplace</span>
        </span>
      </Link>
    </div>
  );
}
