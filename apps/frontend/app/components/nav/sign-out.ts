import { authClient } from '@/auth-client';

export async function signOutAndRedirectHome() {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        globalThis.location.href = '/';
      },
    },
  });
}
