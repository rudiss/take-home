import { useEffect, useState } from 'react';
import { NAV_API_URL } from '../constants';
import type { RoleForUser, UserRole } from '../types';

export function useRoleForUser(userId: string | undefined) {
  const [roleForUser, setRoleForUser] = useState<RoleForUser | null>(null);

  useEffect(() => {
    if (!userId) return;

    let cancelled = false;

    fetch(`${NAV_API_URL}/api/auth/role/${userId}`)
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
  }, [userId]);

  return roleForUser;
}
