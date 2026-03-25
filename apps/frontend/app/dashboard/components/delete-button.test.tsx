import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DeleteButton } from './delete-button';

// jsdom doesn't implement HTMLDialogElement methods
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close = vi.fn();
});

// Mock useActionState to return controllable state
vi.mock('react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react')>();
  return {
    ...actual,
    useActionState: vi.fn(() => [{}, vi.fn(), false]),
  };
});

describe('DeleteButton', () => {
  const mockAction = vi.fn();

  it('renders trigger and confirmation buttons', () => {
    render(<DeleteButton action={mockAction} id="item-1" />);

    const deleteButtons = screen.getAllByText('Delete');
    expect(deleteButtons.length).toBe(2); // trigger + confirm
  });

  it('renders with a custom label on the trigger', () => {
    render(<DeleteButton action={mockAction} id="item-1" label="Remove" />);

    expect(screen.getByText('Remove')).toBeInTheDocument();
  });

  it('opens confirmation dialog on trigger click', async () => {
    render(<DeleteButton action={mockAction} id="item-1" />);

    const user = userEvent.setup();
    // Click the trigger button (type="button", not submit)
    const triggerBtn = screen.getAllByText('Delete')[0];
    await user.click(triggerBtn);

    expect(screen.getByText('Confirm delete')).toBeInTheDocument();
  });

  it('shows the item name in confirmation message', () => {
    render(
      <DeleteButton action={mockAction} id="item-1" itemLabel="My Item" />,
    );

    expect(screen.getByText(/My Item/)).toBeInTheDocument();
    expect(screen.getByText(/cannot be undone/i)).toBeInTheDocument();
  });

  it('shows generic message when no itemLabel', () => {
    render(<DeleteButton action={mockAction} id="item-1" />);

    expect(screen.getByText(/are you sure you want to delete this/i)).toBeInTheDocument();
  });

  it('renders Cancel button in the dialog', () => {
    render(<DeleteButton action={mockAction} id="item-1" />);

    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('includes hidden id input in the form', () => {
    render(<DeleteButton action={mockAction} id="item-123" />);

    const hiddenInput = document.querySelector('input[name="id"]') as HTMLInputElement;
    expect(hiddenInput).toBeTruthy();
    expect(hiddenInput.value).toBe('item-123');
  });
});
