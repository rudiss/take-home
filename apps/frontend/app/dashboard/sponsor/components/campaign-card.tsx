'use client';

import type { Campaign } from '@/lib/types';
import { DeleteButton } from '../../components/delete-button';
import { deleteCampaignAction } from '../actions';

interface CampaignCardProps {
  campaign: Campaign;
  onEdit: (campaign: Campaign) => void;
}

const statusColors: Record<string, string> = {
  DRAFT: 'bg-gray-100 text-gray-600',
  PENDING_REVIEW: 'bg-amber-100 text-amber-800',
  APPROVED: 'bg-cyan-100 text-cyan-800',
  ACTIVE: 'bg-green-100 text-green-700',
  PAUSED: 'bg-yellow-100 text-yellow-700',
  COMPLETED: 'bg-blue-100 text-blue-700',
  CANCELLED: 'bg-red-100 text-red-700',
};

export function CampaignCard({ campaign, onEdit }: Readonly<CampaignCardProps>) {
  const budget = Number(campaign.budget);
  const spent = Number(campaign.spent);
  const progress = budget > 0 ? (spent / budget) * 100 : 0;
  const progressRounded = Math.round(Math.min(progress, 100));
  const titleId = `campaign-card-${campaign.id}-title`;

  return (
    <article
      className="rounded-lg border border-[--color-border] p-4"
      aria-labelledby={titleId}
    >
      <div className="mb-2 flex items-start justify-between">
        <h3 id={titleId} className="text-base font-semibold">
          {campaign.name}
        </h3>
        <span
          className={`rounded px-2 py-0.5 text-xs ${statusColors[campaign.status] || 'bg-gray-100'}`}
        >
          {campaign.status}
        </span>
      </div>

      {campaign.description && (
        <p className="mb-3 text-sm text-[--color-muted] line-clamp-2">{campaign.description}</p>
      )}

      <div className="mb-2">
        <div className="flex justify-between text-sm">
          <span className="text-[--color-muted]">Budget</span>
          <span>
            ${spent.toLocaleString()} / ${budget.toLocaleString()}
          </span>
        </div>
        <div
          className="mt-1 h-1.5 rounded-full bg-gray-200"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progressRounded}
          aria-label={`Budget usage: ${progressRounded} percent spent`}
        >
          <div
            className="h-1.5 rounded-full bg-[--color-primary]"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>

      <div className="mb-3 text-xs text-[--color-muted]">
        {new Date(campaign.startDate).toLocaleDateString()} -{' '}
        {new Date(campaign.endDate).toLocaleDateString()}
      </div>

      <div className="flex items-center gap-3 border-t border-[--color-border] pt-3">
        <button
          type="button"
          onClick={() => onEdit(campaign)}
          className="text-sm text-[--color-primary] hover:underline"
        >
          Edit
        </button>
        <DeleteButton action={deleteCampaignAction} id={campaign.id} itemLabel={campaign.name} />
      </div>
    </article>
  );
}
