import type { AdSlot, Campaign, Placement } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4291';

export async function api<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    credentials: 'include',
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers },
  });
  if (!res.ok) throw new Error('API request failed');
  return res.json() as Promise<T>;
}

// Campaigns
export const getCampaigns = (options?: RequestInit) =>
  api<Campaign[]>('/api/campaigns', options);
export const getCampaign = (id: string, options?: RequestInit) =>
  api<Campaign>(`/api/campaigns/${id}`, options);
export const createCampaign = (data: Record<string, unknown>, options?: RequestInit) =>
  api<Campaign>('/api/campaigns', { method: 'POST', body: JSON.stringify(data), ...options });

// Ad Slots
export const getAdSlots = (options?: RequestInit) =>
  api<AdSlot[]>('/api/ad-slots', options);
export const getAdSlot = (id: string, options?: RequestInit) =>
  api<AdSlot>(`/api/ad-slots/${id}`, options);
export const createAdSlot = (data: Record<string, unknown>, options?: RequestInit) =>
  api<AdSlot>('/api/ad-slots', { method: 'POST', body: JSON.stringify(data), ...options });

// Placements
export const getPlacements = (options?: RequestInit) =>
  api<Placement[]>('/api/placements', options);
export const createPlacement = (data: Record<string, unknown>, options?: RequestInit) =>
  api<Placement>('/api/placements', { method: 'POST', body: JSON.stringify(data), ...options });

// Dashboard
export const getStats = (options?: RequestInit) =>
  api<Record<string, unknown>>('/api/dashboard/stats', options);
