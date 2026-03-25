import { tv } from 'tailwind-variants';

/** Shared ad-slot type colors (grid overlay + detail hero). */
export const marketplaceTypeBadgeTv = tv({
  base: 'text-xs font-semibold',
  variants: {
    type: {
      DISPLAY: 'bg-sky-100 text-sky-800',
      VIDEO: 'bg-rose-100 text-rose-800',
      NATIVE: 'bg-emerald-100 text-emerald-800',
      NEWSLETTER: 'bg-violet-100 text-violet-800',
      PODCAST: 'bg-amber-100 text-amber-900',
    },
    placement: {
      grid: 'absolute right-3 top-3 rounded-md px-2 py-0.5 font-medium',
      hero: 'inline-block rounded-md px-2.5 py-1',
    },
  },
  defaultVariants: {
    type: 'DISPLAY',
    placement: 'hero',
  },
});

export const marketplaceCardAvailabilityTv = tv({
  base: 'absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-xs font-semibold text-white shadow-sm',
  variants: {
    available: {
      true: 'bg-green-600',
      false: 'bg-[--color-foreground]/80',
    },
  },
  defaultVariants: {
    available: true,
  },
});

export const marketplacePageTv = tv({
  slots: {
    root: 'space-y-8',
    header: 'max-w-3xl space-y-2',
    title: 'text-3xl font-bold tracking-tight text-[--color-foreground]',
    lead: 'text-lg text-[--color-muted]',
    note: 'text-sm text-[--color-muted]',
  },
});

export const marketplaceListingGridTv = tv({
  base: 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3',
});

export const marketplaceStateMessageTv = tv({
  variants: {
    kind: {
      loading: 'py-12 text-center text-[--color-muted]',
      error: 'rounded border border-red-200 bg-red-50 p-4 text-red-600',
      empty:
        'rounded-lg border border-dashed border-[--color-border] p-12 text-center text-[--color-muted]',
    },
  },
});

export const marketplaceListingCardTv = tv({
  slots: {
    link: 'group flex flex-col overflow-hidden rounded-xl border border-[--color-border] bg-[--color-background] shadow-[--shadow-card] transition-shadow hover:shadow-[--shadow-card-hover]',
    imageWrap: 'relative aspect-16/10 w-full overflow-hidden bg-[--color-surface]',
    image: 'object-cover transition-transform duration-300 group-hover:scale-[1.03]',
    body: 'flex flex-1 flex-col p-4',
    cardTitle:
      'text-lg font-bold leading-snug text-[--color-foreground] group-hover:text-[--color-primary]',
    publisher: 'mt-1 text-sm text-[--color-muted]',
    description: 'mt-2 line-clamp-2 flex-1 text-sm text-[--color-muted]',
    footer: 'mt-4 flex items-end justify-between gap-3 border-t border-[--color-border] pt-4',
    fromLabel: 'text-xs font-medium uppercase tracking-wide text-[--color-muted]',
    price: 'text-xl font-bold text-[--color-primary]',
    priceSuffix: 'text-sm font-semibold text-[--color-muted]',
    cta: 'inline-flex items-center gap-0.5 text-sm font-semibold text-[--color-primary]',
  },
});

export const marketplaceIconTv = tv({
  variants: {
    name: {
      chevron: 'h-4 w-4 transition-transform group-hover:translate-x-0.5',
      check: 'mt-0.5 h-4 w-4 shrink-0 text-[--color-primary]',
      shield: 'h-6 w-6',
    },
  },
  defaultVariants: {
    name: 'chevron',
  },
});

