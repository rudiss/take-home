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
  NATIVE: 'bg-emerald-100 text-emerald-700',
  NEWSLETTER: 'bg-purple-100 text-purple-700',
  PODCAST: 'bg-orange-100 text-orange-700',
};

export function AdSlotCard({ adSlot, onEdit }: Readonly<AdSlotCardProps>) {
  return (
    <article className="group rounded-xl bg-[--color-background] p-5 shadow-[--shadow-card] transition-shadow hover:shadow-[--shadow-card-hover]">
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className="text-base font-semibold leading-tight">{adSlot.name}</h3>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${typeColors[adSlot.type] || 'bg-gray-100'}`}
        >
          {adSlot.type}
        </span>
      </div>

      {adSlot.description && (
        <p className="mb-4 text-sm leading-relaxed text-[--color-muted] line-clamp-2">
          {adSlot.description}
        </p>
      )}

      <div className="mb-4 flex items-center justify-between">
        <span
          className={`inline-flex items-center gap-1.5 text-sm font-medium ${
            adSlot.isAvailable ? 'text-emerald-600' : 'text-[--color-muted]'
          }`}
        >
          <span
            className={`inline-block h-2 w-2 rounded-full ${
              adSlot.isAvailable ? 'bg-emerald-500' : 'bg-gray-300'
            }`}
          />
          {adSlot.isAvailable ? 'Available' : 'Booked'}
        </span>
        <span className="text-lg font-semibold text-[--color-foreground]">
          ${Number(adSlot.basePrice).toLocaleString()}
          <span className="text-sm font-normal text-[--color-muted]">/mo</span>
        </span>
      </div>

      <div className="flex items-center gap-3 border-t border-[--color-border] pt-3">
        <button
          type="button"
          onClick={() => onEdit(adSlot)}
          className="text-sm font-medium text-[--color-primary] transition-colors hover:text-[--color-primary-hover]"
        >
          Edit
        </button>
        <DeleteButton action={deleteAdSlotAction} id={adSlot.id} itemLabel={adSlot.name} />
      </div>
    </article>
  );
}
