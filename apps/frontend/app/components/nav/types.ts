export type UserRole = 'sponsor' | 'publisher' | null;

export interface RoleForUser {
  userId: string;
  role: UserRole;
}

export interface SessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
}
