import type { AdSlot, Campaign, Placement } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4291';

export async function api<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    credentials: 'include',
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error || 'API request failed');
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

// Campaigns (no-store: dashboard RSC must not serve cached lists)
export const getCampaigns = (options?: RequestInit) =>
  api<Campaign[]>('/api/campaigns', { cache: 'no-store', ...options });
export const getCampaign = (id: string, options?: RequestInit) =>
  api<Campaign>(`/api/campaigns/${id}`, options);
export const createCampaign = (data: Record<string, unknown>, options?: RequestInit) =>
  api<Campaign>('/api/campaigns', { method: 'POST', body: JSON.stringify(data), ...options });
export const updateCampaign = (id: string, data: Record<string, unknown>, options?: RequestInit) =>
  api<Campaign>(`/api/campaigns/${id}`, { method: 'PUT', body: JSON.stringify(data), ...options });
export const deleteCampaign = (id: string, options?: RequestInit) =>
  api<void>(`/api/campaigns/${id}`, { method: 'DELETE', ...options });

// Ad Slots
export const getAdSlots = (options?: RequestInit) =>
  api<AdSlot[]>('/api/ad-slots', { cache: 'no-store', ...options });
export const getAdSlot = (id: string, options?: RequestInit) =>
  api<AdSlot>(`/api/ad-slots/${id}`, options);
export const createAdSlot = (data: Record<string, unknown>, options?: RequestInit) =>
  api<AdSlot>('/api/ad-slots', { method: 'POST', body: JSON.stringify(data), ...options });
export const updateAdSlot = (id: string, data: Record<string, unknown>, options?: RequestInit) =>
  api<AdSlot>(`/api/ad-slots/${id}`, { method: 'PUT', body: JSON.stringify(data), ...options });
export const deleteAdSlot = (id: string, options?: RequestInit) =>
  api<void>(`/api/ad-slots/${id}`, { method: 'DELETE', ...options });

// Placements
export const getPlacements = (options?: RequestInit) =>
  api<Placement[]>('/api/placements', options);
export const createPlacement = (data: Record<string, unknown>, options?: RequestInit) =>
  api<Placement>('/api/placements', { method: 'POST', body: JSON.stringify(data), ...options });

// Dashboard
export const getStats = (options?: RequestInit) =>
  api<Record<string, unknown>>('/api/dashboard/stats', options);
