import { tv } from 'tailwind-variants';

export const toastContainerTv = tv({
  base: 'pointer-events-none fixed bottom-0 right-0 z-100 flex flex-col items-end gap-2 p-4 sm:p-6',
});

export const toastItemTv = tv({
  base: 'pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border p-4 shadow-lg',
  variants: {
    type: {
      success:
        'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-200',
      error:
        'border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950/80 dark:text-red-200',
      info: 'border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950/80 dark:text-blue-200',
    },
  },
  defaultVariants: { type: 'info' },
});

export const toastIconTv = tv({
  base: 'mt-0.5 h-5 w-5 shrink-0',
});

export const toastMessageTv = tv({
  base: 'flex-1 text-sm font-medium',
});

export const toastDismissTv = tv({
  base: 'ml-auto -mr-1 -mt-1 shrink-0 rounded-lg p-1 opacity-60 transition-opacity hover:opacity-100',
});
