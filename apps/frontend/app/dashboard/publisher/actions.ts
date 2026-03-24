'use server';

import { revalidatePath } from 'next/cache';
import { createAdSlot, updateAdSlot, deleteAdSlot } from '@/lib/api';
import type { DashboardActionState } from '../action-types';
import { isValidAdSlotType } from '../form-constants';
import { cookieHeaderForApi } from '../server-shared';

export type { DashboardActionState as ActionState } from '../action-types';

export async function createAdSlotAction(
  _prevState: DashboardActionState,
  formData: FormData,
): Promise<DashboardActionState> {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const type = formData.get('type') as string;
  const basePrice = formData.get('basePrice') as string;

  const fieldErrors: Record<string, string> = {};
  if (!name?.trim()) fieldErrors.name = 'Name is required';
  if (!type || type === '') {
    fieldErrors.type = 'Type is required';
  } else if (!isValidAdSlotType(type)) {
    fieldErrors.type = 'Invalid type';
  }
  if (!basePrice || Number(basePrice) <= 0) {
    fieldErrors.basePrice = 'Base price must be a positive number';
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }

  try {
    const cookie = await cookieHeaderForApi();
    await createAdSlot(
      {
        name: name.trim(),
        description: description?.trim() || undefined,
        type,
        basePrice: Number(basePrice),
      },
      { headers: { cookie } },
    );
    revalidatePath('/dashboard/publisher');
    return { success: true };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Failed to create ad slot' };
  }
}

export async function updateAdSlotAction(
  _prevState: DashboardActionState,
  formData: FormData,
): Promise<DashboardActionState> {
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const type = formData.get('type') as string;
  const basePrice = formData.get('basePrice') as string;

  const fieldErrors: Record<string, string> = {};
  if (!name?.trim()) fieldErrors.name = 'Name is required';
  if (!type || type === '') {
    fieldErrors.type = 'Type is required';
  } else if (!isValidAdSlotType(type)) {
    fieldErrors.type = 'Invalid type';
  }
  if (!basePrice || Number(basePrice) <= 0) {
    fieldErrors.basePrice = 'Base price must be a positive number';
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }

  try {
    const cookie = await cookieHeaderForApi();
    await updateAdSlot(
      id,
      {
        name: name.trim(),
        description: description?.trim() || undefined,
        type,
        basePrice: Number(basePrice),
      },
      { headers: { cookie } },
    );
    revalidatePath('/dashboard/publisher');
    return { success: true };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Failed to update ad slot' };
  }
}

export async function deleteAdSlotAction(
  _prevState: DashboardActionState,
  formData: FormData,
): Promise<DashboardActionState> {
  const id = formData.get('id') as string;

  try {
    const cookie = await cookieHeaderForApi();
    await deleteAdSlot(id, { headers: { cookie } });
    revalidatePath('/dashboard/publisher');
    return { success: true };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Failed to delete ad slot' };
  }
}
