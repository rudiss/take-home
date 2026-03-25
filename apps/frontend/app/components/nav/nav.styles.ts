import { tv } from 'tailwind-variants';

export const navHeader = tv({
  base: 'sticky top-0 z-50 border-b border-[--color-border] bg-[--color-background]/90 shadow-sm backdrop-blur-md supports-backdrop-filter:bg-[--color-background]/80',
});

export const navBar = tv({
  base: 'mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6',
});

export const navBrandRoot = tv({
  base: 'flex min-w-0 items-center gap-3',
});

export const navBrandLink = tv({
  base: 'group flex shrink-0 items-center gap-2 rounded-lg py-1 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]',
});

export const navBrandMark = tv({
  base: 'flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-[--color-primary] to-indigo-600 text-sm font-bold text-white shadow-sm',
});

export const navBrandTextCol = tv({
  base: 'flex flex-col leading-none',
});

export const navBrandTitle = tv({
  base: 'text-base font-bold tracking-tight text-[--color-foreground] sm:text-lg',
});

export const navBrandSubtitle = tv({
  base: 'hidden text-[10px] font-medium uppercase tracking-wider text-[--color-muted] sm:block',
});

export const navLink = tv({
  base: 'rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]',
  variants: {
    active: {
      true: 'bg-[--color-primary]/12 text-[--color-primary]',
      false: 'text-[--color-muted] hover:bg-[--color-surface] hover:text-[--color-foreground]',
    },
  },
  defaultVariants: {
    active: false,
  },
});

export const navPrimaryLinksRoot = tv({
  base: '',
  variants: {
    layout: {
      desktop: 'hidden items-center gap-0.5 md:flex',
      mobile: 'flex flex-col gap-1',
    },
  },
  defaultVariants: {
    layout: 'mobile',
  },
});

export const navGuestAuthRoot = tv({
  base: '',
  variants: {
    layout: {
      desktop: 'hidden items-center gap-2 md:flex',
      mobileSheet: 'mt-4 flex flex-col gap-2 border-t border-[--color-border] pt-4',
    },
  },
});

export const navGuestMutedLink = tv({
  base: 'rounded-lg px-3 py-2 text-sm font-medium text-[--color-muted] transition-colors hover:bg-[--color-surface] hover:text-[--color-foreground] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]',
});

export const navGuestPrimaryLink = tv({
  base: 'rounded-lg bg-[--color-primary] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[--color-primary-hover] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]',
});

export const navGuestMobileOutlineLink = tv({
  base: 'flex w-full items-center justify-center rounded-lg border border-[--color-border] py-2.5 text-sm font-medium focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]',
});

export const navGuestMobilePrimaryLink = tv({
  base: 'flex w-full items-center justify-center rounded-lg bg-[--color-primary] py-2.5 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]',
});

export const navSignOutButton = tv({
  base: 'text-sm font-medium focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]',
  variants: {
    variant: {
      desktop:
        'rounded-lg border border-[--color-border] px-3 py-2 text-[--color-muted] transition-colors hover:border-[--color-foreground]/20 hover:bg-[--color-surface] hover:text-[--color-foreground]',
      mobile: 'w-full rounded-lg border border-[--color-border] py-2.5 text-[--color-foreground]',
    },
  },
});

export const navUserAvatar = tv({
  base: 'flex shrink-0 items-center justify-center bg-[--color-primary]/15 text-xs font-semibold text-[--color-primary]',
  variants: {
    shape: {
      square: 'h-8 w-8 rounded-md',
      circle: 'h-9 w-9 rounded-full',
    },
  },
});

export const navUserDisplayName = tv({
  base: 'truncate text-sm font-medium text-[--color-foreground]',
});

export const navUserRoleLine = tv({
  base: 'text-xs capitalize text-[--color-muted]',
});

export const navUserSignedInLine = tv({
  base: 'text-xs text-[--color-muted]',
});

export const navAuthPending = tv({
  base: 'hidden h-9 w-24 animate-pulse rounded-lg bg-[--color-surface] md:block',
});

export const navDesktopAuthRow = tv({
  base: 'hidden items-center gap-3 md:flex',
});

export const navUserChip = tv({
  base: 'flex items-center gap-2 rounded-lg border border-[--color-border] bg-[--color-surface]/50 py-1 pl-1 pr-3',
});

export const navUserChipTextCol = tv({
  base: 'min-w-0 max-w-40',
});

export const navMobileTrailingRoot = tv({
  base: 'flex items-center gap-2 md:hidden',
});

export const navMobileCompactLogin = tv({
  base: 'rounded-lg bg-[--color-primary] px-3 py-2 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]',
});

export const navMenuButton = tv({
  base: 'inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[--color-border] text-[--color-foreground] transition-colors hover:bg-[--color-surface] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[--color-primary] md:hidden',
});

export const navMobileBackdrop = tv({
  base: 'fixed inset-0 z-40 bg-[--color-foreground]/15 backdrop-blur-[2px] md:hidden',
});

export const navMobileSheetPanel = tv({
  base: 'relative z-50 border-t border-[--color-border] bg-[--color-background] px-4 py-4 shadow-[--shadow-lg] md:hidden',
});

export const navMobileSheetSignedInSection = tv({
  base: 'mt-4 border-t border-[--color-border] pt-4',
});

export const navMobileSheetName = tv({
  base: 'mb-2 truncate text-sm font-medium text-[--color-foreground]',
});

export const navMobileSheetRole = tv({
  base: 'mb-3 text-xs capitalize text-[--color-muted]',
});

export const navIcon = tv({
  base: 'h-5 w-5',
});
