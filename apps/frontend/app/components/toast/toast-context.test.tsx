import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { ToastProvider, useToast } from './toast-context';

function TestConsumer() {
  const { toasts, addToast, removeToast } = useToast();
  return (
    <div>
      <button onClick={() => addToast('Test message', 'success')}>Add toast</button>
      <button onClick={() => addToast('Error message', 'error')}>Add error</button>
      {toasts.map((t) => (
        <div key={t.id} data-testid={`toast-${t.id}`}>
          <span>{t.message}</span>
          <span data-testid="type">{t.type}</span>
          <button onClick={() => removeToast(t.id)}>Dismiss</button>
        </div>
      ))}
    </div>
  );
}

describe('ToastContext', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('adds a toast to the list', () => {
    render(
      <ToastProvider>
        <TestConsumer />
      </ToastProvider>,
    );

    act(() => {
      screen.getByText('Add toast').click();
    });

    expect(screen.getByText('Test message')).toBeInTheDocument();
    expect(screen.getByTestId('type')).toHaveTextContent('success');
  });

  it('removes a toast manually', () => {
    render(
      <ToastProvider>
        <TestConsumer />
      </ToastProvider>,
    );

    act(() => {
      screen.getByText('Add toast').click();
    });

    expect(screen.getByText('Test message')).toBeInTheDocument();

    act(() => {
      screen.getByText('Dismiss').click();
    });

    expect(screen.queryByText('Test message')).not.toBeInTheDocument();
  });

  it('auto-dismisses after 4 seconds', () => {
    render(
      <ToastProvider>
        <TestConsumer />
      </ToastProvider>,
    );

    act(() => {
      screen.getByText('Add toast').click();
    });

    expect(screen.getByText('Test message')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(4000);
    });

    expect(screen.queryByText('Test message')).not.toBeInTheDocument();
  });

  it('supports multiple toasts', () => {
    render(
      <ToastProvider>
        <TestConsumer />
      </ToastProvider>,
    );

    act(() => {
      screen.getByText('Add toast').click();
      screen.getByText('Add error').click();
    });

    expect(screen.getByText('Test message')).toBeInTheDocument();
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });
});
