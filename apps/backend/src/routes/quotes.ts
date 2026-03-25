import { randomUUID } from 'node:crypto';
import { Router, type Response, type IRouter } from 'express';
import { prisma } from '../db.js';
import {
  parseNonEmptyString,
  parseOptionalTrimmedString,
  parseRequiredEmail,
} from '../utils/validation.js';

const router: IRouter = Router();

/**
 * POST /api/quotes/request — public lead capture (no persistence, no email).
 */
router.post('/request', async (req, res: Response) => {
  try {
    const body = req.body as Record<string, unknown>;

    const adSlotIdRaw = body.adSlotId;
    if (typeof adSlotIdRaw !== 'string' || !adSlotIdRaw.trim()) {
      res.status(400).json({ error: 'adSlotId is required' });
      return;
    }
    const adSlotId = adSlotIdRaw.trim();

    const slot = await prisma.adSlot.findUnique({
      where: { id: adSlotId },
      select: { id: true },
    });
    if (!slot) {
      res.status(404).json({ error: 'Ad slot not found' });
      return;
    }

    const company = parseNonEmptyString(body.companyName, 'companyName', 2);
    if (!company.ok) {
      res.status(400).json({ error: company.error });
      return;
    }

    const email = parseRequiredEmail(body.email, 'email');
    if (!email.ok) {
      res.status(400).json({ error: email.error });
      return;
    }

    const campaignDetails = parseNonEmptyString(body.campaignDetails, 'campaignDetails', 10);
    if (!campaignDetails.ok) {
      res.status(400).json({ error: campaignDetails.error });
      return;
    }

    const phone = parseOptionalTrimmedString(body.phone);
    if (!phone.ok) {
      res.status(400).json({ error: phone.error });
      return;
    }

    const budgetRange = parseOptionalTrimmedString(body.budgetRange);
    if (!budgetRange.ok) {
      res.status(400).json({ error: budgetRange.error });
      return;
    }

    const timeline = parseOptionalTrimmedString(body.timeline);
    if (!timeline.ok) {
      res.status(400).json({ error: timeline.error });
      return;
    }

    const specialRequirements = parseOptionalTrimmedString(body.specialRequirements);
    if (!specialRequirements.ok) {
      res.status(400).json({ error: specialRequirements.error });
      return;
    }

    if (process.env.NODE_ENV === 'development') {
      console.debug('[quotes/request]', {
        adSlotId,
        companyName: company.value,
        email: email.value,
        phone: phone.value,
        budgetRange: budgetRange.value,
        timeline: timeline.value,
        campaignDetails: campaignDetails.value,
        specialRequirements: specialRequirements.value,
      });
    }

    const quoteId = randomUUID();
    res.status(201).json({ success: true, quoteId });
  } catch (error) {
    console.error('Error handling quote request:', error);
    res.status(500).json({ error: 'Failed to submit quote request' });
  }
});

export default router;
