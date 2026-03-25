'use client';

import { useActionState, useEffect, useId, useRef } from 'react';
import type { DashboardActionState } from '../action-types';
import { deleteButtonTriggerTv, deleteDialogTv } from '../dashboard-shared.styles';

interface DeleteButtonProps {
  action: (
    prevState: DashboardActionState,
    formData: FormData,
  ) => Promise<DashboardActionState>;
  id: string;
  label?: string;
  /** Accessible name for the item being deleted (optional). */
  itemLabel?: string;
  /** Light (default) or publisher dark dashboard trigger. Ignored if `triggerClassName` is set. */
  triggerTone?: 'default' | 'dark';
  /** Override trigger button styles (e.g. dark dashboard). */
  triggerClassName?: string;
}

export function DeleteButton({
  action,
  id,
  label = 'Delete',
  itemLabel,
  triggerTone = 'default',
  triggerClassName,
}: Readonly<DeleteButtonProps>) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descId = useId();
  const [state, formAction, pending] = useActionState(action, {});
  const dlg = deleteDialogTv();

  useEffect(() => {
    if (state.success) {
      dialogRef.current?.close();
    }
  }, [state.success]);

  const triggerClass =
    triggerClassName ?? deleteButtonTriggerTv({ tone: triggerTone });

  return (
    <>
      <button type="button" className={triggerClass} onClick={() => dialogRef.current?.showModal()}>
        {label}
      </button>

      <dialog
        ref={dialogRef}
        className={dlg.root()}
        aria-labelledby={titleId}
        aria-describedby={descId}
      >
        <h2 id={titleId} className={dlg.title()}>
          Confirm delete
        </h2>
        <p id={descId} className={dlg.description()}>
          {itemLabel
            ? `Delete “${itemLabel}”? This cannot be undone.`
            : 'Are you sure you want to delete this? This cannot be undone.'}
        </p>

        <form action={formAction} className={dlg.form()}>
          <input type="hidden" name="id" value={id} />
          <button
            type="button"
            className={dlg.cancel()}
            onClick={() => dialogRef.current?.close()}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={pending}
            aria-busy={pending}
            className={dlg.submit()}
          >
            {pending ? 'Deleting…' : 'Delete'}
          </button>
        </form>
        {state.error && (
          <p className={dlg.error()} role="alert" aria-live="polite">
            {state.error}
          </p>
        )}
      </dialog>
    </>
  );
}
