'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navLink } from './nav.styles';

export function NavLink({
  href,
  children,
  onNavigate,
}: Readonly<{
  href: string;
  children: React.ReactNode;
  onNavigate?: () => void;
}>) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href + '/'));

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={navLink({ active: isActive })}
    >
      {children}
    </Link>
  );
}
