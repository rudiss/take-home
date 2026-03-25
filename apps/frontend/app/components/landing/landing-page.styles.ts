import { tv } from 'tailwind-variants';

/* ------------------------------------------------------------------ */
/*  Shared variants                                                   */
/* ------------------------------------------------------------------ */

export const link = tv({
  base: 'inline-flex min-h-11 w-full items-center justify-center rounded-xl px-8 py-3 text-base font-semibold transition-colors focus-visible:outline focus-visible:outline-offset-2 sm:w-auto',
  variants: {
    intent: {
      primary:
        'bg-[--color-primary] text-white shadow-md hover:bg-[--color-primary-hover] focus-visible:outline-[--color-primary]',
      secondary:
        'border border-[--color-border] bg-[--color-background]/80 text-[--color-foreground] backdrop-blur hover:bg-[--color-surface] focus-visible:outline-[--color-primary]',
      ctaPrimary:
        'max-w-xs bg-white text-[--color-primary] shadow-md hover:bg-indigo-50 focus-visible:outline-white',
      ctaSecondary:
        'max-w-xs border border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20 focus-visible:outline-white',
    },
  },
});

export const featureCard = tv({
  base: 'rounded-2xl border border-[--color-border] bg-[--color-background] p-8 shadow-[--shadow-card]',
});

export const featureIcon = tv({
  base: 'mb-4 flex h-12 w-12 items-center justify-center rounded-xl',
  variants: {
    color: {
      indigo: 'bg-indigo-100 text-[--color-primary] dark:bg-indigo-950/50',
      emerald: 'bg-emerald-100 text-[--color-secondary] dark:bg-emerald-950/50',
      violet: 'bg-violet-100 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300',
      amber: 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-200',
      sky: 'bg-sky-100 text-sky-800 dark:bg-sky-950/50 dark:text-sky-200',
      rose: 'bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-200',
    },
  },
});

export const sectionHeading = tv({
  base: 'text-3xl font-bold tracking-tight text-[--color-foreground] sm:text-4xl',
});

export const stepBadge = tv({
  base: 'mb-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[--color-primary] text-sm font-bold text-white',
});
