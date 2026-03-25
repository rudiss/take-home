'use client';

import { useFormStatus } from 'react-dom';

interface SubmitButtonProps {
  label?: string;
  pendingLabel?: string;
  className?: string;
}

export function SubmitButton({
  label = 'Save',
  pendingLabel = 'Saving...',
  className,
}: Readonly<SubmitButtonProps>) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={
        className ??
        'rounded-lg bg-[--color-primary] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[--color-primary-hover] disabled:opacity-50'
      }
    >
      {pending ? pendingLabel : label}
    </button>
  );
}
