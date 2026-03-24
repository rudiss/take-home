'use client';

import type { AdSlot } from '@/lib/types';
import { DeleteButton } from '../../components/delete-button';
import { deleteAdSlotAction } from '../actions';

interface AdSlotCardProps {
  adSlot: AdSlot;
  onEdit: (adSlot: AdSlot) => void;
}

const typeColors: Record<string, string> = {
  DISPLAY: 'bg-blue-100 text-blue-700',
  VIDEO: 'bg-red-100 text-red-700',
  NATIVE: 'bg-emerald-100 text-emerald-800',
  NEWSLETTER: 'bg-purple-100 text-purple-700',
  PODCAST: 'bg-orange-100 text-orange-700',
};

export function AdSlotCard({ adSlot, onEdit }: Readonly<AdSlotCardProps>) {
  const titleId = `ad-slot-card-${adSlot.id}-title`;

  return (
    <article
      className="rounded-lg border border-[--color-border] p-4"
      aria-labelledby={titleId}
    >
      <div className="mb-2 flex items-start justify-between">
        <h3 id={titleId} className="text-base font-semibold">
          {adSlot.name}
        </h3>
        <span className={`rounded px-2 py-0.5 text-xs ${typeColors[adSlot.type] || 'bg-gray-100'}`}>
          {adSlot.type}
        </span>
      </div>

      {adSlot.description && (
        <p className="mb-3 text-sm text-[--color-muted] line-clamp-2">{adSlot.description}</p>
      )}

      <div className="mb-3 flex items-center justify-between">
        <span
          className={`text-sm ${adSlot.isAvailable ? 'text-green-600' : 'text-[--color-muted]'}`}
        >
          {adSlot.isAvailable ? 'Available' : 'Booked'}
        </span>
        <span className="font-semibold text-[--color-primary]">
          ${Number(adSlot.basePrice).toLocaleString()}/mo
        </span>
      </div>

      <div className="flex items-center gap-3 border-t border-[--color-border] pt-3">
        <button
          type="button"
          onClick={() => onEdit(adSlot)}
          className="text-sm text-[--color-primary] hover:underline"
        >
          Edit
        </button>
        <DeleteButton action={deleteAdSlotAction} id={adSlot.id} itemLabel={adSlot.name} />
      </div>
    </article>
  );
}
