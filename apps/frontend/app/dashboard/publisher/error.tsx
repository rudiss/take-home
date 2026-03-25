'use client';

export default function Error({ reset }: Readonly<{ reset: () => void }>) {
  return (
    <div className="flex min-h-[40vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-900/80 p-8 text-center shadow-lg">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/15">
          <span className="text-lg font-semibold text-red-400">!</span>
        </div>
        <h2 className="mb-2 text-lg font-semibold text-white">Couldn&apos;t load ad slots</h2>
        <p className="mb-6 text-sm text-slate-400">
          Check your connection and try again. If the problem continues, refresh the page.
        </p>
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sky-400"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
