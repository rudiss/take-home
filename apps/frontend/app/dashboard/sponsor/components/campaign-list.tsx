'use client';

import { useState, useCallback } from 'react';
import type { Campaign } from '@/lib/types';
import { CampaignCard } from './campaign-card';
import { CampaignForm } from './campaign-form';

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

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => {
            setEditingCampaign(null);
            setShowCreate(!showCreate);
          }}
          className="rounded-lg bg-[--color-primary] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[--color-primary-hover]"
        >
          {showCreate ? 'Cancel' : '+ New Campaign'}
        </button>
      </div>

      {showCreate && <CampaignForm onClose={handleCloseCreate} />}

      {campaigns.length === 0 && !showCreate ? (
        <div className="rounded-xl bg-[--color-background] p-12 text-center shadow-[--shadow-card]">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[--color-primary]/10">
            <span className="text-xl text-[--color-primary]">+</span>
          </div>
          <h3 className="mb-1 font-semibold">No campaigns yet</h3>
          <p className="text-sm text-[--color-muted]">
            Create your first campaign to get started.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
