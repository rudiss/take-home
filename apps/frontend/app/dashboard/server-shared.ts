'use server';

import { cookies } from 'next/headers';

/** Serialize cookies for forwarding to the Express API from Server Actions. */
export async function cookieHeaderForApi(): Promise<string> {
  const store = await cookies();
  return store.getAll().map(({ name, value }) => `${name}=${value}`).join('; ');
}
