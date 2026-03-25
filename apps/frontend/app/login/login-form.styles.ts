import { tv } from 'tailwind-variants';

export const page = tv({
  base: 'flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12',
});

export const card = tv({
  base: 'w-full max-w-sm rounded-2xl border border-(--color-border) bg-(--color-background) p-8 shadow-[--shadow-lg]',
});

export const logo = tv({
  base: 'mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-(--color-primary) to-indigo-500 text-lg font-bold text-white shadow-sm',
});

export const heading = tv({
  base: 'mt-4 text-center text-2xl font-bold tracking-tight text-(--color-foreground)',
});

export const subtitle = tv({
  base: 'mt-1 text-center text-sm text-(--color-muted)',
});

export const alert = tv({
  base: 'flex items-start gap-2 rounded-lg border p-3 text-sm',
  variants: {
    intent: {
      error: 'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300',
      info: 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300',
    },
  },
});

export const fieldLabel = tv({
  base: 'block text-sm font-medium text-(--color-foreground)',
});

export const roleOption = tv({
  base: 'flex cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 transition-colors',
  variants: {
    selected: {
      true: 'border-(--color-primary) bg-(--color-primary)/5',
      false: 'border-(--color-border) bg-(--color-background) hover:border-(--color-muted)/50',
    },
  },
});

export const roleIcon = tv({
  base: 'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
  variants: {
    role: {
      sponsor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300',
      publisher: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300',
    },
  },
});

export const submitButton = tv({
  base: 'flex w-full items-center justify-center gap-2 rounded-xl border border-(--color-primary-hover) bg-(--color-primary) px-4 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-(--color-primary-hover) hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary) active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50',
});

export const loginForm = tv({
  base: 'mt-6 space-y-5',
});

export const loginLegend = tv({
  base: 'mb-2 text-sm font-medium text-(--color-foreground)',
});

export const loginRadioGroup = tv({
  base: 'grid gap-2',
});

export const roleOptionContent = tv({
  base: 'min-w-0',
});

export const roleOptionLabel = tv({
  base: 'text-sm font-semibold text-(--color-foreground)',
});

export const roleOptionDescription = tv({
  base: 'text-xs text-(--color-muted)',
});

export const roleCheckIcon = tv({
  base: 'ml-auto h-5 w-5 shrink-0 text-(--color-primary)',
});

export const credentialsHint = tv({
  base: 'text-center text-xs text-(--color-muted)',
});

export const credentialsEmail = tv({
  base: 'font-medium',
});
