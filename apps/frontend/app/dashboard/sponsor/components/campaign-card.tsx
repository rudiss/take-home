'use client';

import type { Campaign } from '@/lib/types';
import { DeleteButton } from '../../components/delete-button';
import { deleteCampaignAction } from '../actions';
import { campaignCardTv, campaignStatusBadgeTv } from '../sponsor-dashboard.styles';

interface CampaignCardProps {
  campaign: Campaign;
  onEdit: (campaign: Campaign) => void;
}

export function CampaignCard({ campaign, onEdit }: Readonly<CampaignCardProps>) {
  const budget = Number(campaign.budget);
  const spent = Number(campaign.spent);
  const progress = budget > 0 ? (spent / budget) * 100 : 0;
  const progressClamped = Math.min(progress, 100);
  const card = campaignCardTv();

  return (
    <article className={card.root()}>
      <div className={card.topRow()}>
        <h3 className={card.title()}>{campaign.name}</h3>
        <span className={campaignStatusBadgeTv({ status: campaign.status })}>
          {campaign.status.replace('_', ' ')}
        </span>
      </div>

      {campaign.description && (
        <p className={card.description()}>{campaign.description}</p>
      )}

      <div className={card.budgetBlock()}>
        <div className={card.budgetLabels()}>
          <span className={card.budgetLabel()}>Budget</span>
          <span className={card.budgetValue()}>
            ${spent.toLocaleString()} / ${budget.toLocaleString()}
          </span>
        </div>
        <div className={card.progressTrack()}>
          <div
            className={card.progressFill()}
            style={{ width: `${progressClamped}%` }}
          />
        </div>
      </div>

      <p className={card.dateLine()}>
        {new Date(campaign.startDate).toLocaleDateString()} &ndash;{' '}
        {new Date(campaign.endDate).toLocaleDateString()}
      </p>

      <div className={card.actions()}>
        <button type="button" onClick={() => onEdit(campaign)} className={card.editButton()}>
          Edit
        </button>
        <DeleteButton action={deleteCampaignAction} id={campaign.id} itemLabel={campaign.name} />
      </div>
    </article>
  );
}
