'use client';

import { useState, useCallback } from 'react';
import type { AdSlot } from '@/lib/types';
import { AdSlotCard } from './ad-slot-card';
import { AdSlotForm } from './ad-slot-form';

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

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => {
            setEditingSlot(null);
            setShowCreate(!showCreate);
          }}
          className="rounded-lg bg-[--color-primary] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[--color-primary-hover]"
        >
          {showCreate ? 'Cancel' : '+ New Ad Slot'}
        </button>
      </div>

      {showCreate && <AdSlotForm onClose={handleCloseCreate} />}

      {adSlots.length === 0 && !showCreate ? (
        <div className="rounded-xl bg-[--color-background] p-12 text-center shadow-[--shadow-card]">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[--color-primary]/10">
            <span className="text-xl text-[--color-primary]">+</span>
          </div>
          <h3 className="mb-1 font-semibold">No ad slots yet</h3>
          <p className="text-sm text-[--color-muted]">
            Create your first ad slot to start earning.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {adSlots.map((slot) =>
            editingSlot?.id === slot.id ? (
              <AdSlotForm key={slot.id} adSlot={slot} onClose={handleCloseEdit} />
            ) : (
              <AdSlotCard key={slot.id} adSlot={slot} onEdit={handleEdit} />
            ),
          )}
        </div>
      )}
    </div>
  );
}
