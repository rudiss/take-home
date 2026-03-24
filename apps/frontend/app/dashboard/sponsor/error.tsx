'use client';

export default function Error({ reset }: Readonly<{ reset: () => void }>) {
  return (
    <div className="rounded border border-red-200 bg-red-50 p-4 text-red-600">
      <p>Failed to load campaigns.</p>
      <button onClick={reset} className="mt-2 text-sm underline hover:no-underline">
        Try again
      </button>
    </div>
  );
}
