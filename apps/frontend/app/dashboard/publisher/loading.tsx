function SkeletonCard() {
  return (
    <div className="animate-pulse space-y-4 py-2">
      <div className="flex justify-between gap-3">
        <div className="h-6 w-40 rounded bg-slate-800" />
        <div className="h-5 w-16 rounded-full bg-slate-800" />
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-slate-800/80" />
        <div className="h-3 w-4/5 rounded bg-slate-800/80" />
      </div>
      <div className="flex justify-between">
        <div className="h-4 w-24 rounded bg-slate-800" />
        <div className="h-6 w-20 rounded bg-slate-800" />
      </div>
      <div className="border-t border-slate-800 pt-4">
        <div className="flex gap-6">
          <div className="h-4 w-10 rounded bg-slate-800" />
          <div className="h-4 w-14 rounded bg-slate-800" />
        </div>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="space-y-8">
      <div>
        <div className="h-9 w-48 animate-pulse rounded bg-slate-800" />
        <div className="mt-2 h-4 w-72 max-w-full animate-pulse rounded bg-slate-800/70" />
      </div>

      <div className="flex flex-wrap gap-x-8 gap-y-2 border-b border-slate-800/80 pb-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-5 w-36 animate-pulse rounded bg-slate-800" />
        ))}
      </div>

      <div className="flex justify-end">
        <div className="h-5 w-32 animate-pulse rounded bg-slate-800" />
      </div>

      <div className="grid grid-cols-1 gap-y-12 md:grid-cols-3 md:gap-x-12 md:gap-y-16">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
}
