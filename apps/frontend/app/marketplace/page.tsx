import { AdSlotGrid } from './components/ad-slot-grid';
import { marketplacePageTv } from './marketplace.styles';

export default function MarketplacePage() {
  const page = marketplacePageTv();

  return (
    <div className={page.root()}>
      <header className={page.header()}>
        <h1 className={page.title()}>Find your next sponsorship placement</h1>
        <p className={page.lead()}>
          Browse verified publisher inventory, compare formats, and reserve placements in minutes.
        </p>
        <p className={page.note()}>
          Every listing is offered directly by the publisher — no anonymous middlemen.
        </p>
      </header>

      <AdSlotGrid />
    </div>
  );
}
