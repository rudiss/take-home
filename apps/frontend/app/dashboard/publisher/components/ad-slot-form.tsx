'use client';

import { useActionState, useEffect } from 'react';
import type { AdSlot } from '@/lib/types';
import type { DashboardActionState } from '../../action-types';
import { createAdSlotAction, updateAdSlotAction } from '../actions';
import { SubmitButton } from '../../components/submit-button';

interface AdSlotFormProps {
  adSlot?: AdSlot;
  onClose: () => void;
}

const initialState: DashboardActionState = {};

export function AdSlotForm({ adSlot, onClose }: Readonly<AdSlotFormProps>) {
  const action = adSlot ? updateAdSlotAction : createAdSlotAction;
  const [state, formAction] = useActionState(action, initialState);

  useEffect(() => {
    if (state.success) onClose();
  }, [state.success, onClose]);

  return (
    <form action={formAction} className="space-y-4 rounded-lg border border-[--color-border] p-4">
      <h3 className="font-semibold">{adSlot ? 'Edit Ad Slot' : 'New Ad Slot'}</h3>

      {state.error && (
        <div className="rounded border border-red-200 bg-red-50 p-2 text-sm text-red-600">
          {state.error}
        </div>
      )}

      {adSlot && <input type="hidden" name="id" value={adSlot.id} />}

      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          defaultValue={adSlot?.name}
          className="w-full rounded border border-[--color-border] px-3 py-2 text-sm"
        />
        {state.fieldErrors?.name && (
          <p className="mt-1 text-xs text-red-600">{state.fieldErrors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="mb-1 block text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={2}
          defaultValue={adSlot?.description}
          className="w-full rounded border border-[--color-border] px-3 py-2 text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="type" className="mb-1 block text-sm font-medium">
            Type
          </label>
          <select
            id="type"
            name="type"
            defaultValue={adSlot?.type ?? ''}
            className="w-full rounded border border-[--color-border] px-3 py-2 text-sm"
          >
            <option value="">Select type...</option>
            <option value="DISPLAY">Display</option>
            <option value="VIDEO">Video</option>
            <option value="NATIVE">Native</option>
            <option value="NEWSLETTER">Newsletter</option>
            <option value="PODCAST">Podcast</option>
          </select>
          {state.fieldErrors?.type && (
            <p className="mt-1 text-xs text-red-600">{state.fieldErrors.type}</p>
          )}
        </div>
        <div>
          <label htmlFor="basePrice" className="mb-1 block text-sm font-medium">
            Base Price ($/mo)
          </label>
          <input
            id="basePrice"
            name="basePrice"
            type="number"
            min="0"
            step="0.01"
            defaultValue={adSlot ? Number(adSlot.basePrice) : undefined}
            className="w-full rounded border border-[--color-border] px-3 py-2 text-sm"
          />
          {state.fieldErrors?.basePrice && (
            <p className="mt-1 text-xs text-red-600">{state.fieldErrors.basePrice}</p>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <SubmitButton label={adSlot ? 'Update' : 'Create'} pendingLabel="Saving..." />
        <button
          type="button"
          onClick={onClose}
          className="rounded border border-[--color-border] px-4 py-2 text-sm hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
