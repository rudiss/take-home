import { tv } from 'tailwind-variants';

export const campaignStatusBadgeTv = tv({
  base: 'shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium',
  variants: {
    status: {
      DRAFT: 'bg-gray-100 text-gray-600',
      PENDING_REVIEW: 'bg-amber-100 text-amber-700',
      APPROVED: 'bg-cyan-100 text-cyan-700',
      ACTIVE: 'bg-emerald-100 text-emerald-700',
      PAUSED: 'bg-yellow-100 text-yellow-700',
      COMPLETED: 'bg-blue-100 text-blue-700',
      CANCELLED: 'bg-red-100 text-red-700',
    },
  },
  defaultVariants: {
    status: 'DRAFT',
  },
});

export const campaignCardTv = tv({
  slots: {
    root: 'group rounded-xl bg-(--color-background) p-5 shadow-[--shadow-card] transition-shadow hover:shadow-[--shadow-card-hover]',
    topRow: 'mb-3 flex items-start justify-between gap-2',
    title: 'text-base font-semibold leading-tight text-(--color-foreground)',
    description: 'mb-4 text-sm leading-relaxed text-(--color-muted) line-clamp-2',
    budgetBlock: 'mb-4',
    budgetLabels: 'mb-1.5 flex justify-between text-sm',
    budgetLabel: 'text-(--color-muted)',
    budgetValue: 'font-medium text-(--color-foreground)',
    progressTrack: 'h-2 overflow-hidden rounded-full bg-gray-100',
    progressFill: 'h-2 rounded-full bg-(--color-primary) transition-all',
    dateLine: 'mb-4 text-xs text-(--color-muted)',
    actions: 'flex items-center gap-3 border-t border-(--color-border) pt-3',
    editButton:
      'text-sm font-medium text-(--color-primary) transition-colors hover:text-(--color-primary-hover) focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary)',
  },
});

export const campaignFormTv = tv({
  slots: {
    dialog: 'rounded-2xl border border-(--color-border) bg-(--color-background) p-0 shadow-[--shadow-lg]',
    root: 'space-y-5 p-6',
    header: 'flex items-center justify-between border-b border-(--color-border) pb-4',
    title: 'text-lg font-semibold text-(--color-foreground)',
    closeButton:
      'flex h-8 w-8 items-center justify-center rounded-lg text-(--color-muted) transition-colors hover:bg-(--color-surface) hover:text-(--color-foreground)',
    errorBanner: 'rounded-lg bg-red-50 p-3 text-sm text-red-700',
    label: 'mb-1.5 block text-sm font-medium text-(--color-foreground)',
    input:
      'w-full rounded-lg border border-(--color-border) bg-(--color-background) px-3 py-2.5 text-sm text-(--color-foreground) transition-colors placeholder:text-(--color-muted) focus:border-(--color-primary) focus:outline-none focus:ring-2 focus:ring-(--color-primary)/20',
    fieldError: 'mt-1.5 text-xs text-red-600',
    dateGrid: 'grid grid-cols-2 gap-4',
    footer: 'flex gap-3 border-t border-(--color-border) pt-4',
    cancelButton:
      'rounded-lg border border-(--color-border) px-4 py-2.5 text-sm font-medium transition-colors hover:bg-(--color-surface) focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary)',
  },
});

export const campaignListTv = tv({
  slots: {
    root: 'space-y-6',
    toolbar: 'flex justify-end',
    newButton:
      'rounded-lg bg-(--color-primary) px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-(--color-primary-hover) focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary)',
    emptyRoot:
      'rounded-xl bg-(--color-background) p-12 text-center shadow-[--shadow-card]',
    emptyIconWrap:
      'mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-(--color-primary)/10',
    emptyIcon: 'text-xl text-(--color-primary)',
    emptyTitle: 'mb-1 font-semibold text-(--color-foreground)',
    emptyBody: 'text-sm text-(--color-muted)',
    cardGrid: 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3',
  },
});

export const sponsorPageTv = tv({
  slots: {
    root: 'space-y-8',
    headerBlock: '',
    title: 'text-2xl font-bold text-(--color-foreground)',
    subtitle: 'mt-1 text-(--color-muted)',
    statsGrid: 'grid gap-4 sm:grid-cols-2 lg:grid-cols-4',
    statCard: 'rounded-xl bg-(--color-background) p-5 shadow-[--shadow-card]',
    statLabel: 'text-sm font-medium text-(--color-muted)',
    statValue: 'mt-1 text-2xl font-semibold text-(--color-foreground)',
  },
});

export const sponsorLoadingTv = tv({
  slots: {
    root: 'space-y-8',
    headerTitle: 'h-8 w-48 animate-pulse rounded bg-gray-200',
    headerSubtitle: 'mt-2 h-4 w-72 animate-pulse rounded bg-gray-100',
    statsGrid: 'grid gap-4 sm:grid-cols-2 lg:grid-cols-4',
    statCard: 'animate-pulse rounded-xl bg-(--color-background) p-5 shadow-[--shadow-card]',
    statLineA: 'h-3 w-20 rounded bg-gray-100',
    statLineB: 'mt-2 h-7 w-16 rounded bg-gray-200',
    cardGrid: 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3',
  },
});

export const sponsorSkeletonCardTv = tv({
  slots: {
    root: 'animate-pulse rounded-xl bg-(--color-background) p-5 shadow-[--shadow-card]',
    topRow: 'mb-3 flex items-start justify-between',
    titleBar: 'h-5 w-32 rounded bg-gray-200',
    badge: 'h-5 w-16 rounded-full bg-gray-200',
    lineStack: 'mb-4 space-y-2',
    lineFull: 'h-3 w-full rounded bg-gray-100',
    linePart: 'h-3 w-2/3 rounded bg-gray-100',
    progressBlock: 'mb-4',
    progressLabels: 'mb-1.5 flex justify-between',
    labelA: 'h-3 w-12 rounded bg-gray-100',
    labelB: 'h-3 w-24 rounded bg-gray-100',
    progressTrack: 'h-2 rounded-full bg-gray-100',
    dateLine: 'h-3 w-40 rounded bg-gray-100',
  },
});

export const sponsorErrorTv = tv({
  slots: {
    root: 'flex min-h-[40vh] items-center justify-center',
    panel: 'rounded-xl bg-(--color-background) p-8 text-center shadow-[--shadow-card]',
    iconWrap: 'mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100',
    icon: 'text-lg text-red-600',
    title: 'mb-2 text-lg font-semibold text-(--color-foreground)',
    body: 'mb-6 text-sm text-(--color-muted)',
    retry:
      'rounded-lg bg-(--color-primary) px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-(--color-primary-hover) focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary)',
  },
});
