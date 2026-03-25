'use client';

import { useState, useCallback, useRef } from 'react';
import type { AdSlot } from '@/lib/types';
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

interface AdSlotListProps {
  adSlots: AdSlot[];
}

export function AdSlotList({ adSlots }: Readonly<AdSlotListProps>) {
  const [dialogMode, setDialogMode] = useState<DialogMode>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDialog = useCallback((mode: DialogMode) => {
    setDialogMode(mode);
    requestAnimationFrame(() => dialogRef.current?.showModal());
  }, []);

  const closeDialog = useCallback(() => {
    dialogRef.current?.close();
    setDialogMode(null);
  }, []);

  const handleEdit = useCallback((adSlot: AdSlot) => {
    openDialog(adSlot);
  }, [openDialog]);

  const list = publisherAdSlotListTv();
  const toolbar = publisherToolbarTv();
  const empty = publisherEmptyStateTv();
  const formStyles = publisherFormTv();
  const editingSlot = dialogMode !== null && dialogMode !== 'create' ? dialogMode : undefined;

  return (
    <div className={list.root()}>
      <div className={toolbar.bar()}>
        <p className={toolbar.hint()}>
          Slots appear on the public marketplace when marked available. Edit anytime to refine your
          pitch and pricing.
        </p>
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
            <span className={empty.icon()} aria-hidden>
              +
            </span>
          </div>
          <h3 className={empty.title()}>No ad slots yet</h3>
          <p className={empty.body()}>
            Create your first slot to show up in the marketplace and start receiving sponsor
            interest.
          </p>
          <button type="button" onClick={() => openDialog('create')} className={empty.cta()}>
            Create your first slot
          </button>
        </div>
      ) : (
        <div className={list.cardGrid()}>
          {adSlots.map((slot) => (
            <AdSlotCard key={slot.id} adSlot={slot} onEdit={handleEdit} />
          ))}
        </div>
      )}

      {/* Form dialog */}
      {dialogMode !== null && (
        <dialog ref={dialogRef} className={formStyles.dialog()}>
          <AdSlotForm
            key={editingSlot?.id ?? 'create'}
            adSlot={editingSlot}
            onClose={closeDialog}
            dialogRef={dialogRef}
          />
        </dialog>
      )}
    </div>
  );
}
