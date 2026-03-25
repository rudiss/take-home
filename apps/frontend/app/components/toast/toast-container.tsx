'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useToast } from './toast-context';
import type { ToastType } from './toast-context';
import {
  toastContainerTv,
  toastDismissTv,
  toastIconTv,
  toastItemTv,
  toastMessageTv,
} from './toast.styles';

function ToastIcon({ type }: Readonly<{ type: ToastType }>) {
  const className = toastIconTv();

  if (type === 'success') {
    return (
      <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  }

  if (type === 'error') {
    return (
      <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
          clipRule="evenodd"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className={toastContainerTv()} aria-live="polite" aria-label="Notifications">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className={toastItemTv({ type: toast.type })}
            role={toast.type === 'error' ? 'alert' : 'status'}
          >
            <ToastIcon type={toast.type} />
            <p className={toastMessageTv()}>{toast.message}</p>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className={toastDismissTv()}
              aria-label="Dismiss"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
