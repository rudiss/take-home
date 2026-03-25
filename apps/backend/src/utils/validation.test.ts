import { describe, it, expect } from 'vitest';
import {
  isAdSlotType,
  isCampaignStatus,
  parsePositiveAmount,
  parseOptionalPositiveAmount,
  parseRequiredDate,
  parseOptionalDate,
  parseRequiredEmail,
  parseNonEmptyString,
  parseOptionalBoolean,
  parseOptionalInt,
  parseStringArray,
  parseOptionalTrimmedString,
  parseRequiredAdSlotType,
  parseOptionalAdSlotTypeQuery,
} from './validation.js';

describe('isAdSlotType', () => {
  it('returns true for valid ad slot types', () => {
    expect(isAdSlotType('DISPLAY')).toBe(true);
    expect(isAdSlotType('VIDEO')).toBe(true);
    expect(isAdSlotType('NATIVE')).toBe(true);
    expect(isAdSlotType('NEWSLETTER')).toBe(true);
    expect(isAdSlotType('PODCAST')).toBe(true);
  });

  it('returns false for invalid types', () => {
    expect(isAdSlotType('INVALID')).toBe(false);
    expect(isAdSlotType('')).toBe(false);
    expect(isAdSlotType('display')).toBe(false);
  });
});

describe('isCampaignStatus', () => {
  it('returns true for valid statuses', () => {
    expect(isCampaignStatus('DRAFT')).toBe(true);
    expect(isCampaignStatus('ACTIVE')).toBe(true);
    expect(isCampaignStatus('PAUSED')).toBe(true);
    expect(isCampaignStatus('COMPLETED')).toBe(true);
  });

  it('returns false for invalid statuses', () => {
    expect(isCampaignStatus('INVALID')).toBe(false);
    expect(isCampaignStatus('')).toBe(false);
  });
});

describe('parseRequiredAdSlotType', () => {
  it('returns ok for valid type', () => {
    expect(parseRequiredAdSlotType('DISPLAY')).toEqual({ ok: true, value: 'DISPLAY' });
  });

  it('returns not ok for invalid type', () => {
    expect(parseRequiredAdSlotType('INVALID')).toEqual({ ok: false });
    expect(parseRequiredAdSlotType(123)).toEqual({ ok: false });
    expect(parseRequiredAdSlotType(undefined)).toEqual({ ok: false });
  });
});

describe('parseOptionalAdSlotTypeQuery', () => {
  it('returns ok with no value for undefined/empty', () => {
    expect(parseOptionalAdSlotTypeQuery(undefined)).toEqual({ ok: true });
    expect(parseOptionalAdSlotTypeQuery('')).toEqual({ ok: true });
  });

  it('returns ok with value for valid type', () => {
    expect(parseOptionalAdSlotTypeQuery('VIDEO')).toEqual({ ok: true, value: 'VIDEO' });
  });

  it('returns not ok for invalid type string', () => {
    expect(parseOptionalAdSlotTypeQuery('BOGUS')).toEqual({ ok: false });
  });
});

describe('parsePositiveAmount', () => {
  it('accepts a positive number', () => {
    expect(parsePositiveAmount(100, 'price')).toEqual({ ok: true, value: 100 });
  });

  it('accepts a numeric string', () => {
    expect(parsePositiveAmount('49.99', 'price')).toEqual({ ok: true, value: 49.99 });
  });

  it('rejects zero', () => {
    const result = parsePositiveAmount(0, 'price');
    expect(result.ok).toBe(false);
  });

  it('rejects negative numbers', () => {
    const result = parsePositiveAmount(-5, 'price');
    expect(result.ok).toBe(false);
  });

  it('rejects null/undefined/empty', () => {
    expect(parsePositiveAmount(undefined, 'price').ok).toBe(false);
    expect(parsePositiveAmount(null, 'price').ok).toBe(false);
    expect(parsePositiveAmount('', 'price').ok).toBe(false);
  });

  it('rejects non-numeric strings', () => {
    const result = parsePositiveAmount('abc', 'price');
    expect(result.ok).toBe(false);
  });
});

describe('parseOptionalPositiveAmount', () => {
  it('returns ok with no value for undefined', () => {
    expect(parseOptionalPositiveAmount(undefined, 'price')).toEqual({ ok: true });
  });

  it('accepts a positive number', () => {
    expect(parseOptionalPositiveAmount(50, 'price')).toEqual({ ok: true, value: 50 });
  });

  it('rejects zero', () => {
    expect(parseOptionalPositiveAmount(0, 'price').ok).toBe(false);
  });
});

describe('parseRequiredDate', () => {
  it('parses a valid ISO date string', () => {
    const result = parseRequiredDate('2024-06-15', 'startDate');
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toBeInstanceOf(Date);
    }
  });

  it('rejects empty/null/undefined', () => {
    expect(parseRequiredDate(undefined, 'date').ok).toBe(false);
    expect(parseRequiredDate(null, 'date').ok).toBe(false);
    expect(parseRequiredDate('', 'date').ok).toBe(false);
  });

  it('rejects invalid date strings', () => {
    expect(parseRequiredDate('not-a-date', 'date').ok).toBe(false);
  });
});

