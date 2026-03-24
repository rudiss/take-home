'use client';

import { useState, useCallback } from 'react';
import type { AdSlot } from '@/lib/types';
import { AdSlotCard } from './ad-slot-card';
import { AdSlotForm } from './ad-slot-form';

interface AdSlotListProps {
  adSlots: AdSlot[];
  'aria-labelledby'?: string;
}

export function AdSlotList({ adSlots, 'aria-labelledby': labelledBy }: Readonly<AdSlotListProps>) {
  const [showCreate, setShowCreate] = useState(false);
  const [editingSlot, setEditingSlot] = useState<AdSlot | null>(null);

  const handleCloseCreate = useCallback(() => setShowCreate(false), []);
  const handleCloseEdit = useCallback(() => setEditingSlot(null), []);
  const handleEdit = useCallback((adSlot: AdSlot) => {
    setShowCreate(false);
    setEditingSlot(adSlot);
  }, []);

  return (
    <section className="space-y-4" aria-labelledby={labelledBy}>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => {
            setEditingSlot(null);
            setShowCreate(!showCreate);
          }}
          className="rounded bg-[--color-primary] px-4 py-2 text-sm font-medium text-white hover:bg-[--color-primary-hover]"
        >
          {showCreate ? 'Cancel' : '+ New Ad Slot'}
        </button>
      </div>

      {showCreate && <AdSlotForm onClose={handleCloseCreate} />}

      {adSlots.length === 0 && !showCreate ? (
        <div className="rounded-lg border border-dashed border-[--color-border] p-8 text-center text-[--color-muted]">
          No ad slots yet. Create your first ad slot to start earning.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {adSlots.map((slot) =>
            editingSlot?.id === slot.id ? (
              <AdSlotForm key={slot.id} adSlot={slot} onClose={handleCloseEdit} />
            ) : (
              <AdSlotCard key={slot.id} adSlot={slot} onEdit={handleEdit} />
            ),
          )}
        </div>
      )}
    </section>
  );
}
