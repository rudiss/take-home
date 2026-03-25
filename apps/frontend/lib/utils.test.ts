import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  formatPrice,
  debounce,
  parseQueryString,
  truncate,
  cn,
  deepClone,
  formatRelativeTime,
} from './utils';

describe('formatPrice', () => {
  it('formats a number as USD currency', () => {
    expect(formatPrice(1000)).toBe('$1,000.00');
  });

  it('formats decimal amounts', () => {
    expect(formatPrice(49.99)).toBe('$49.99');
  });

  it('formats zero', () => {
    expect(formatPrice(0)).toBe('$0.00');
  });
});

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('calls the function after the delay', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 200);

    debounced('arg');
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(200);
    expect(fn).toHaveBeenCalledWith('arg');
  });

  it('resets the timer on subsequent calls', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 200);

    debounced('first');
    vi.advanceTimersByTime(100);
    debounced('second');
    vi.advanceTimersByTime(200);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('second');
  });
});

describe('parseQueryString', () => {
  it('parses a query string into an object', () => {
    expect(parseQueryString('foo=bar&baz=qux')).toEqual({ foo: 'bar', baz: 'qux' });
  });

  it('returns empty object for empty string', () => {
    expect(parseQueryString('')).toEqual({});
  });

  it('handles encoded values', () => {
    expect(parseQueryString('name=hello%20world')).toEqual({ name: 'hello world' });
  });
});

describe('truncate', () => {
  it('returns text unchanged if within limit', () => {
    expect(truncate('short', 10)).toBe('short');
  });

  it('truncates and adds ellipsis', () => {
    expect(truncate('this is a long text', 7)).toBe('this is...');
  });

  it('handles exact length', () => {
    expect(truncate('exact', 5)).toBe('exact');
  });
});

describe('cn', () => {
  it('joins class names', () => {
    expect(cn('a', 'b', 'c')).toBe('a b c');
  });

  it('filters out falsy values', () => {
    expect(cn('a', false, null, undefined, 'b')).toBe('a b');
  });

  it('returns empty string for no truthy classes', () => {
    expect(cn(false, null, undefined)).toBe('');
  });
});

describe('deepClone', () => {
  it('creates a deep copy of an object', () => {
    const obj = { a: 1, b: { c: 2 } };
    const cloned = deepClone(obj);

    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
    expect(cloned.b).not.toBe(obj.b);
  });

  it('clones arrays', () => {
    const arr = [1, [2, 3]];
    const cloned = deepClone(arr);

    expect(cloned).toEqual(arr);
    expect(cloned).not.toBe(arr);
  });
});

describe('formatRelativeTime', () => {
  it('returns "Today" for current date', () => {
    expect(formatRelativeTime(new Date())).toBe('Today');
  });

  it('returns "Yesterday" for one day ago', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    expect(formatRelativeTime(yesterday)).toBe('Yesterday');
  });

  it('returns "X days ago" for recent dates', () => {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    expect(formatRelativeTime(threeDaysAgo)).toBe('3 days ago');
  });

  it('returns a locale date string for older dates', () => {
    const old = new Date('2023-01-01');
    const result = formatRelativeTime(old);
    expect(typeof result).toBe('string');
    expect(result).not.toBe('Today');
  });
});
