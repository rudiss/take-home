import {
  AdSlotType,
  CampaignStatus,
  type AdSlotType as AdSlotTypeT,
  type CampaignStatus as CampaignStatusT,
} from '../generated/prisma/client.js';

const AD_SLOT_TYPES = new Set<string>(Object.values(AdSlotType));
const CAMPAIGN_STATUSES = new Set<string>(Object.values(CampaignStatus));

export function isAdSlotType(value: string): value is AdSlotTypeT {
  return AD_SLOT_TYPES.has(value);
}

export function isCampaignStatus(value: string): value is CampaignStatusT {
  return CAMPAIGN_STATUSES.has(value);
}

/** Query param present and invalid → { ok: false }. Absent → { ok: true }. Valid → { ok: true, value }. */
export function parseOptionalAdSlotTypeQuery(
  raw: unknown
): { ok: true; value?: AdSlotTypeT } | { ok: false } {
  if (raw === undefined || raw === '') return { ok: true };
  const s =
    typeof raw === 'string' ? raw : Array.isArray(raw) && typeof raw[0] === 'string' ? raw[0] : String(raw);
  if (!s) return { ok: true };
  return isAdSlotType(s) ? { ok: true, value: s } : { ok: false };
}

export function parseOptionalCampaignStatusQuery(
  raw: unknown
): { ok: true; value?: CampaignStatusT } | { ok: false } {
  if (raw === undefined || raw === '') return { ok: true };
  const s =
    typeof raw === 'string' ? raw : Array.isArray(raw) && typeof raw[0] === 'string' ? raw[0] : String(raw);
  if (!s) return { ok: true };
  return isCampaignStatus(s) ? { ok: true, value: s } : { ok: false };
}

export function parseRequiredAdSlotType(value: unknown): { ok: true; value: AdSlotTypeT } | { ok: false } {
  if (typeof value !== 'string' || !isAdSlotType(value)) return { ok: false };
  return { ok: true, value };
}

export function parseOptionalAdSlotTypeBody(
  value: unknown
): { ok: true; value?: AdSlotTypeT } | { ok: false } {
  if (value === undefined) return { ok: true };
  if (typeof value !== 'string' || !isAdSlotType(value)) return { ok: false };
  return { ok: true, value };
}

export function parseOptionalCampaignStatusBody(
  value: unknown
): { ok: true; value?: CampaignStatusT } | { ok: false } {
  if (value === undefined) return { ok: true };
  if (typeof value !== 'string' || !isCampaignStatus(value)) return { ok: false };
  return { ok: true, value };
}

export function parsePositiveAmount(
  value: unknown,
  field: string
): { ok: true; value: number } | { ok: false; error: string } {
  if (value === undefined || value === null || value === '') {
    return { ok: false, error: `${field} is required` };
  }
  const n = typeof value === 'number' ? value : typeof value === 'string' ? parseFloat(value) : NaN;
  if (!Number.isFinite(n) || n <= 0) {
    return { ok: false, error: `${field} must be a positive number` };
  }
  return { ok: true, value: n };
}

export function parseOptionalPositiveAmount(
  value: unknown,
  field: string
): { ok: true; value?: number } | { ok: false; error: string } {
  if (value === undefined) return { ok: true };
  const n = typeof value === 'number' ? value : typeof value === 'string' ? parseFloat(value) : NaN;
  if (!Number.isFinite(n) || n <= 0) {
    return { ok: false, error: `${field} must be a positive number` };
  }
  return { ok: true, value: n };
}

export function parseRequiredDate(
  value: unknown,
  field: string
): { ok: true; value: Date } | { ok: false; error: string } {
  if (value === undefined || value === null || value === '') {
    return { ok: false, error: `${field} is required` };
  }
  const d = new Date(value as string | number | Date);
  if (Number.isNaN(d.getTime())) {
    return { ok: false, error: `${field} is not a valid date` };
  }
  return { ok: true, value: d };
}

export function parseOptionalDate(
  value: unknown,
  field: string
): { ok: true; value?: Date } | { ok: false; error: string } {
  if (value === undefined) return { ok: true };
  const d = new Date(value as string | number | Date);
  if (Number.isNaN(d.getTime())) {
    return { ok: false, error: `${field} is not a valid date` };
  }
  return { ok: true, value: d };
}

export function parseStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((x): x is string => typeof x === 'string');
}

export function parseOptionalInt(
  value: unknown,
  field: string,
  min: number
): { ok: true; value?: number } | { ok: false; error: string } {
  if (value === undefined) return { ok: true };
  if (typeof value !== 'number' || !Number.isInteger(value) || value < min) {
    return { ok: false, error: `${field} must be an integer >= ${min}` };
  }
  return { ok: true, value };
}

export function parseOptionalBoolean(value: unknown): { ok: true; value?: boolean } | { ok: false; error: string } {
  if (value === undefined) return { ok: true };
  if (typeof value !== 'boolean') {
    return { ok: false, error: 'isAvailable must be a boolean' };
  }
  return { ok: true, value };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseRequiredEmail(
  value: unknown,
  field: string
): { ok: true; value: string } | { ok: false; error: string } {
  if (value === undefined || value === null) {
    return { ok: false, error: `${field} is required` };
  }
  const s = typeof value === 'string' ? value.trim() : '';
  if (!s) return { ok: false, error: `${field} is required` };
  if (!EMAIL_RE.test(s)) return { ok: false, error: `${field} must be a valid email address` };
  return { ok: true, value: s };
}

export function parseNonEmptyString(
  value: unknown,
  field: string,
  minLen = 1
): { ok: true; value: string } | { ok: false; error: string } {
  if (value === undefined || value === null) {
    return { ok: false, error: `${field} is required` };
  }
  const s = typeof value === 'string' ? value.trim() : '';
  if (s.length < minLen) {
    return { ok: false, error: `${field} must be at least ${minLen} characters` };
  }
  return { ok: true, value: s };
}

export function parseOptionalTrimmedString(value: unknown): { ok: true; value?: string } | { ok: false; error: string } {
  if (value === undefined || value === null || value === '') return { ok: true };
  if (typeof value !== 'string') return { ok: false, error: 'Expected a string' };
  const s = value.trim();
  return { ok: true, value: s || undefined };
}
