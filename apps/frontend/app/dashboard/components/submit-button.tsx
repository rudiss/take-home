'use client';

import { useFormStatus } from 'react-dom';
import { submitButtonTv } from '../dashboard-shared.styles';

interface SubmitButtonProps {
  label?: string;
  pendingLabel?: string;
  className?: string;
  /** Default primary (theme); `sky` matches publisher dark forms. */
  variant?: 'primary' | 'sky';
}

export function SubmitButton({
  label = 'Save',
  pendingLabel = 'Saving...',
  className,
  variant = 'primary',
}: Readonly<SubmitButtonProps>) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={submitButtonTv({ variant, class: className })}
    >
      {pending ? pendingLabel : label}
    </button>
  );
}
