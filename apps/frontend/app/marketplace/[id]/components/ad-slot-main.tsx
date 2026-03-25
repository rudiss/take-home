import Image from 'next/image';
import { adSlotImageUrl } from '@/lib/ad-slot-image';
import { IconCheckCircle, IconShieldCheck } from '../../components/marketplace-icons';
import { formatSlotTypeLabel, slotValueBullets } from '@/lib/marketplace-ux';
import type { AdSlot } from '@/lib/types';
import { adSlotDetailTv, marketplaceTypeBadgeTv } from '../../marketplace.styles';

interface Props {
  adSlot: AdSlot;
}

export function AdSlotMain({ adSlot }: Readonly<Props>) {
  const d = adSlotDetailTv();
  const bullets = slotValueBullets(adSlot.type);

  return (
    <div className={d.main()}>
      <div className={d.hero()}>
        <Image
          src={adSlotImageUrl(adSlot.id, 1200, 600)}
          alt=""
          fill
          className={d.heroImage()}
          sizes="(max-width: 1024px) 100vw, 66vw"
          priority
        />
        <div className={d.heroGradient()} />
        <div className={d.heroOverlay()}>
          <span className={marketplaceTypeBadgeTv({ type: adSlot.type, placement: 'hero' })}>
            {formatSlotTypeLabel(adSlot.type)}
          </span>
          <h1 className={d.heroTitle()}>{adSlot.name}</h1>
        </div>
      </div>

      {adSlot.publisher && (
        <div className={d.publisherCard()}>
          <div className={d.publisherIconWrap()}>
            <IconShieldCheck />
          </div>
          <div>
            <p className={d.publisherLabel()}>Published by</p>
            <p className={d.publisherName()}>{adSlot.publisher.name}</p>
            {adSlot.publisher.website && (
              <a
                href={adSlot.publisher.website}
                target="_blank"
                rel="noopener noreferrer"
                className={d.publisherSiteLink()}
              >
                Visit publisher site
              </a>
            )}
            <p className={d.publisherBlurb()}>
              You&apos;re booking directly with this publisher. They&apos;ll confirm timing,
              creative requirements, and next steps after you reserve.
            </p>
          </div>
        </div>
      )}

      {adSlot.description && (
        <div>
          <h2 className={d.sectionTitle()}>About this placement</h2>
          <p className={d.sectionBody()}>{adSlot.description}</p>
        </div>
      )}

      <div>
        <h2 className={d.sectionTitle()}>What you get</h2>
        <ul className={d.bulletList()}>
          {bullets.map((line) => (
            <li key={line} className={d.bulletItem()}>
              <IconCheckCircle />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
