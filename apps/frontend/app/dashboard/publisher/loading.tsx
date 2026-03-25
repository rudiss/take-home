function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-xl bg-[--color-background] p-5 shadow-[--shadow-card]">
      <div className="mb-3 flex items-start justify-between">
        <div className="h-5 w-32 rounded bg-gray-200" />
        <div className="h-5 w-16 rounded-full bg-gray-200" />
      </div>
      <div className="mb-4 space-y-2">
        <div className="h-3 w-full rounded bg-gray-100" />
        <div className="h-3 w-2/3 rounded bg-gray-100" />
      </div>
      <div className="mb-4 flex justify-between">
        <div className="h-4 w-16 rounded bg-gray-100" />
        <div className="h-5 w-20 rounded bg-gray-100" />
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="space-y-8">
      <div>
        <div className="h-8 w-40 animate-pulse rounded bg-gray-200" />
        <div className="mt-2 h-4 w-64 animate-pulse rounded bg-gray-100" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="animate-pulse rounded-xl bg-[--color-background] p-5 shadow-[--shadow-card]">
            <div className="h-3 w-20 rounded bg-gray-100" />
            <div className="mt-2 h-7 w-16 rounded bg-gray-200" />
          </div>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
}
