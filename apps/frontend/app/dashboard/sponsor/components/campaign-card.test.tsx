import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CampaignCard } from './campaign-card';
import type { Campaign } from '@/lib/types';

// Mock server action and useActionState used by DeleteButton
vi.mock('react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react')>();
  return {
    ...actual,
    useActionState: vi.fn(() => [{}, vi.fn(), false]),
  };
});

const baseCampaign: Campaign = {
  id: 'camp-1',
  name: 'Summer Campaign',
  description: 'A summer promo campaign',
  budget: 10000,
  spent: 2500,
  status: 'ACTIVE',
  startDate: '2024-06-01',
  endDate: '2024-08-31',
  sponsorId: 'sp-1',
};

describe('CampaignCard', () => {
  it('renders the campaign name and status', () => {
    render(<CampaignCard campaign={baseCampaign} onEdit={vi.fn()} />);

    expect(screen.getByText('Summer Campaign')).toBeInTheDocument();
    expect(screen.getByText('ACTIVE')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<CampaignCard campaign={baseCampaign} onEdit={vi.fn()} />);

    expect(screen.getByText('A summer promo campaign')).toBeInTheDocument();
  });

  it('hides description when not provided', () => {
    const campaign = { ...baseCampaign, description: undefined };
    render(<CampaignCard campaign={campaign} onEdit={vi.fn()} />);

    expect(screen.queryByText('A summer promo campaign')).not.toBeInTheDocument();
  });

  it('displays budget progress', () => {
    render(<CampaignCard campaign={baseCampaign} onEdit={vi.fn()} />);

    expect(screen.getByText('Budget')).toBeInTheDocument();
    expect(screen.getByText(/2,500.*10,000/)).toBeInTheDocument();
  });

  it('displays date range', () => {
    render(<CampaignCard campaign={baseCampaign} onEdit={vi.fn()} />);

    const dateLine = screen.getByText(/2024/);
    expect(dateLine).toBeInTheDocument();
  });

  it('calls onEdit when Edit button is clicked', async () => {
    const onEdit = vi.fn();
    render(<CampaignCard campaign={baseCampaign} onEdit={onEdit} />);

    const user = userEvent.setup();
    await user.click(screen.getByText('Edit'));

    expect(onEdit).toHaveBeenCalledWith(baseCampaign);
  });

  it('renders Delete buttons (trigger + confirm)', () => {
    render(<CampaignCard campaign={baseCampaign} onEdit={vi.fn()} />);

    const deleteButtons = screen.getAllByText('Delete');
    expect(deleteButtons.length).toBe(2);
  });

  it('renders progress bar with correct width', () => {
    const { container } = render(
      <CampaignCard campaign={baseCampaign} onEdit={vi.fn()} />,
    );

    // 2500 / 10000 = 25%
    const progressFill = container.querySelector('[style*="width"]');
    expect(progressFill).toHaveStyle({ width: '25%' });
  });
});
