import { tv } from 'tailwind-variants';

export const newsletterTv = tv({
  slots: {
    root: 'mx-auto mt-16 max-w-xl rounded-2xl border border-(--color-border) bg-(--color-surface) px-6 py-8 text-center sm:mt-20',
    title: 'text-lg font-semibold text-(--color-foreground)',
    description: 'mt-1 text-sm text-(--color-muted)',
    form: 'mt-4 flex flex-col gap-2 sm:flex-row',
    input:
      'flex-1 rounded-lg border border-(--color-border) bg-(--color-background) px-3 py-2.5 text-sm text-(--color-foreground) placeholder:text-(--color-muted) focus:border-(--color-primary) focus:outline-none focus:ring-2 focus:ring-(--color-primary)/20 disabled:opacity-50',
    button:
      'rounded-lg bg-(--color-primary) px-5 py-2.5 text-sm font-semibold text-white transition-[transform,colors] duration-200 ease-out hover:bg-(--color-primary-hover) active:scale-[0.98] disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary)',
    success: 'mt-4 text-sm font-medium text-green-700',
    error: 'mt-2 text-sm text-red-600',
    hint: 'mt-3 text-xs text-(--color-muted)',
  },
});
