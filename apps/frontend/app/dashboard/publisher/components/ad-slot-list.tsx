'use client';

import { useState, useCallback, useRef, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { AdSlot } from '@/lib/types';
import { useToast } from '@/app/components/toast';
import { closeDialogAnimated } from '../../utils/close-dialog';
import { AdSlotCard } from './ad-slot-card';
import { AdSlotForm } from './ad-slot-form';
import {
  newSlotTriggerTv,
  publisherAdSlotListTv,
  publisherEmptyStateTv,
  publisherFormTv,
  publisherToolbarTv,
} from '../publisher-dashboard.styles';

type DialogMode = null | 'create' | AdSlot;
type TypeFilter = '' | AdSlot['type'];
type AvailFilter = '' | 'available' | 'booked';
type SortKey = 'price-desc' | 'price-asc' | 'name-asc';

const TYPE_OPTIONS: { value: TypeFilter; label: string }[] = [
  { value: '', label: 'All types' },
  { value: 'DISPLAY', label: 'Display' },
  { value: 'VIDEO', label: 'Video' },
  { value: 'NATIVE', label: 'Native' },
  { value: 'NEWSLETTER', label: 'Newsletter' },
  { value: 'PODCAST', label: 'Podcast' },
];

const AVAIL_OPTIONS: { value: AvailFilter; label: string }[] = [
  { value: '', label: 'Any status' },
  { value: 'available', label: 'Available' },
  { value: 'booked', label: 'Booked' },
];

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'price-desc', label: 'Price (high → low)' },
  { value: 'price-asc', label: 'Price (low → high)' },
  { value: 'name-asc', label: 'Name A → Z' },
];

function applyFilterAndSort(
  slots: AdSlot[],
  typeFilter: TypeFilter,
  availFilter: AvailFilter,
  sortKey: SortKey,
): AdSlot[] {
  let filtered = slots;
  if (typeFilter) filtered = filtered.filter((s) => s.type === typeFilter);
  if (availFilter === 'available') filtered = filtered.filter((s) => s.isAvailable);
  if (availFilter === 'booked') filtered = filtered.filter((s) => !s.isAvailable);

  return [...filtered].sort((a, b) => {
    switch (sortKey) {
      case 'price-asc':
        return Number(a.basePrice) - Number(b.basePrice);
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'price-desc':
      default:
        return Number(b.basePrice) - Number(a.basePrice);
    }
  });
}

interface AdSlotListProps {
  adSlots: AdSlot[];
}

export function AdSlotList({ adSlots }: Readonly<AdSlotListProps>) {
  const [dialogMode, setDialogMode] = useState<DialogMode>(null);
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('');
  const [availFilter, setAvailFilter] = useState<AvailFilter>('');
  const [sortKey, setSortKey] = useState<SortKey>('price-desc');
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
        addToast(`Ad slot ${action}`, 'success');
      }
      closeDialogAnimated(dialogRef, () => setDialogMode(null));
    },
    [dialogMode, addToast],
  );

  const handleEdit = useCallback(
    (adSlot: AdSlot) => openDialog(adSlot),
    [openDialog],
  );

  const handleDeleted = useCallback(() => {
    addToast('Ad slot deleted', 'success');
  }, [addToast]);

  const list = publisherAdSlotListTv();
  const toolbar = publisherToolbarTv();
  const empty = publisherEmptyStateTv();
  const formStyles = publisherFormTv();
  const editingSlot = dialogMode !== null && dialogMode !== 'create' ? dialogMode : undefined;
  const hasFilters = typeFilter !== '' || availFilter !== '';

  const visibleSlots = useMemo(
    () => applyFilterAndSort(adSlots, typeFilter, availFilter, sortKey),
    [adSlots, typeFilter, availFilter, sortKey],
  );

  return (
    <div className={list.root()}>
      <div className={toolbar.bar()}>
        <div className={toolbar.filterGroup()}>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as TypeFilter)}
            className={toolbar.filterSelect()}
            aria-label="Filter by type"
          >
            {TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <select
            value={availFilter}
            onChange={(e) => setAvailFilter(e.target.value as AvailFilter)}
            className={toolbar.filterSelect()}
            aria-label="Filter by availability"
          >
            {AVAIL_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className={toolbar.filterSelect()}
            aria-label="Sort ad slots"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {hasFilters && (
            <span className={toolbar.activeFilterCount()}>
              {visibleSlots.length} of {adSlots.length}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => openDialog('create')}
          className={newSlotTriggerTv()}
        >
          + New Ad Slot
        </button>
      </div>

      {adSlots.length === 0 ? (
        <div className={empty.root()}>
          <div className={empty.iconWrap()}>
            <span className={empty.icon()} aria-hidden>+</span>
          </div>
          <h3 className={empty.title()}>No ad slots yet</h3>
          <p className={empty.body()}>
            Create your first slot to show up in the marketplace and start receiving sponsor interest.
          </p>
          <button type="button" onClick={() => openDialog('create')} className={empty.cta()}>
            Create your first slot
          </button>
        </div>
      ) : visibleSlots.length === 0 ? (
        <p className="py-8 text-center text-sm text-slate-500">
          No ad slots match the current filters.
        </p>
      ) : (
        <div className={list.cardGrid()}>
          <AnimatePresence mode="popLayout">
            {visibleSlots.map((slot, i) => (
              <motion.div
                key={slot.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0, transition: { delay: Math.min(i, 6) * 0.05 } }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              >
                <AdSlotCard adSlot={slot} onEdit={handleEdit} onDeleted={handleDeleted} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {dialogMode !== null && (
        <dialog ref={dialogRef} className={formStyles.dialog()}>
          <AdSlotForm
            key={editingSlot?.id ?? 'create'}
            adSlot={editingSlot}
            onClose={closeDialog}
          />
        </dialog>
      )}
    </div>
  );
}
