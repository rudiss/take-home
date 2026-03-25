import { sponsorLoadingTv, sponsorSkeletonCardTv } from './sponsor-dashboard.styles';

function SkeletonCard() {
  const sk = sponsorSkeletonCardTv();
  return (
    <div className={sk.root()}>
      <div className={sk.topRow()}>
        <div className={sk.titleBar()} />
        <div className={sk.badge()} />
      </div>
      <div className={sk.lineStack()}>
        <div className={sk.lineFull()} />
        <div className={sk.linePart()} />
      </div>
      <div className={sk.progressBlock()}>
        <div className={sk.progressLabels()}>
          <div className={sk.labelA()} />
          <div className={sk.labelB()} />
        </div>
        <div className={sk.progressTrack()} />
      </div>
      <div className={sk.dateLine()} />
    </div>
  );
}

export default function Loading() {
  const load = sponsorLoadingTv();

  return (
    <div className={load.root()}>
      <div>
        <div className={load.headerTitle()} />
        <div className={load.headerSubtitle()} />
      </div>

      <div className={load.statsGrid()}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={load.statCard()}>
            <div className={load.statLineA()} />
            <div className={load.statLineB()} />
          </div>
        ))}
      </div>

      <div className={load.cardGrid()}>
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
}
