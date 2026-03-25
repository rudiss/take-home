import { tv } from 'tailwind-variants';

/* ------------------------------------------------------------------ */
/*  Shared variants                                                   */
/* ------------------------------------------------------------------ */

export const link = tv({
  base: 'inline-flex min-h-11 w-full items-center justify-center rounded-xl px-8 py-3 text-base font-semibold transition-colors focus-visible:outline focus-visible:outline-offset-2 sm:w-auto',
  variants: {
    intent: {
      primary:
        'bg-(--color-primary) text-white shadow-md hover:bg-(--color-primary-hover) focus-visible:outline-(--color-primary)',
      secondary:
        'border border-(--color-border) bg-(--color-background)/80 text-(--color-foreground) backdrop-blur hover:bg-(--color-surface) focus-visible:outline-(--color-primary)',
      ctaPrimary:
        'max-w-xs bg-white text-(--color-primary) shadow-md hover:bg-indigo-50 focus-visible:outline-white',
      ctaSecondary:
        'max-w-xs border border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20 focus-visible:outline-white',
    },
  },
});

export const featureCard = tv({
  base: 'rounded-2xl border border-(--color-border) bg-(--color-background) p-8 shadow-[--shadow-card]',
});

export const featureIcon = tv({
  base: 'mb-4 flex h-12 w-12 items-center justify-center rounded-xl',
  variants: {
    color: {
      indigo: 'bg-indigo-100 text-(--color-primary) dark:bg-indigo-950/50',
      emerald: 'bg-emerald-100 text-(--color-secondary) dark:bg-emerald-950/50',
      violet: 'bg-violet-100 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300',
      amber: 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-200',
      sky: 'bg-sky-100 text-sky-800 dark:bg-sky-950/50 dark:text-sky-200',
      rose: 'bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-200',
    },
  },
});

export const sectionHeading = tv({
  base: 'text-3xl font-bold tracking-tight text-(--color-foreground) sm:text-4xl',
});

export const stepBadge = tv({
  base: 'mb-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--color-primary) text-sm font-bold text-white',
});

/* ------------------------------------------------------------------ */
/*  Landing page sections                                             */
/* ------------------------------------------------------------------ */

export const landingRoot = tv({
  base: 'pb-16 pt-2 sm:pb-24 sm:pt-4',
});

export const heroSection = tv({
  base: 'relative overflow-hidden rounded-3xl border border-(--color-border) bg-linear-to-br from-indigo-50/90 via-(--color-background) to-emerald-50/80 px-6 py-14 shadow-[--shadow-lg] sm:px-10 sm:py-16 lg:px-14 lg:py-20 dark:from-indigo-950/40 dark:via-(--color-background) dark:to-emerald-950/30',
});

export const heroGrid = tv({
  base: 'mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16',
});

export const heroHeader = tv({
  base: 'text-center lg:text-left',
});

export const heroEyebrow = tv({
  base: 'mb-4 text-sm font-semibold uppercase tracking-wider text-(--color-primary)',
});

export const heroTitle = tv({
  base: 'text-balance text-4xl font-bold tracking-tight text-(--color-foreground) sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]',
});

export const heroSubtitle = tv({
  base: 'mx-auto mt-5 max-w-xl text-pretty text-lg text-(--color-muted) lg:mx-0',
});

export const heroNav = tv({
  base: 'mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start',
});

export const heroNote = tv({
  base: 'mt-6 text-sm text-(--color-muted)',
});

export const heroVisualWrap = tv({
  base: 'relative mx-auto w-full max-w-md lg:max-w-none',
});

export const featuresSection = tv({
  base: 'mx-auto mt-20 max-w-6xl sm:mt-28',
});

export const featuresSectionHeader = tv({
  base: 'mx-auto max-w-2xl text-center',
});

export const featuresSectionSubtitle = tv({
  base: 'mt-4 text-lg text-(--color-muted)',
});

export const featuresGrid = tv({
  base: 'mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3',
});

export const featureTitle = tv({
  base: 'text-lg font-semibold text-(--color-foreground)',
});

export const featureDescription = tv({
  base: 'mt-2 text-(--color-muted)',
});

export const howItWorksSection = tv({
  base: 'mx-auto mt-20 max-w-6xl rounded-3xl border border-(--color-border) bg-(--color-surface) px-6 py-14 sm:mt-28 sm:px-10 sm:py-16',
});

export const howItWorksSectionSubtitle = tv({
  base: 'mt-4 text-lg text-(--color-muted)',
});

export const stepsGrid = tv({
  base: 'mx-auto mt-12 grid max-w-4xl gap-10 md:grid-cols-3 md:gap-8',
});

export const stepItem = tv({
  base: 'relative flex flex-col items-center text-center md:items-start md:text-left',
});

export const stepTitle = tv({
  base: 'text-lg font-semibold text-(--color-foreground)',
});

export const stepDescription = tv({
  base: 'mt-2 text-sm text-(--color-muted)',
});

export const ctaSection = tv({
  base: 'mx-auto mt-20 max-w-6xl sm:mt-28',
});

export const ctaCard = tv({
  base: 'overflow-hidden rounded-3xl bg-linear-to-br from-(--color-primary) to-indigo-700 px-8 py-14 text-center text-white shadow-[--shadow-lg] sm:px-12 sm:py-16',
});

export const ctaTitle = tv({
  base: 'text-3xl font-bold tracking-tight sm:text-4xl',
});

export const ctaSubtitle = tv({
  base: 'mx-auto mt-4 max-w-xl text-pretty text-lg text-indigo-100',
});

export const ctaNav = tv({
  base: 'mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row',
});

export const ctaNote = tv({
  base: 'mt-10 text-sm text-indigo-200',
});
