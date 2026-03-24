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
}

export function DeleteButton({
  action,
  id,
  label = 'Delete',
  itemLabel,
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
        className="text-sm text-red-600 hover:text-red-800"
        onClick={() => dialogRef.current?.showModal()}
      >
        {label}
      </button>

      <dialog
        ref={dialogRef}
        className="z-[200] rounded-lg border border-[--color-border] bg-[--color-background] p-4 shadow-xl"
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

        <form action={formAction} className="mt-4 flex flex-wrap items-center justify-end gap-2">
          <input type="hidden" name="id" value={id} />
          <button
            type="button"
            className="rounded border border-[--color-border] px-3 py-1.5 text-sm hover:bg-gray-50"
            onClick={() => dialogRef.current?.close()}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={pending}
            aria-busy={pending}
            className="rounded bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700 disabled:opacity-50"
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
