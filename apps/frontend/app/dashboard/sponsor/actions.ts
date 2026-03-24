'use server';

import { revalidatePath } from 'next/cache';
import { createCampaign, updateCampaign, deleteCampaign } from '@/lib/api';
import type { DashboardActionState } from '../action-types';
import { isValidCampaignStatus } from '../form-constants';
import { cookieHeaderForApi } from '../server-shared';

export type { DashboardActionState as ActionState } from '../action-types';

export async function createCampaignAction(
  _prevState: DashboardActionState,
  formData: FormData,
): Promise<DashboardActionState> {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const budget = formData.get('budget') as string;
  const startDate = formData.get('startDate') as string;
  const endDate = formData.get('endDate') as string;

  const fieldErrors: Record<string, string> = {};
  if (!name?.trim()) fieldErrors.name = 'Name is required';
  if (!budget || Number(budget) <= 0) fieldErrors.budget = 'Budget must be a positive number';
  if (!startDate) fieldErrors.startDate = 'Start date is required';
  if (!endDate) fieldErrors.endDate = 'End date is required';
  if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
    fieldErrors.endDate = 'End date must be after start date';
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }

  try {
    const cookie = await cookieHeaderForApi();
    await createCampaign(
      {
        name: name.trim(),
        description: description?.trim() || undefined,
        budget: Number(budget),
        startDate,
        endDate,
      },
      { headers: { cookie } },
    );
    revalidatePath('/dashboard/sponsor');
    return { success: true };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Failed to create campaign' };
  }
}

export async function updateCampaignAction(
  _prevState: DashboardActionState,
  formData: FormData,
): Promise<DashboardActionState> {
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const budget = formData.get('budget') as string;
  const startDate = formData.get('startDate') as string;
  const endDate = formData.get('endDate') as string;
  const status = formData.get('status') as string;

  const fieldErrors: Record<string, string> = {};
  if (!name?.trim()) fieldErrors.name = 'Name is required';
  if (!budget || Number(budget) <= 0) fieldErrors.budget = 'Budget must be a positive number';
  if (!startDate) fieldErrors.startDate = 'Start date is required';
  if (!endDate) fieldErrors.endDate = 'End date is required';
  if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
    fieldErrors.endDate = 'End date must be after start date';
  }
  if (status && !isValidCampaignStatus(status)) {
    fieldErrors.status = 'Invalid status';
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }

  try {
    const cookie = await cookieHeaderForApi();
    await updateCampaign(
      id,
      {
        name: name.trim(),
        description: description?.trim() || undefined,
        budget: Number(budget),
        startDate,
        endDate,
        ...(status ? { status } : {}),
      },
      { headers: { cookie } },
    );
    revalidatePath('/dashboard/sponsor');
    return { success: true };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Failed to update campaign' };
  }
}

export async function deleteCampaignAction(
  _prevState: DashboardActionState,
  formData: FormData,
): Promise<DashboardActionState> {
  const id = formData.get('id') as string;

  try {
    const cookie = await cookieHeaderForApi();
    await deleteCampaign(id, { headers: { cookie } });
    revalidatePath('/dashboard/sponsor');
    return { success: true };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Failed to delete campaign' };
  }
}
