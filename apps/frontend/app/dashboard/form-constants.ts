/** Allowed ad slot types — keep in sync with Prisma `AdSlotType` and API validation. */
export const VALID_AD_SLOT_TYPES = [
  'DISPLAY',
  'VIDEO',
  'NATIVE',
  'NEWSLETTER',
  'PODCAST',
] as const;

export type ValidAdSlotType = (typeof VALID_AD_SLOT_TYPES)[number];

export function isValidAdSlotType(value: string): value is ValidAdSlotType {
  return (VALID_AD_SLOT_TYPES as readonly string[]).includes(value);
}

/** Allowed campaign statuses — keep in sync with Prisma `CampaignStatus` and API validation. */
export const VALID_CAMPAIGN_STATUSES = [
  'DRAFT',
  'PENDING_REVIEW',
  'APPROVED',
  'ACTIVE',
  'PAUSED',
  'COMPLETED',
  'CANCELLED',
] as const;

export type ValidCampaignStatus = (typeof VALID_CAMPAIGN_STATUSES)[number];

export function isValidCampaignStatus(value: string): value is ValidCampaignStatus {
  return (VALID_CAMPAIGN_STATUSES as readonly string[]).includes(value);
}
