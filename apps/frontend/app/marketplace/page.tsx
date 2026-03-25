import { AdSlotGrid } from './components/ad-slot-grid';

export default function MarketplacePage() {
  return (
    <div className="space-y-8">
      <header className="max-w-3xl space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-[--color-foreground]">
          Find your next sponsorship placement
        </h1>
        <p className="text-lg text-[--color-muted]">
          Browse verified publisher inventory, compare formats, and reserve placements in minutes.
        </p>
        <p className="text-sm text-[--color-muted]">
          Every listing is offered directly by the publisher — no anonymous middlemen.
        </p>
      </header>

      <AdSlotGrid />
    </div>
  );
}
