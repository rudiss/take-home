import { publisherLoadingTv, publisherSkeletonCardTv } from './publisher-dashboard.styles';

function SkeletonCard() {
  const sk = publisherSkeletonCardTv();
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
      <div className={sk.metaRow()}>
        <div className={sk.metaLeft()} />
        <div className={sk.metaRight()} />
      </div>
      <div className={sk.actionsSection()}>
        <div className={sk.actionsRow()}>
          <div className={sk.actionA()} />
          <div className={sk.actionB()} />
        </div>
      </div>
    </div>
  );
}

export default function Loading() {
  const load = publisherLoadingTv();

  return (
    <div className={load.root()}>
      <div>
        <div className={load.headerTitle()} />
        <div className={load.headerSubtitle()} />
      </div>

      <div className={load.statsRow()}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={load.statItem()} />
        ))}
      </div>

      <div className={load.toolbarEnd()}>
        <div className={load.toolbarBtn()} />
      </div>

      <div className={load.cardGrid()}>
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
}
