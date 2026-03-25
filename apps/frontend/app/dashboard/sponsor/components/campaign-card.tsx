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
  PENDING_REVIEW: 'bg-amber-100 text-amber-700',
  APPROVED: 'bg-cyan-100 text-cyan-700',
  ACTIVE: 'bg-emerald-100 text-emerald-700',
  PAUSED: 'bg-yellow-100 text-yellow-700',
  COMPLETED: 'bg-blue-100 text-blue-700',
  CANCELLED: 'bg-red-100 text-red-700',
};

export function CampaignCard({ campaign, onEdit }: Readonly<CampaignCardProps>) {
  const budget = Number(campaign.budget);
  const spent = Number(campaign.spent);
  const progress = budget > 0 ? (spent / budget) * 100 : 0;
  const progressClamped = Math.min(progress, 100);

  return (
    <article className="group rounded-xl bg-[--color-background] p-5 shadow-[--shadow-card] transition-shadow hover:shadow-[--shadow-card-hover]">
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className="text-base font-semibold leading-tight">{campaign.name}</h3>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[campaign.status] || 'bg-gray-100'}`}
        >
          {campaign.status.replace('_', ' ')}
        </span>
      </div>

      {campaign.description && (
        <p className="mb-4 text-sm leading-relaxed text-[--color-muted] line-clamp-2">
          {campaign.description}
        </p>
      )}

      <div className="mb-4">
        <div className="mb-1.5 flex justify-between text-sm">
          <span className="text-[--color-muted]">Budget</span>
          <span className="font-medium">
            ${spent.toLocaleString()} / ${budget.toLocaleString()}
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-2 rounded-full bg-[--color-primary] transition-all"
            style={{ width: `${progressClamped}%` }}
          />
        </div>
      </div>

      <p className="mb-4 text-xs text-[--color-muted]">
        {new Date(campaign.startDate).toLocaleDateString()} &ndash;{' '}
        {new Date(campaign.endDate).toLocaleDateString()}
      </p>

      <div className="flex items-center gap-3 border-t border-[--color-border] pt-3">
        <button
          type="button"
          onClick={() => onEdit(campaign)}
          className="text-sm font-medium text-[--color-primary] transition-colors hover:text-[--color-primary-hover]"
        >
          Edit
        </button>
        <DeleteButton action={deleteCampaignAction} id={campaign.id} itemLabel={campaign.name} />
      </div>
    </article>
  );
}
