'use client';

import { useState, useCallback } from 'react';
import type { AdSlot } from '@/lib/types';
import { AdSlotCard } from './ad-slot-card';
import { AdSlotForm } from './ad-slot-form';
import {
  newSlotTriggerTv,
  publisherEmptyStateTv,
  publisherToolbarTv,
} from '../publisher-dashboard.styles';

interface AdSlotListProps {
  adSlots: AdSlot[];
}

export function AdSlotList({ adSlots }: Readonly<AdSlotListProps>) {
  const [showCreate, setShowCreate] = useState(false);
  const [editingSlot, setEditingSlot] = useState<AdSlot | null>(null);

  const handleCloseCreate = useCallback(() => setShowCreate(false), []);
  const handleCloseEdit = useCallback(() => setEditingSlot(null), []);
  const handleEdit = useCallback((adSlot: AdSlot) => {
    setShowCreate(false);
    setEditingSlot(adSlot);
  }, []);

  const toolbar = publisherToolbarTv();
  const empty = publisherEmptyStateTv();
  const newLink = newSlotTriggerTv;

  return (
    <div className="space-y-6">
      <div className={toolbar.bar()}>
        <p className={toolbar.hint()}>
          Slots appear on the public marketplace when marked available. Edit anytime to refine your
          pitch and pricing.
        </p>
        <button
          type="button"
          onClick={() => {
            setEditingSlot(null);
            setShowCreate((o) => !o);
          }}
          className={newLink({ open: showCreate })}
          aria-expanded={showCreate}
        >
          {showCreate ? 'Close' : '+ New Ad Slot'}
        </button>
      </div>

      {showCreate && (
        <div className="max-w-2xl">
          <AdSlotForm onClose={handleCloseCreate} />
        </div>
      )}

      {adSlots.length === 0 && !showCreate ? (
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
          <button type="button" onClick={() => setShowCreate(true)} className={empty.cta()}>
            Create your first slot
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-3 md:gap-x-12 md:gap-y-16">
          {adSlots.map((slot) =>
            editingSlot?.id === slot.id ? (
              <div key={slot.id} className="md:col-span-3">
                <div className="max-w-2xl">
                  <AdSlotForm adSlot={slot} onClose={handleCloseEdit} />
                </div>
              </div>
            ) : (
              <AdSlotCard key={slot.id} adSlot={slot} onEdit={handleEdit} />
            ),
          )}
        </div>
      )}
    </div>
  );
}
