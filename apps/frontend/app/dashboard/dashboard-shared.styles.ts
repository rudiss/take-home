import { tv } from 'tailwind-variants';

export const deleteButtonTriggerTv = tv({
  base: 'text-sm transition-colors focus:outline-none',
  variants: {
    tone: {
      default: 'text-red-600 hover:text-red-800',
      dark: 'font-medium text-red-400 hover:text-red-300 focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950',
    },
  },
  defaultVariants: {
    tone: 'default',
  },
});

export const deleteDialogTv = tv({
  slots: {
    root: 'z-[200] rounded-xl border border-(--color-border) bg-(--color-background) p-6 shadow-[--shadow-lg]',
    title: 'text-lg font-semibold text-(--color-foreground)',
    description: 'mt-2 text-sm text-(--color-muted)',
    form: 'mt-6 flex items-center justify-end gap-3',
    cancel:
      'rounded-lg border border-(--color-border) px-4 py-2 text-sm font-medium transition-colors hover:bg-(--color-surface)',
    submit:
      'rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50',
    error: 'mt-2 text-xs text-red-600',
  },
});

export const submitButtonTv = tv({
  base: 'rounded-lg px-5 py-2.5 text-sm transition-colors disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
  variants: {
    variant: {
      primary:
        'font-medium bg-(--color-primary) text-white hover:bg-(--color-primary-hover) focus-visible:outline-(--color-primary)',
      sky: 'font-semibold bg-sky-500 text-white hover:bg-sky-400 focus-visible:outline-sky-500',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});
