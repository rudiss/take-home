import type { RoleForUser, SessionUser, UserRole } from './types';

export function userInitials(name: string | null | undefined, email: string | null | undefined) {
  const raw = (name || email || '?').trim();
  const parts = raw.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0]![0]! + parts[1]![0]!).toUpperCase();
  }
  return raw.slice(0, 2).toUpperCase();
}

export function resolveDashboardHref(role: UserRole): string | null {
  if (role === 'sponsor') return '/dashboard/sponsor';
  if (role === 'publisher') return '/dashboard/publisher';
  return null;
}

export function dashboardNavLabel(role: 'sponsor' | 'publisher'): string {
  return role === 'sponsor' ? 'My campaigns' : 'My ad slots';
}

export function resolvedRole(user: SessionUser | undefined, roleForUser: RoleForUser | null): UserRole {
  if (!user?.id || roleForUser?.userId !== user.id) return null;
  return roleForUser.role;
}

export function shouldShowDashboardLink(
  user: SessionUser | undefined,
  role: UserRole,
  dashboardHref: string | null,
): role is 'sponsor' | 'publisher' {
  return Boolean(user && dashboardHref && role);
}
