'use client';

import { useState, useCallback } from 'react';
import type { Campaign } from '@/lib/types';
import { CampaignCard } from './campaign-card';
import { CampaignForm } from './campaign-form';
import { campaignListTv } from '../sponsor-dashboard.styles';

interface CampaignListProps {
  campaigns: Campaign[];
}

export function CampaignList({ campaigns }: Readonly<CampaignListProps>) {
  const [showCreate, setShowCreate] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);

  const handleCloseCreate = useCallback(() => setShowCreate(false), []);
  const handleCloseEdit = useCallback(() => setEditingCampaign(null), []);
  const handleEdit = useCallback((campaign: Campaign) => {
    setShowCreate(false);
    setEditingCampaign(campaign);
  }, []);

  const list = campaignListTv();

  return (
    <div className={list.root()}>
      <div className={list.toolbar()}>
        <button
          type="button"
          onClick={() => {
            setEditingCampaign(null);
            setShowCreate(!showCreate);
          }}
          className={list.newButton()}
        >
          {showCreate ? 'Cancel' : '+ New Campaign'}
        </button>
      </div>

      {showCreate && <CampaignForm onClose={handleCloseCreate} />}

      {campaigns.length === 0 && !showCreate ? (
        <div className={list.emptyRoot()}>
          <div className={list.emptyIconWrap()}>
            <span className={list.emptyIcon()} aria-hidden>
              +
            </span>
          </div>
          <h3 className={list.emptyTitle()}>No campaigns yet</h3>
          <p className={list.emptyBody()}>
            Create your first campaign to get started.
          </p>
        </div>
      ) : (
        <div className={list.cardGrid()}>
          {campaigns.map((campaign) =>
            editingCampaign?.id === campaign.id ? (
              <CampaignForm key={campaign.id} campaign={campaign} onClose={handleCloseEdit} />
            ) : (
              <CampaignCard key={campaign.id} campaign={campaign} onEdit={handleEdit} />
            ),
          )}
        </div>
      )}
    </div>
  );
}
