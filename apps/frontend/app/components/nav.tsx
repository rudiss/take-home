'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { authClient } from '@/auth-client';

type UserRole = 'sponsor' | 'publisher' | null;

interface RoleForUser {
  userId: string;
  role: UserRole;
}

function NavLink({ href, children }: Readonly<{ href: string; children: React.ReactNode }>) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + '/');

  return (
    <Link
      href={href}
      className={`text-sm font-medium transition-colors ${
        isActive
          ? 'text-[--color-primary]'
          : 'text-[--color-muted] hover:text-[--color-foreground]'
      }`}
    >
      {children}
    </Link>
  );
}

export function Nav() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [roleForUser, setRoleForUser] = useState<RoleForUser | null>(null);

  useEffect(() => {
    if (!user?.id) return;

    const userId = user.id;
    let cancelled = false;

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4291'}/api/auth/role/${userId}`,
    )
      .then((res) => res.json())
      .then((data: { role: UserRole }) => {
        if (!cancelled) setRoleForUser({ userId, role: data.role });
      })
      .catch(() => {
        if (!cancelled) setRoleForUser({ userId, role: null });
      });

    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const role: UserRole =
    user?.id && roleForUser?.userId === user.id ? roleForUser.role : null;

  return (
    <header className="sticky top-0 z-50 border-b border-[--color-border] bg-[--color-background]/95 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-[--color-primary]">
          Anvara
        </Link>

        <div className="flex items-center gap-6">
          <NavLink href="/marketplace">Marketplace</NavLink>

          {user && role === 'sponsor' && (
            <NavLink href="/dashboard/sponsor">My Campaigns</NavLink>
          )}
          {user && role === 'publisher' && (
            <NavLink href="/dashboard/publisher">My Ad Slots</NavLink>
          )}

          {isPending ? (
            <span className="text-sm text-[--color-muted]">...</span>
          ) : user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-[--color-muted]">
                {user.name}
                {role && (
                  <span className="ml-1.5 rounded-full bg-[--color-primary]/10 px-2 py-0.5 text-xs font-medium text-[--color-primary]">
                    {role}
                  </span>
                )}
              </span>
              <button
                onClick={async () => {
                  await authClient.signOut({
                    fetchOptions: {
                      onSuccess: () => {
                        window.location.href = '/';
                      },
                    },
                  });
                }}
                className="rounded-lg border border-[--color-border] px-3 py-1.5 text-sm text-[--color-muted] transition-colors hover:border-[--color-foreground]/20 hover:text-[--color-foreground]"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-[--color-primary] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[--color-primary-hover]"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
