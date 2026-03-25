import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from './theme-provider';

function TestConsumer() {
  const { theme, toggle } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('defaults to light theme', () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('light');
  });

  it('toggles between light and dark', () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    );

    act(() => {
      screen.getByText('Toggle').click();
    });

    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    expect(localStorage.getItem('anvara-theme')).toBe('dark');

    act(() => {
      screen.getByText('Toggle').click();
    });

    expect(screen.getByTestId('theme')).toHaveTextContent('light');
    expect(localStorage.getItem('anvara-theme')).toBe('light');
  });

  it('reads stored theme from localStorage', () => {
    localStorage.setItem('anvara-theme', 'dark');

    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
  });
});
