'use client';

import { useState, useCallback, useRef, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Campaign } from '@/lib/types';
import { useToast } from '@/app/components/toast';
import { closeDialogAnimated } from '../../utils/close-dialog';
import { CampaignCard } from './campaign-card';
import { CampaignForm } from './campaign-form';
import { campaignListTv, campaignFormTv } from '../sponsor-dashboard.styles';

type DialogMode = null | 'create' | Campaign;

interface CampaignListProps {
  campaigns: Campaign[];
}

type StatusFilter = '' | Campaign['status'];
type SortKey = 'newest' | 'budget-desc' | 'name-asc';

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: '', label: 'All statuses' },
  { value: 'DRAFT', label: 'Draft' },
  { value: 'PENDING_REVIEW', label: 'Pending review' },
  { value: 'APPROVED', label: 'Approved' },
  { value: 'ACTIVE', label: 'Active' },
  { value: 'PAUSED', label: 'Paused' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'CANCELLED', label: 'Cancelled' },
];

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'newest', label: 'Newest first' },
  { value: 'budget-desc', label: 'Budget (high → low)' },
  { value: 'name-asc', label: 'Name A → Z' },
];

function applyFilterAndSort(
  campaigns: Campaign[],
  statusFilter: StatusFilter,
  sortKey: SortKey,
): Campaign[] {
  let filtered = campaigns;
  if (statusFilter) {
    filtered = campaigns.filter((c) => c.status === statusFilter);
  }

  return [...filtered].sort((a, b) => {
    switch (sortKey) {
      case 'budget-desc':
        return Number(b.budget) - Number(a.budget);
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'newest':
      default:
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    }
  });
}

export function CampaignList({ campaigns }: Readonly<CampaignListProps>) {
  const [dialogMode, setDialogMode] = useState<DialogMode>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('');
  const [sortKey, setSortKey] = useState<SortKey>('newest');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { addToast } = useToast();

  const openDialog = useCallback((mode: DialogMode) => {
    setDialogMode(mode);
    requestAnimationFrame(() => dialogRef.current?.showModal());
  }, []);

  const closeDialog = useCallback(
    (succeeded?: boolean) => {
      if (succeeded && dialogMode !== null) {
        const action = dialogMode === 'create' ? 'created' : 'updated';
        addToast(`Campaign ${action}`, 'success');
      }
      closeDialogAnimated(dialogRef, () => setDialogMode(null));
    },
    [dialogMode, addToast],
  );

  const handleEdit = useCallback(
    (campaign: Campaign) => openDialog(campaign),
    [openDialog],
  );

  const handleDeleted = useCallback(() => {
    addToast('Campaign deleted', 'success');
  }, [addToast]);

  const list = campaignListTv();
  const form = campaignFormTv();
  const editingCampaign = dialogMode !== null && dialogMode !== 'create' ? dialogMode : undefined;

  const visibleCampaigns = useMemo(
    () => applyFilterAndSort(campaigns, statusFilter, sortKey),
    [campaigns, statusFilter, sortKey],
  );

  return (
    <div className={list.root()}>
      <div className={list.toolbar()}>
        <div className={list.filterGroup()}>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            className={list.filterSelect()}
            aria-label="Filter by status"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className={list.filterSelect()}
            aria-label="Sort campaigns"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {statusFilter && (
            <span className={list.activeFilterCount()}>
              {visibleCampaigns.length} of {campaigns.length}
            </span>
          )}
        </div>
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
      ) : visibleCampaigns.length === 0 ? (
        <p className="py-8 text-center text-sm text-(--color-muted)">
          No campaigns match the current filter.
        </p>
      ) : (
        <div className={list.cardGrid()}>
          <AnimatePresence mode="popLayout">
            {visibleCampaigns.map((campaign, i) => (
              <motion.div
                key={campaign.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0, transition: { delay: Math.min(i, 6) * 0.05 } }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              >
                <CampaignCard
                  campaign={campaign}
                  onEdit={handleEdit}
                  onDeleted={handleDeleted}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {dialogMode !== null && (
        <dialog ref={dialogRef} className={form.dialog()}>
          <CampaignForm
            key={editingCampaign?.id ?? 'create'}
            campaign={editingCampaign}
            onClose={closeDialog}
          />
        </dialog>
      )}
    </div>
  );
}
