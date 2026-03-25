import { tv } from 'tailwind-variants';

/** Full-bleed dark panel within the global main column */
export const publisherShellTv = tv({
  base: '-mx-4 min-h-[min(70vh,calc(100vh-6rem))] bg-slate-950 px-4 py-8 text-slate-50 sm:-mx-6 sm:px-8 sm:py-10',
});

export const publisherHeaderTv = tv({
  slots: {
    block: 'space-y-2',
    title: 'text-2xl font-bold tracking-tight text-white sm:text-3xl',
    subtitle: 'text-sm text-slate-400 sm:text-base',
  },
});

export const publisherStatsRowTv = tv({
  slots: {
    row: 'flex flex-wrap items-baseline gap-x-8 gap-y-2 border-b border-slate-800/80 pb-6',
    item: 'text-sm font-medium tabular-nums text-white sm:text-base',
    label: 'text-slate-400',
    value: 'font-semibold text-white',
  },
});

export const publisherToolbarTv = tv({
  slots: {
    bar: 'flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between',
    hint: 'text-xs text-slate-500',
    filterGroup: 'flex flex-wrap items-center gap-2',
    filterSelect:
      'rounded-lg border border-slate-600 bg-slate-950/80 px-3 py-2 text-sm text-white shadow-inner focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30',
    activeFilterCount: 'text-xs text-slate-500',
  },
});

export const newSlotTriggerTv = tv({
  base: 'inline-flex items-center gap-1.5 text-sm font-semibold text-white underline decoration-slate-500 underline-offset-4 transition-[colors,opacity,transform] duration-200 ease-out hover:text-sky-300 hover:decoration-sky-400 active:opacity-80 active:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950',
  variants: {
    open: {
      true: 'text-slate-300 decoration-slate-600',
      false: '',
    },
  },
  defaultVariants: { open: false },
});

export const adSlotCardTv = tv({
  slots: {
    root: 'flex h-full flex-col space-y-4 py-2 transition-transform duration-200 ease-out md:hover:-translate-y-0.5',
    topRow: 'flex items-start justify-between gap-3',
    title: 'min-w-0 flex-1 text-base font-bold leading-snug text-white sm:text-lg',
    description: 'min-h-14 text-sm leading-relaxed text-slate-400 line-clamp-3 sm:line-clamp-4',
    metaRow: 'flex flex-wrap items-center justify-between gap-3',
    statusLine: 'inline-flex items-center gap-2 text-sm font-medium',
    statusDot: 'h-2 w-2 shrink-0 rounded-full',
    priceBlock: 'text-right',
    priceMain: 'text-lg font-bold text-white sm:text-xl',
    priceSuffix: 'text-sm font-normal text-slate-500',
    actionSection: 'mt-auto border-t border-slate-800 pt-4',
    actionsRow: 'flex flex-wrap items-center gap-6',
    editButton:
      'text-sm font-medium text-white transition-[transform,colors] duration-200 ease-out hover:text-slate-200 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950',
  },
});

export const typeBadgeTv = tv({
  base: 'shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide',
  variants: {
    type: {
      DISPLAY: 'bg-sky-400/15 text-sky-300',
      VIDEO: 'bg-rose-400/15 text-rose-300',
      NATIVE: 'bg-emerald-400/15 text-emerald-300',
      NEWSLETTER: 'bg-violet-400/15 text-violet-300',
      PODCAST: 'bg-amber-400/15 text-amber-300',
    },
  },
  defaultVariants: { type: 'DISPLAY' },
});

export const publisherEmptyStateTv = tv({
  slots: {
    root: 'rounded-xl border border-dashed border-slate-700 bg-slate-900/50 px-6 py-14 text-center',
    iconWrap: 'mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sky-500/10',
    icon: 'text-2xl font-light text-sky-400',
    title: 'text-lg font-semibold text-white',
    body: 'mt-2 max-w-sm mx-auto text-sm text-slate-400',
    cta: 'mt-6 inline-flex items-center justify-center rounded-lg bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white transition-[transform,colors] duration-200 ease-out hover:bg-sky-400 active:scale-[0.99]',
  },
});

