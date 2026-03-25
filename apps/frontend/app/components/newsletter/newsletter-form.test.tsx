import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NewsletterForm } from './newsletter-form';

const originalFetch = globalThis.fetch;

beforeEach(() => {
  globalThis.fetch = vi.fn();
});

afterEach(() => {
  globalThis.fetch = originalFetch;
});

function mockFetchResponse(status: number, body: object) {
  vi.mocked(globalThis.fetch).mockResolvedValueOnce({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(body),
  } as Response);
}

describe('NewsletterForm', () => {
  it('renders the form with email input and subscribe button', () => {
    render(<NewsletterForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument();
    expect(screen.getByText(/stay in the loop/i)).toBeInTheDocument();
  });

  it('shows success message after valid submission', async () => {
    mockFetchResponse(200, { success: true, message: 'Thanks for subscribing!' });

    render(<NewsletterForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.click(screen.getByRole('button', { name: /subscribe/i }));

    await waitFor(() => {
      expect(screen.getByText(/thanks for subscribing/i)).toBeInTheDocument();
    });
  });

  it('shows error message when API returns an error', async () => {
    mockFetchResponse(400, { error: 'Something went wrong' });

    render(<NewsletterForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.click(screen.getByRole('button', { name: /subscribe/i }));

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });

  it('shows network error when fetch fails', async () => {
    vi.mocked(globalThis.fetch).mockRejectedValueOnce(new Error('Network error'));

    render(<NewsletterForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.click(screen.getByRole('button', { name: /subscribe/i }));

    await waitFor(() => {
      expect(screen.getByText(/unable to connect/i)).toBeInTheDocument();
    });
  });
});
