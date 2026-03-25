'use client';

export default function Error({ reset }: Readonly<{ reset: () => void }>) {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="rounded-xl bg-[--color-background] p-8 text-center shadow-[--shadow-card]">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <span className="text-lg text-red-600">!</span>
        </div>
        <h2 className="mb-2 text-lg font-semibold">Failed to load ad slots</h2>
        <p className="mb-6 text-sm text-[--color-muted]">
          Something went wrong. Please check your connection and try again.
        </p>
        <button
          onClick={reset}
          className="rounded-lg bg-[--color-primary] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[--color-primary-hover]"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
