'use client';

import type { AdSlot } from '@/lib/types';
import { DeleteButton } from '../../components/delete-button';
import { deleteAdSlotAction } from '../actions';
import { adSlotCardTv, typeBadgeTv } from '../publisher-dashboard.styles';

interface AdSlotCardProps {
  adSlot: AdSlot;
  onEdit: (adSlot: AdSlot) => void;
}

export function AdSlotCard({ adSlot, onEdit }: Readonly<AdSlotCardProps>) {
  const card = adSlotCardTv();
  const available = adSlot.isAvailable;

  return (
    <article className={card.root()}>
      <div className={card.topRow()}>
        <h3 className={card.title()}>{adSlot.name}</h3>
        <span className={typeBadgeTv({ type: adSlot.type })}>{adSlot.type}</span>
      </div>

      {adSlot.description ? (
        <p className={card.description()}>{adSlot.description}</p>
      ) : (
        <p className={`${card.description()} italic text-slate-500`}>
          No description yet — add one so sponsors know what they&apos;re buying.
        </p>
      )}

      <div className={card.metaRow()}>
        <span
          className={`${card.statusLine()} ${available ? 'text-emerald-400' : 'text-slate-500'}`}
        >
          <span
            className={`${card.statusDot()} ${available ? 'bg-emerald-400' : 'bg-slate-600'}`}
          />
          {available ? 'Available' : 'Booked'}
        </span>
        <div className={card.priceBlock()}>
          <span className={card.priceMain()}>
            ${Number(adSlot.basePrice).toLocaleString()}
            <span className={card.priceSuffix()}>/mo</span>
          </span>
        </div>
      </div>

      <div className={card.actionSection()}>
        <div className={card.actionsRow()}>
          <button type="button" onClick={() => onEdit(adSlot)} className={card.editButton()}>
            Edit
          </button>
          <DeleteButton
            action={deleteAdSlotAction}
            id={adSlot.id}
            itemLabel={adSlot.name}
            triggerClassName="text-sm font-medium text-red-400 transition-colors hover:text-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          />
        </div>
      </div>
    </article>
  );
}
