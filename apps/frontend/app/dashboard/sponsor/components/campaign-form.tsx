'use client';

import { useActionState, useEffect, useRef } from 'react';
import type { Campaign } from '@/lib/types';
import type { DashboardActionState } from '../../action-types';
import { createCampaignAction, updateCampaignAction } from '../actions';
import { SubmitButton } from '../../components/submit-button';
import { campaignFormTv } from '../sponsor-dashboard.styles';

interface CampaignFormProps {
  campaign?: Campaign;
  onClose: (succeeded?: boolean) => void;
}

function toDateInputValue(dateStr: string): string {
  return new Date(dateStr).toISOString().split('T')[0];
}

const initialState: DashboardActionState = {};

export function CampaignForm({ campaign, onClose }: Readonly<CampaignFormProps>) {
  const action = campaign ? updateCampaignAction : createCampaignAction;
  const [state, formAction] = useActionState(action, initialState);
  const form = campaignFormTv();
  const handledSuccessRef = useRef(false);

  useEffect(() => {
    if (state.success && !handledSuccessRef.current) {
      handledSuccessRef.current = true;
      onClose(true);
    }
  }, [state.success, onClose]);

  const handleClose = () => onClose();

  return (
    <form action={formAction} className={form.root()}>
      <div className={form.header()}>
        <h3 className={form.title()}>
          {campaign ? 'Edit Campaign' : 'New Campaign'}
        </h3>
        <button type="button" onClick={handleClose} className={form.closeButton()} aria-label="Close">
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      </div>

      {state.error && <div className={form.errorBanner()}>{state.error}</div>}

      {campaign && <input type="hidden" name="id" value={campaign.id} />}

      <div>
        <label htmlFor="name" className={form.label()}>
          Name
        </label>
        <input
          id="name"
          name="name"
          defaultValue={campaign?.name}
          placeholder="Campaign name"
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
          rows={2}
          defaultValue={campaign?.description}
          placeholder="Brief description..."
          className={form.input()}
        />
      </div>

      <div>
        <label htmlFor="budget" className={form.label()}>
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
          className={form.input()}
        />
        {state.fieldErrors?.budget && (
          <p className={form.fieldError()}>{state.fieldErrors.budget}</p>
        )}
      </div>

      <div className={form.dateGrid()}>
        <div>
          <label htmlFor="startDate" className={form.label()}>
            Start Date
          </label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            defaultValue={campaign ? toDateInputValue(campaign.startDate) : undefined}
            className={form.input()}
          />
          {state.fieldErrors?.startDate && (
            <p className={form.fieldError()}>{state.fieldErrors.startDate}</p>
          )}
        </div>
        <div>
          <label htmlFor="endDate" className={form.label()}>
            End Date
          </label>
          <input
            id="endDate"
            name="endDate"
            type="date"
            defaultValue={campaign ? toDateInputValue(campaign.endDate) : undefined}
            className={form.input()}
          />
          {state.fieldErrors?.endDate && (
            <p className={form.fieldError()}>{state.fieldErrors.endDate}</p>
          )}
        </div>
      </div>

      {campaign && (
        <div>
          <label htmlFor="status" className={form.label()}>
            Status
          </label>
          <select id="status" name="status" defaultValue={campaign.status} className={form.input()}>
            <option value="DRAFT">Draft</option>
            <option value="PENDING_REVIEW">Pending review</option>
            <option value="APPROVED">Approved</option>
            <option value="ACTIVE">Active</option>
            <option value="PAUSED">Paused</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
          {state.fieldErrors?.status && (
            <p className={form.fieldError()}>{state.fieldErrors.status}</p>
          )}
        </div>
      )}

      <div className={form.footer()}>
        <SubmitButton label={campaign ? 'Update' : 'Create'} pendingLabel="Saving..." />
        <button type="button" onClick={handleClose} className={form.cancelButton()}>
          Cancel
        </button>
      </div>
    </form>
  );
}
