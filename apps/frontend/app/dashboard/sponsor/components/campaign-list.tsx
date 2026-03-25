'use client';

import { useState, useCallback, useRef } from 'react';
import type { Campaign } from '@/lib/types';
import { CampaignCard } from './campaign-card';
import { CampaignForm } from './campaign-form';
import { campaignListTv, campaignFormTv } from '../sponsor-dashboard.styles';

type DialogMode = null | 'create' | Campaign;

interface CampaignListProps {
  campaigns: Campaign[];
}

export function CampaignList({ campaigns }: Readonly<CampaignListProps>) {
  const [dialogMode, setDialogMode] = useState<DialogMode>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDialog = useCallback((mode: DialogMode) => {
    setDialogMode(mode);
    // Use requestAnimationFrame so React renders the form before showing
    requestAnimationFrame(() => dialogRef.current?.showModal());
  }, []);

  const closeDialog = useCallback(() => {
    dialogRef.current?.close();
    setDialogMode(null);
  }, []);

  const handleEdit = useCallback((campaign: Campaign) => {
    openDialog(campaign);
  }, [openDialog]);

  const list = campaignListTv();
  const form = campaignFormTv();
  const editingCampaign = dialogMode !== null && dialogMode !== 'create' ? dialogMode : undefined;

  return (
    <div className={list.root()}>
      <div className={list.toolbar()}>
        <button
          type="button"
          onClick={() => openDialog('create')}
          className={list.newButton()}
        >
          + New Campaign
        </button>
      </div>

      {campaigns.length === 0 ? (
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
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} onEdit={handleEdit} />
          ))}
        </div>
      )}

      {/* Form dialog — single instance, re-keyed when target changes */}
      {dialogMode !== null && (
        <dialog ref={dialogRef} className={form.dialog()}>
          <CampaignForm
            key={editingCampaign?.id ?? 'create'}
            campaign={editingCampaign}
            onClose={closeDialog}
            dialogRef={dialogRef}
          />
        </dialog>
      )}
    </div>
  );
}