describe('parseOptionalDate', () => {
  it('returns ok with no value for undefined', () => {
    expect(parseOptionalDate(undefined, 'date')).toEqual({ ok: true });
  });

  it('parses a valid date', () => {
    const result = parseOptionalDate('2024-01-01', 'date');
    expect(result.ok).toBe(true);
  });

  it('rejects invalid date', () => {
    expect(parseOptionalDate('garbage', 'date').ok).toBe(false);
  });
});

describe('parseRequiredEmail', () => {
  it('accepts a valid email', () => {
    expect(parseRequiredEmail('user@example.com', 'email')).toEqual({
      ok: true,
      value: 'user@example.com',
    });
  });

  it('trims whitespace', () => {
    const result = parseRequiredEmail('  user@example.com  ', 'email');
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value).toBe('user@example.com');
  });

  it('rejects invalid emails', () => {
    expect(parseRequiredEmail('not-email', 'email').ok).toBe(false);
    expect(parseRequiredEmail('', 'email').ok).toBe(false);
  });

  it('rejects null/undefined', () => {
    expect(parseRequiredEmail(undefined, 'email').ok).toBe(false);
    expect(parseRequiredEmail(null, 'email').ok).toBe(false);
  });
});

describe('parseNonEmptyString', () => {
  it('accepts a valid string', () => {
    expect(parseNonEmptyString('hello', 'name')).toEqual({ ok: true, value: 'hello' });
  });

  it('trims whitespace', () => {
    const result = parseNonEmptyString('  hello  ', 'name');
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value).toBe('hello');
  });

  it('rejects empty/whitespace-only strings', () => {
    expect(parseNonEmptyString('', 'name').ok).toBe(false);
    expect(parseNonEmptyString('   ', 'name').ok).toBe(false);
  });

  it('rejects null/undefined', () => {
    expect(parseNonEmptyString(undefined, 'name').ok).toBe(false);
    expect(parseNonEmptyString(null, 'name').ok).toBe(false);
  });

  it('enforces minLen', () => {
    expect(parseNonEmptyString('ab', 'name', 3).ok).toBe(false);
    expect(parseNonEmptyString('abc', 'name', 3).ok).toBe(true);
  });
});

describe('parseOptionalBoolean', () => {
  it('returns ok with no value for undefined', () => {
    expect(parseOptionalBoolean(undefined)).toEqual({ ok: true });
  });

  it('accepts true/false', () => {
    expect(parseOptionalBoolean(true)).toEqual({ ok: true, value: true });
    expect(parseOptionalBoolean(false)).toEqual({ ok: true, value: false });
  });

  it('rejects non-boolean values', () => {
    expect(parseOptionalBoolean('true').ok).toBe(false);
    expect(parseOptionalBoolean(1).ok).toBe(false);
  });
});

describe('parseOptionalInt', () => {
  it('returns ok with no value for undefined', () => {
    expect(parseOptionalInt(undefined, 'width', 0)).toEqual({ ok: true });
  });

  it('accepts valid integers at or above min', () => {
    expect(parseOptionalInt(5, 'width', 0)).toEqual({ ok: true, value: 5 });
    expect(parseOptionalInt(0, 'width', 0)).toEqual({ ok: true, value: 0 });
  });

  it('rejects values below min', () => {
    expect(parseOptionalInt(-1, 'width', 0).ok).toBe(false);
  });

  it('rejects non-integers', () => {
    expect(parseOptionalInt(5.5, 'width', 0).ok).toBe(false);
    expect(parseOptionalInt('5', 'width', 0).ok).toBe(false);
  });
});

describe('parseStringArray', () => {
  it('filters to only strings', () => {
    expect(parseStringArray(['a', 1, 'b', null])).toEqual(['a', 'b']);
  });

  it('returns empty array for non-array input', () => {
    expect(parseStringArray('not-array')).toEqual([]);
    expect(parseStringArray(undefined)).toEqual([]);
  });
});

describe('parseOptionalTrimmedString', () => {
  it('returns ok with no value for undefined/null/empty', () => {
    expect(parseOptionalTrimmedString(undefined)).toEqual({ ok: true });
    expect(parseOptionalTrimmedString(null)).toEqual({ ok: true });
    expect(parseOptionalTrimmedString('')).toEqual({ ok: true });
  });

  it('trims and returns string', () => {
    expect(parseOptionalTrimmedString('  hello  ')).toEqual({ ok: true, value: 'hello' });
  });

  it('rejects non-string values', () => {
    expect(parseOptionalTrimmedString(123).ok).toBe(false);
  });

  it('returns undefined for whitespace-only strings', () => {
    expect(parseOptionalTrimmedString('   ')).toEqual({ ok: true });
  });
});
