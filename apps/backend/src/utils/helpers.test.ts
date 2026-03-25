import { describe, it, expect } from 'vitest';
import {
  getParam,
  formatCurrency,
  calculatePercentChange,
  parsePagination,
  isValidEmail,
  buildFilters,
  clampValue,
  formatDate,
} from './helpers.js';

describe('getParam', () => {
  it('returns the string when given a string', () => {
    expect(getParam('hello')).toBe('hello');
  });

  it('returns first element when given a string array', () => {
    expect(getParam(['first', 'second'])).toBe('first');
  });

  it('returns empty string for non-string values', () => {
    expect(getParam(123)).toBe('');
    expect(getParam(undefined)).toBe('');
    expect(getParam(null)).toBe('');
  });
});

describe('formatCurrency', () => {
  it('formats USD amount by default', () => {
    expect(formatCurrency(1000)).toBe('$1,000.00');
  });

  it('formats decimal amounts', () => {
    expect(formatCurrency(49.99)).toBe('$49.99');
  });

  it('supports custom currency', () => {
    const result = formatCurrency(1000, 'EUR');
    expect(result).toContain('1,000.00');
  });
});

describe('calculatePercentChange', () => {
  it('calculates positive change', () => {
    expect(calculatePercentChange(100, 150)).toBe(50);
  });

  it('calculates negative change', () => {
    expect(calculatePercentChange(200, 100)).toBe(-50);
  });

  it('returns 100 when old value is 0 and new value is positive', () => {
    expect(calculatePercentChange(0, 50)).toBe(100);
  });

  it('returns 0 when both values are 0', () => {
    expect(calculatePercentChange(0, 0)).toBe(0);
  });
});

describe('parsePagination', () => {
  it('returns defaults when no params provided', () => {
    expect(parsePagination({})).toEqual({ page: 1, limit: 10, skip: 0 });
  });

  it('parses valid page and limit', () => {
    expect(parsePagination({ page: '3', limit: '20' })).toEqual({
      page: 3,
      limit: 20,
      skip: 40,
    });
  });

  it('falls back to defaults for invalid values', () => {
    expect(parsePagination({ page: 'abc', limit: 'xyz' })).toEqual({
      page: 1,
      limit: 10,
      skip: 0,
    });
  });
});

describe('isValidEmail', () => {
  it('returns true for valid emails', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
    expect(isValidEmail('test.name@domain.co')).toBe(true);
  });

  it('returns false for invalid emails', () => {
    expect(isValidEmail('')).toBe(false);
    expect(isValidEmail('not-an-email')).toBe(false);
    expect(isValidEmail('@missing-local.com')).toBe(false);
    expect(isValidEmail('missing-domain@')).toBe(false);
  });
});

describe('buildFilters', () => {
  it('includes only allowed fields from query', () => {
    const query = { name: 'test', status: 'ACTIVE', secret: 'hidden' };
    const result = buildFilters(query, ['name', 'status']);
    expect(result).toEqual({ name: 'test', status: 'ACTIVE' });
    expect(result).not.toHaveProperty('secret');
  });

  it('skips undefined fields', () => {
    const query = { name: 'test' };
    const result = buildFilters(query, ['name', 'status']);
    expect(result).toEqual({ name: 'test' });
  });

  it('returns empty object when no fields match', () => {
    expect(buildFilters({}, ['name'])).toEqual({});
  });
});

describe('clampValue', () => {
  it('returns value when within range', () => {
    expect(clampValue(5, 0, 10)).toBe(5);
  });

  it('returns min when value is below range', () => {
    expect(clampValue(-5, 0, 10)).toBe(0);
  });

  it('returns max when value is above range', () => {
    expect(clampValue(15, 0, 10)).toBe(10);
  });

  it('handles equal min and max', () => {
    expect(clampValue(5, 3, 3)).toBe(3);
  });
});

describe('formatDate', () => {
  it('formats a valid date string', () => {
    const result = formatDate('2024-01-15');
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('formats a Date object', () => {
    const result = formatDate(new Date('2024-06-01'));
    expect(typeof result).toBe('string');
  });
});
