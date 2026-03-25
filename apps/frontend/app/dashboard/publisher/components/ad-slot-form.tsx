'use client';

import { useActionState, useEffect, type RefObject } from 'react';
import type { AdSlot } from '@/lib/types';
import type { DashboardActionState } from '../../action-types';
import { createAdSlotAction, updateAdSlotAction } from '../actions';
import { SubmitButton } from '../../components/submit-button';
import { publisherFormTv } from '../publisher-dashboard.styles';

interface AdSlotFormProps {
  adSlot?: AdSlot;
  onClose: () => void;
  dialogRef?: RefObject<HTMLDialogElement | null>;
}

const initialState: DashboardActionState = {};

export function AdSlotForm({ adSlot, onClose, dialogRef }: Readonly<AdSlotFormProps>) {
  const action = adSlot ? updateAdSlotAction : createAdSlotAction;
  const [state, formAction] = useActionState(action, initialState);
  const form = publisherFormTv();

  useEffect(() => {
    if (state.success) {
      dialogRef?.current?.close();
      onClose();
    }
  }, [state.success, onClose, dialogRef]);

  const handleClose = () => {
    dialogRef?.current?.close();
    onClose();
  };

  return (
    <form action={formAction} className={form.root()}>
      <div className={form.header()}>
        <div>
          <h3 className={form.title()}>{adSlot ? 'Edit Ad Slot' : 'New Ad Slot'}</h3>
          <p className={form.subtitle()}>
            {adSlot
              ? 'Changes apply on the marketplace as soon as you save.'
              : 'Add a clear name and description so sponsors understand the placement.'}
          </p>
        </div>
        <button type="button" onClick={handleClose} className={form.closeButton()} aria-label="Close">
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      </div>

      {state.error && <div className={form.errorBanner()}>{state.error}</div>}

      {adSlot && <input type="hidden" name="id" value={adSlot.id} />}

      <div>
        <label htmlFor="name" className={form.label()}>
          Name <span className={form.requiredMark()}>*</span>
        </label>
        <input
          id="name"
          name="name"
          required
          defaultValue={adSlot?.name}
          placeholder="e.g. Header Banner"
          className={form.input()}
        />
        {state.fieldErrors?.name && (
          <p className={form.fieldError()}>{state.fieldErrors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className={form.label()}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={adSlot?.description}
          placeholder="What sponsors get — placement, audience, specs…"
          className={form.input()}
        />
      </div>

      <div className={form.fieldGrid()}>
        <div>
          <label htmlFor="type" className={form.label()}>
            Type <span className={form.requiredMark()}>*</span>
          </label>
          <select id="type" name="type" required defaultValue={adSlot?.type ?? ''} className={form.input()}>
            <option value="">Select type…</option>
            <option value="DISPLAY">Display</option>
            <option value="VIDEO">Video</option>
            <option value="NATIVE">Native</option>
            <option value="NEWSLETTER">Newsletter</option>
            <option value="PODCAST">Podcast</option>
          </select>
          {state.fieldErrors?.type && (
            <p className={form.fieldError()}>{state.fieldErrors.type}</p>
          )}
        </div>
        <div>
          <label htmlFor="basePrice" className={form.label()}>
            Base price ($/mo) <span className={form.requiredMark()}>*</span>
          </label>
          <input
            id="basePrice"
            name="basePrice"
            type="number"
            min="0"
            step="0.01"
            required
            defaultValue={adSlot ? Number(adSlot.basePrice) : undefined}
            placeholder="0.00"
            className={form.input()}
          />
          {state.fieldErrors?.basePrice && (
            <p className={form.fieldError()}>{state.fieldErrors.basePrice}</p>
          )}
        </div>
      </div>

      <div className={form.footer()}>
        <SubmitButton
          label={adSlot ? 'Save changes' : 'Create slot'}
          pendingLabel="Saving…"
          variant="sky"
        />
        <button type="button" onClick={handleClose} className={form.cancelButton()}>
          Cancel
        </button>
      </div>
    </form>
  );
}
