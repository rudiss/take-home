'use client';

import { useState, useCallback } from 'react';
import type { Campaign } from '@/lib/types';
import { CampaignCard } from './campaign-card';
import { CampaignForm } from './campaign-form';

interface CampaignListProps {
  campaigns: Campaign[];
  'aria-labelledby'?: string;
}

export function CampaignList({
  campaigns,
  'aria-labelledby': labelledBy,
}: Readonly<CampaignListProps>) {
  const [showCreate, setShowCreate] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);

  const handleCloseCreate = useCallback(() => setShowCreate(false), []);
  const handleCloseEdit = useCallback(() => setEditingCampaign(null), []);
  const handleEdit = useCallback((campaign: Campaign) => {
    setShowCreate(false);
    setEditingCampaign(campaign);
  }, []);

  return (
    <section className="space-y-4" aria-labelledby={labelledBy}>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => {
            setEditingCampaign(null);
            setShowCreate(!showCreate);
          }}
          className="rounded bg-[--color-primary] px-4 py-2 text-sm font-medium text-white hover:bg-[--color-primary-hover]"
        >
          {showCreate ? 'Cancel' : '+ New Campaign'}
        </button>
      </div>

      {showCreate && <CampaignForm onClose={handleCloseCreate} />}

      {campaigns.length === 0 && !showCreate ? (
        <div className="rounded-lg border border-dashed border-[--color-border] p-8 text-center text-[--color-muted]">
          No campaigns yet. Create your first campaign to get started.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((campaign) =>
            editingCampaign?.id === campaign.id ? (
              <CampaignForm
                key={campaign.id}
                campaign={campaign}
                onClose={handleCloseEdit}
              />
            ) : (
              <CampaignCard key={campaign.id} campaign={campaign} onEdit={handleEdit} />
            ),
          )}
        </div>
      )}
    </section>
  );
}
