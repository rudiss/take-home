'use client';

import { useActionState, useEffect, useId, useRef } from 'react';
import type { DashboardActionState } from '../action-types';

interface DeleteButtonProps {
  action: (
    prevState: DashboardActionState,
    formData: FormData,
  ) => Promise<DashboardActionState>;
  id: string;
  label?: string;
  /** Accessible name for the item being deleted (optional). */
  itemLabel?: string;
  /** Override trigger button styles (e.g. dark dashboard). */
  triggerClassName?: string;
}

export function DeleteButton({
  action,
  id,
  label = 'Delete',
  itemLabel,
  triggerClassName,
}: Readonly<DeleteButtonProps>) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descId = useId();
  const [state, formAction, pending] = useActionState(action, {});

  useEffect(() => {
    if (state.success) {
      dialogRef.current?.close();
    }
  }, [state.success]);

  return (
    <>
      <button
        type="button"
        className={
          triggerClassName ?? 'text-sm text-red-600 hover:text-red-800'
        }
        onClick={() => dialogRef.current?.showModal()}
      >
        {label}
      </button>

      <dialog
        ref={dialogRef}
        className="z-[200] rounded-xl border border-[--color-border] bg-[--color-background] p-6 shadow-[--shadow-lg]"
        aria-labelledby={titleId}
        aria-describedby={descId}
      >
        <h2 id={titleId} className="text-lg font-semibold text-[--color-foreground]">
          Confirm delete
        </h2>
        <p id={descId} className="mt-2 text-sm text-[--color-muted]">
          {itemLabel
            ? `Delete “${itemLabel}”? This cannot be undone.`
            : 'Are you sure you want to delete this? This cannot be undone.'}
        </p>

        <form action={formAction} className="mt-6 flex items-center justify-end gap-3">
          <input type="hidden" name="id" value={id} />
          <button
            type="button"
            className="rounded-lg border border-[--color-border] px-4 py-2 text-sm font-medium transition-colors hover:bg-[--color-surface]"
            onClick={() => dialogRef.current?.close()}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={pending}
            aria-busy={pending}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
          >
            {pending ? 'Deleting…' : 'Delete'}
          </button>
        </form>
        {state.error && (
          <p className="mt-2 text-xs text-red-600" role="alert" aria-live="polite">
            {state.error}
          </p>
        )}
      </dialog>
    </>
  );
}