export const publisherFormTv = tv({
  slots: {
    dialog: 'rounded-2xl border border-slate-700 bg-slate-900 p-0 shadow-[--shadow-lg]',
    root: 'space-y-5 p-6 sm:p-8',
    header: 'flex items-center justify-between border-b border-slate-700 pb-4',
    title: 'text-lg font-semibold text-white',
    closeButton:
      'flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-[transform,colors] duration-200 ease-out hover:bg-slate-800 hover:text-white active:scale-95',
    subtitle: 'mt-1 text-sm text-slate-500',
    fieldGrid: 'grid grid-cols-1 gap-4 sm:grid-cols-2',
    errorBanner: 'rounded-lg border border-red-500/30 bg-red-950/50 p-3 text-sm text-red-200',
    label: 'mb-1.5 block text-sm font-medium text-slate-300',
    requiredMark: 'text-red-400',
    input:
      'w-full rounded-lg border border-slate-600 bg-slate-950/80 px-3 py-2.5 text-sm text-white shadow-inner placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30',
    footer: 'flex flex-wrap gap-3 border-t border-slate-700 pt-4',
    cancelButton:
      'rounded-lg border border-slate-600 px-4 py-2.5 text-sm font-medium text-slate-200 transition-[transform,colors] duration-200 ease-out hover:border-slate-500 hover:bg-slate-800 active:scale-[0.99]',
    fieldError: 'mt-1.5 text-xs text-red-400',
  },
});

export const adSlotStatusLineTv = tv({
  base: 'inline-flex items-center gap-2 text-sm font-medium',
  variants: {
    available: {
      true: 'text-emerald-400',
      false: 'text-slate-500',
    },
  },
  defaultVariants: {
    available: false,
  },
});

export const adSlotStatusDotTv = tv({
  base: 'h-2 w-2 shrink-0 rounded-full',
  variants: {
    available: {
      true: 'bg-emerald-400',
      false: 'bg-slate-600',
    },
  },
  defaultVariants: {
    available: false,
  },
});

export const adSlotDescriptionEmptyTv = tv({
  base: 'italic text-slate-500',
});

export const publisherAdSlotListTv = tv({
  slots: {
    root: 'space-y-6',
    formWrap: 'max-w-2xl',
    cardGrid: 'grid grid-cols-1 gap-y-12 md:grid-cols-3 md:gap-x-12 md:gap-y-16',
    editFormRow: 'md:col-span-3',
  },
});

export const publisherLoadingTv = tv({
  slots: {
    root: 'space-y-8',
    headerTitle: 'h-9 w-48 animate-pulse rounded bg-slate-800',
    headerSubtitle: 'mt-2 h-4 w-72 max-w-full animate-pulse rounded bg-slate-800/70',
    statsRow: 'flex flex-wrap gap-x-8 gap-y-2 border-b border-slate-800/80 pb-6',
    statItem: 'h-5 w-36 animate-pulse rounded bg-slate-800',
    toolbarEnd: 'flex justify-end',
    toolbarBtn: 'h-5 w-32 animate-pulse rounded bg-slate-800',
    cardGrid: 'grid grid-cols-1 gap-y-12 md:grid-cols-3 md:gap-x-12 md:gap-y-16',
  },
});

export const publisherSkeletonCardTv = tv({
  slots: {
    root: 'animate-pulse space-y-4 py-2',
    topRow: 'flex justify-between gap-3',
    titleBar: 'h-6 w-40 rounded bg-slate-800',
    badge: 'h-5 w-16 rounded-full bg-slate-800',
    lineStack: 'space-y-2',
    lineFull: 'h-3 w-full rounded bg-slate-800/80',
    linePart: 'h-3 w-4/5 rounded bg-slate-800/80',
    metaRow: 'flex justify-between',
    metaLeft: 'h-4 w-24 rounded bg-slate-800',
    metaRight: 'h-6 w-20 rounded bg-slate-800',
    actionsSection: 'border-t border-slate-800 pt-4',
    actionsRow: 'flex gap-6',
    actionA: 'h-4 w-10 rounded bg-slate-800',
    actionB: 'h-4 w-14 rounded bg-slate-800',
  },
});

export const publisherErrorTv = tv({
  slots: {
    root: 'flex min-h-[40vh] items-center justify-center px-4',
    panel: 'w-full max-w-md rounded-xl border border-slate-700 bg-slate-900/80 p-8 text-center shadow-lg',
    iconWrap: 'mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/15',
    icon: 'text-lg font-semibold text-red-400',
    title: 'mb-2 text-lg font-semibold text-white',
    body: 'mb-6 text-sm text-slate-400',
    retry:
      'rounded-lg bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white transition-[transform,colors] duration-200 ease-out hover:bg-sky-400 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400',
  },
});
