import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AdSlotCard } from './ad-slot-card';
import type { AdSlot } from '@/lib/types';

// Mock server action and useActionState used by DeleteButton
vi.mock('react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react')>();
  return {
    ...actual,
    useActionState: vi.fn(() => [{}, vi.fn(), false]),
  };
});

const baseSlot: AdSlot = {
  id: 'slot-1',
  name: 'Premium Banner',
  description: 'A high-visibility banner placement',
  type: 'DISPLAY',
  basePrice: 500,
  isAvailable: true,
  publisherId: 'pub-1',
};

describe('AdSlotCard', () => {
  it('renders the ad slot name and type', () => {
    render(<AdSlotCard adSlot={baseSlot} onEdit={vi.fn()} />);

    expect(screen.getByText('Premium Banner')).toBeInTheDocument();
    expect(screen.getByText('DISPLAY')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<AdSlotCard adSlot={baseSlot} onEdit={vi.fn()} />);

    expect(screen.getByText('A high-visibility banner placement')).toBeInTheDocument();
  });

  it('renders empty description message when no description', () => {
    const slot = { ...baseSlot, description: undefined };
    render(<AdSlotCard adSlot={slot} onEdit={vi.fn()} />);

    expect(screen.getByText(/no description yet/i)).toBeInTheDocument();
  });

  it('shows "Available" when slot is available', () => {
    render(<AdSlotCard adSlot={baseSlot} onEdit={vi.fn()} />);

    expect(screen.getByText('Available')).toBeInTheDocument();
  });

  it('shows "Booked" when slot is unavailable', () => {
    const slot = { ...baseSlot, isAvailable: false };
    render(<AdSlotCard adSlot={slot} onEdit={vi.fn()} />);

    expect(screen.getByText('Booked')).toBeInTheDocument();
  });

  it('displays the base price', () => {
    render(<AdSlotCard adSlot={baseSlot} onEdit={vi.fn()} />);

    expect(screen.getByText('$500')).toBeInTheDocument();
  });

  it('calls onEdit when Edit button is clicked', async () => {
    const onEdit = vi.fn();
    render(<AdSlotCard adSlot={baseSlot} onEdit={onEdit} />);

    const user = userEvent.setup();
    await user.click(screen.getByText('Edit'));

    expect(onEdit).toHaveBeenCalledWith(baseSlot);
  });

  it('renders Delete buttons (trigger + confirm)', () => {
    render(<AdSlotCard adSlot={baseSlot} onEdit={vi.fn()} />);

    const deleteButtons = screen.getAllByText('Delete');
    expect(deleteButtons.length).toBe(2);
  });
});
