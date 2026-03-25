import { tv } from 'tailwind-variants';

export const skipLink = tv({
  base: 'sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-(--color-primary) focus:px-4 focus:py-2 focus:text-white focus:shadow-lg',
});

export const layoutBody = tv({
  base: 'min-h-screen antialiased',
});

export const layoutMain = tv({
  base: 'mx-auto max-w-6xl px-4 py-8',
});
