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
  },
});

export const newSlotTriggerTv = tv({
  base: 'inline-flex items-center gap-1.5 text-sm font-semibold text-white underline decoration-slate-500 underline-offset-4 transition-colors hover:text-sky-300 hover:decoration-sky-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950',
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
    root: 'flex h-full flex-col space-y-4 py-2',
    topRow: 'flex items-start justify-between gap-3',
    title: 'min-w-0 flex-1 text-base font-bold leading-snug text-white sm:text-lg',
    description: 'min-h-[3.5rem] text-sm leading-relaxed text-slate-400 line-clamp-3 sm:line-clamp-4',
    metaRow: 'flex flex-wrap items-center justify-between gap-3',
    statusLine: 'inline-flex items-center gap-2 text-sm font-medium',
    statusDot: 'h-2 w-2 shrink-0 rounded-full',
    priceBlock: 'text-right',
    priceMain: 'text-lg font-bold text-white sm:text-xl',
    priceSuffix: 'text-sm font-normal text-slate-500',
    actionSection: 'mt-auto border-t border-slate-800 pt-4',
    actionsRow: 'flex flex-wrap items-center gap-6',
    editButton:
      'text-sm font-medium text-white transition-colors hover:text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950',
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
    cta: 'mt-6 inline-flex items-center justify-center rounded-lg bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sky-400',
  },
});

export const publisherFormTv = tv({
  slots: {
    root: 'space-y-5 rounded-xl border border-slate-700 bg-slate-900/60 p-6 shadow-lg backdrop-blur-sm sm:p-8',
    header: 'border-b border-slate-700 pb-4',
    title: 'text-lg font-semibold text-white',
    errorBanner: 'rounded-lg border border-red-500/30 bg-red-950/50 p-3 text-sm text-red-200',
    label: 'mb-1.5 block text-sm font-medium text-slate-300',
    input:
      'w-full rounded-lg border border-slate-600 bg-slate-950/80 px-3 py-2.5 text-sm text-white shadow-inner placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30',
    footer: 'flex flex-wrap gap-3 border-t border-slate-700 pt-4',
    cancelButton:
      'rounded-lg border border-slate-600 px-4 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-800',
    fieldError: 'mt-1.5 text-xs text-red-400',
  },
});
