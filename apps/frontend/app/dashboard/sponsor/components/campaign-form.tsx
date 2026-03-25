'use client';

import { useActionState, useEffect } from 'react';
import type { Campaign } from '@/lib/types';
import type { DashboardActionState } from '../../action-types';
import { createCampaignAction, updateCampaignAction } from '../actions';
import { SubmitButton } from '../../components/submit-button';

interface CampaignFormProps {
  campaign?: Campaign;
  onClose: () => void;
}

function toDateInputValue(dateStr: string): string {
  return new Date(dateStr).toISOString().split('T')[0];
}

const initialState: DashboardActionState = {};

export function CampaignForm({ campaign, onClose }: Readonly<CampaignFormProps>) {
  const action = campaign ? updateCampaignAction : createCampaignAction;
  const [state, formAction] = useActionState(action, initialState);

  useEffect(() => {
    if (state.success) onClose();
  }, [state.success, onClose]);

  const inputClass =
    'w-full rounded-lg border border-[--color-border] bg-[--color-background] px-3 py-2.5 text-sm transition-colors placeholder:text-[--color-muted]';

  return (
    <form
      action={formAction}
      className="space-y-5 rounded-xl bg-[--color-background] p-6 shadow-[--shadow-card]"
    >
      <div className="border-b border-[--color-border] pb-4">
        <h3 className="text-lg font-semibold">
          {campaign ? 'Edit Campaign' : 'New Campaign'}
        </h3>
      </div>

      {state.error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{state.error}</div>
      )}

      {campaign && <input type="hidden" name="id" value={campaign.id} />}

      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          defaultValue={campaign?.name}
          placeholder="Campaign name"
          className={inputClass}
        />
        {state.fieldErrors?.name && (
          <p className="mt-1.5 text-xs text-red-600">{state.fieldErrors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="mb-1.5 block text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={2}
          defaultValue={campaign?.description}
          placeholder="Brief description..."
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="budget" className="mb-1.5 block text-sm font-medium">
          Budget ($)
        </label>
        <input
          id="budget"
          name="budget"
          type="number"
          min="0"
          step="0.01"
          defaultValue={campaign ? Number(campaign.budget) : undefined}
          placeholder="0.00"
          className={inputClass}
        />
        {state.fieldErrors?.budget && (
          <p className="mt-1.5 text-xs text-red-600">{state.fieldErrors.budget}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="startDate" className="mb-1.5 block text-sm font-medium">
            Start Date
          </label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            defaultValue={campaign ? toDateInputValue(campaign.startDate) : undefined}
            className={inputClass}
          />
          {state.fieldErrors?.startDate && (
            <p className="mt-1.5 text-xs text-red-600">{state.fieldErrors.startDate}</p>
          )}
        </div>
        <div>
          <label htmlFor="endDate" className="mb-1.5 block text-sm font-medium">
            End Date
          </label>
          <input
            id="endDate"
            name="endDate"
            type="date"
            defaultValue={campaign ? toDateInputValue(campaign.endDate) : undefined}
            className={inputClass}
          />
          {state.fieldErrors?.endDate && (
            <p className="mt-1.5 text-xs text-red-600">{state.fieldErrors.endDate}</p>
          )}
        </div>
      </div>

      {campaign && (
        <div>
          <label htmlFor="status" className="mb-1.5 block text-sm font-medium">
            Status
          </label>
          <select id="status" name="status" defaultValue={campaign.status} className={inputClass}>
            <option value="DRAFT">Draft</option>
            <option value="PENDING_REVIEW">Pending review</option>
            <option value="APPROVED">Approved</option>
            <option value="ACTIVE">Active</option>
            <option value="PAUSED">Paused</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
          {state.fieldErrors?.status && (
            <p className="mt-1.5 text-xs text-red-600">{state.fieldErrors.status}</p>
          )}
        </div>
      )}

      <div className="flex gap-3 border-t border-[--color-border] pt-4">
        <SubmitButton label={campaign ? 'Update' : 'Create'} pendingLabel="Saving..." />
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-[--color-border] px-4 py-2.5 text-sm font-medium transition-colors hover:bg-[--color-surface]"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
