import type { RefObject } from 'react';

const CLOSING_ATTR = 'data-closing';
const ANIMATION_MS = 180;

/**
 * Animate a native `<dialog>` out before closing it.
 * Sets `[data-closing]` to trigger a CSS exit animation,
 * then calls `.close()` after the animation finishes.
 */
export function closeDialogAnimated(
  ref: RefObject<HTMLDialogElement | null>,
  onClosed?: () => void,
): void {
  const dialog = ref.current;
  if (!dialog || !dialog.open) {
    onClosed?.();
    return;
  }

  // Respect reduced motion
  const prefersReduced = globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    dialog.close();
    onClosed?.();
    return;
  }

  dialog.setAttribute(CLOSING_ATTR, '');

  const cleanup = () => {
    dialog.removeAttribute(CLOSING_ATTR);
    dialog.close();
    onClosed?.();
  };

  // Fallback timeout in case animationend doesn't fire
  const timer = setTimeout(cleanup, ANIMATION_MS + 50);

  dialog.addEventListener(
    'animationend',
    () => {
      clearTimeout(timer);
      cleanup();
    },
    { once: true },
  );
}