export const adSlotDetailTv = tv({
  slots: {
    root: 'space-y-8',
    backLink:
      'inline-flex items-center text-sm font-medium text-[--color-primary] hover:underline focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]',
    backLinkPlain:
      'text-[--color-primary] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]',
    errorStack: 'space-y-4',
    layout: 'grid gap-8 lg:grid-cols-[1fr_min(100%,380px)] lg:items-start',
    main: 'min-w-0 space-y-6',
    hero: 'relative aspect-[21/9] max-h-80 w-full overflow-hidden rounded-xl bg-[--color-surface] sm:aspect-[2/1]',
    heroImage: 'object-cover',
    heroGradient: 'absolute inset-0 bg-gradient-to-t from-black/50 to-transparent',
    heroOverlay: 'absolute bottom-0 left-0 right-0 p-5 sm:p-6',
    heroTitle: 'mt-2 text-2xl font-bold text-white drop-shadow sm:text-3xl',
    publisherCard:
      'flex flex-wrap items-start gap-3 rounded-xl border border-[--color-border] bg-[--color-surface] p-4',
    publisherIconWrap:
      'flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[--color-primary]/15 text-[--color-primary]',
    publisherLabel: 'text-xs font-semibold uppercase tracking-wide text-[--color-muted]',
    publisherName: 'text-lg font-semibold text-[--color-foreground]',
    publisherSiteLink:
      'mt-1 text-sm font-medium text-[--color-primary] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]',
    publisherBlurb: 'mt-2 text-sm text-[--color-muted]',
    sectionTitle: 'text-lg font-semibold text-[--color-foreground]',
    sectionBody: 'mt-2 text-[--color-muted]',
    bulletList: 'mt-3 space-y-2',
    bulletItem: 'flex gap-2 text-sm text-[--color-muted]',
    aside: 'lg:sticky lg:top-24',
    sidebarPanel:
      'space-y-4 rounded-xl border-2 border-[--color-primary]/25 bg-[--color-background] p-6 shadow-[--shadow-card]',
    sidebarHeaderRow: 'flex items-start justify-between gap-3',
    investmentLabel: 'text-xs font-semibold uppercase tracking-wide text-[--color-muted]',
    investmentPrice: 'text-3xl font-bold text-[--color-primary]',
    investmentSuffix: 'text-lg font-semibold text-[--color-muted]',
    statusBox: 'rounded-lg bg-[--color-surface] px-3 py-2',
    statusHint: 'mt-1 text-xs text-[--color-muted]',
    unbookButton:
      'w-full text-sm font-medium text-[--color-primary] underline hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]',
    accountLoading: 'py-4 text-center text-sm text-[--color-muted]',
    bookingSection: 'space-y-4 border-t border-[--color-border] pt-4',
    orgLabel: 'text-xs font-semibold uppercase tracking-wide text-[--color-muted]',
    orgName: 'font-medium text-[--color-foreground]',
    fieldLabel: 'mb-1 block text-sm font-medium text-[--color-foreground]',
    fieldHint: 'font-normal text-[--color-muted]',
    textarea:
      'w-full rounded-lg border border-[--color-border] bg-[--color-background] px-3 py-2 text-[--color-foreground] placeholder:text-[--color-muted] focus:border-[--color-primary] focus:outline-none focus:ring-2 focus:ring-[--color-primary]/20',
    bookingError: 'text-sm text-red-600',
    primaryButton:
      'flex w-full items-center justify-center rounded-xl bg-[--color-primary] px-4 py-3.5 text-base font-bold text-white shadow-md transition-colors hover:bg-[--color-primary-hover] disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]',
    sidebarHint: 'text-center text-xs text-[--color-muted]',
    gateSection: 'space-y-3 border-t border-[--color-border] pt-4',
    gateTextMuted: 'text-sm text-[--color-muted]',
    gateText: 'text-sm text-[--color-foreground]',
    successBox: 'rounded-lg border border-green-200 bg-green-50 p-4',
    successTitle: 'font-semibold text-green-800',
    successBody: 'mt-1 text-sm text-green-800',
    successNote: 'mt-3 text-xs text-green-800',
    detailLoading: 'py-12 text-center text-[--color-muted]',
    errorBanner: 'rounded border border-red-200 bg-red-50 p-4 text-red-600',
  },
});

export const adSlotDetailSidebarStatusTv = tv({
  base: 'text-sm font-semibold',
  variants: {
    available: {
      true: 'text-green-700',
      false: 'text-[--color-muted]',
    },
  },
  defaultVariants: {
    available: false,
  },
});
