import { Router, type Response, type IRouter } from 'express';
import type { Prisma } from '../generated/prisma/client.js';
import { prisma } from '../db.js';
import { getParam } from '../utils/helpers.js';
import { authMiddleware, roleMiddleware, type AuthRequest } from '../auth.js';
import {
  parseOptionalCampaignStatusQuery,
  parseOptionalCampaignStatusBody,
  parsePositiveAmount,
  parseOptionalPositiveAmount,
  parseRequiredDate,
  parseOptionalDate,
  parseStringArray,
} from '../utils/validation.js';

const router: IRouter = Router();

// GET /api/campaigns - List campaigns for the authenticated sponsor
router.get(
  '/',
  authMiddleware,
  roleMiddleware(['SPONSOR']),
  async (req: AuthRequest, res: Response) => {
    try {
      const sponsorId = req.user!.sponsorId;
      if (!sponsorId) {
        res.status(403).json({ error: 'Sponsor profile not found' });
        return;
      }

      const { status } = req.query;
      const statusParse = parseOptionalCampaignStatusQuery(status);
      if (!statusParse.ok) {
        res.status(400).json({ error: 'Invalid status query parameter' });
        return;
      }

      const campaigns = await prisma.campaign.findMany({
        where: {
          sponsorId,
          ...(statusParse.value !== undefined && { status: statusParse.value }),
        },
        include: {
          sponsor: { select: { id: true, name: true, logo: true } },
          _count: { select: { creatives: true, placements: true } },
        },
        orderBy: { createdAt: 'desc' },
      });

      res.json(campaigns);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      res.status(500).json({ error: 'Failed to fetch campaigns' });
    }
  },
);

// GET /api/campaigns/:id - Get single campaign (sponsor owner only)
router.get(
  '/:id',
  authMiddleware,
  roleMiddleware(['SPONSOR']),
  async (req: AuthRequest, res: Response) => {
    try {
      const sponsorId = req.user!.sponsorId;
      if (!sponsorId) {
        res.status(403).json({ error: 'Sponsor profile not found' });
        return;
      }

      const id = getParam(req.params.id);
      const campaign = await prisma.campaign.findUnique({
        where: { id },
        include: {
          sponsor: true,
          creatives: true,
          placements: {
            include: {
              adSlot: true,
              publisher: { select: { id: true, name: true, category: true } },
            },
          },
        },
      });

      if (!campaign) {
        res.status(404).json({ error: 'Campaign not found' });
        return;
      }

      if (campaign.sponsorId !== sponsorId) {
        res.status(403).json({ error: 'Access denied' });
        return;
      }

      res.json(campaign);
    } catch (error) {
      console.error('Error fetching campaign:', error);
      res.status(500).json({ error: 'Failed to fetch campaign' });
    }
  },
);

// POST /api/campaigns - Create new campaign for the authenticated sponsor
router.post(
  '/',
  authMiddleware,
  roleMiddleware(['SPONSOR']),
  async (req: AuthRequest, res: Response) => {
    try {
      const sponsorId = req.user!.sponsorId;
      if (!sponsorId) {
        res.status(403).json({ error: 'Sponsor profile not found' });
        return;
      }

      const { name, description, budget, cpmRate, cpcRate, startDate, endDate, targetCategories, targetRegions } =
        req.body;

      if (!name || budget === undefined || budget === null || !startDate || !endDate) {
        res.status(400).json({
          error: 'Name, budget, startDate, and endDate are required',
        });
        return;
      }

      const budgetParsed = parsePositiveAmount(budget, 'budget');
      if (!budgetParsed.ok) {
        res.status(400).json({ error: budgetParsed.error });
        return;
      }

      const startParsed = parseRequiredDate(startDate, 'startDate');
      if (!startParsed.ok) {
        res.status(400).json({ error: startParsed.error });
        return;
      }

      const endParsed = parseRequiredDate(endDate, 'endDate');
      if (!endParsed.ok) {
        res.status(400).json({ error: endParsed.error });
        return;
      }

      if (endParsed.value.getTime() < startParsed.value.getTime()) {
        res.status(400).json({ error: 'endDate must be on or after startDate' });
        return;
      }

      let cpm: number | undefined;
      if (cpmRate !== undefined && cpmRate !== null && cpmRate !== '') {
        const c = parsePositiveAmount(cpmRate, 'cpmRate');
        if (!c.ok) {
          res.status(400).json({ error: c.error });
          return;
        }
        cpm = c.value;
      }

      let cpc: number | undefined;
      if (cpcRate !== undefined && cpcRate !== null && cpcRate !== '') {
        const c = parsePositiveAmount(cpcRate, 'cpcRate');
        if (!c.ok) {
          res.status(400).json({ error: c.error });
          return;
        }
        cpc = c.value;
      }

      const campaign = await prisma.campaign.create({
        data: {
          name,
          description,
          budget: budgetParsed.value,
          cpmRate: cpm,
          cpcRate: cpc,
          startDate: startParsed.value,
          endDate: endParsed.value,
          targetCategories: parseStringArray(targetCategories),
          targetRegions: parseStringArray(targetRegions),
          sponsorId,
        },
        include: {
          sponsor: { select: { id: true, name: true } },
        },
      });

      res.status(201).json(campaign);
    } catch (error) {
      console.error('Error creating campaign:', error);
      res.status(500).json({ error: 'Failed to create campaign' });
    }
  },
);

// PUT /api/campaigns/:id - Update campaign (owner only)
router.put(
  '/:id',
  authMiddleware,
  roleMiddleware(['SPONSOR']),
  async (req: AuthRequest, res: Response) => {
    try {
      const sponsorId = req.user!.sponsorId;
      if (!sponsorId) {
        res.status(403).json({ error: 'Sponsor profile not found' });
        return;
      }

      const id = getParam(req.params.id);

      const existing = await prisma.campaign.findFirst({
        where: { id, sponsorId },
      });

      if (!existing) {
        res.status(404).json({ error: 'Campaign not found' });
        return;
      }

      const { name, description, budget, cpmRate, cpcRate, startDate, endDate, targetCategories, targetRegions, status } =
        req.body;

      const data: Prisma.CampaignUpdateInput = {};
      if (name !== undefined) data.name = name;
      if (description !== undefined) data.description = description;
      if (budget !== undefined) {
        const p = parseOptionalPositiveAmount(budget, 'budget');
        if (!p.ok) {
          res.status(400).json({ error: p.error });
          return;
        }
        if (p.value !== undefined) data.budget = p.value;
      }
      if (cpmRate !== undefined) {
        if (cpmRate === null || cpmRate === '') {
          data.cpmRate = null;
        } else {
          const p = parsePositiveAmount(cpmRate, 'cpmRate');
          if (!p.ok) {
            res.status(400).json({ error: p.error });
            return;
          }
          data.cpmRate = p.value;
        }
      }
      if (cpcRate !== undefined) {
        if (cpcRate === null || cpcRate === '') {
          data.cpcRate = null;
        } else {
          const p = parsePositiveAmount(cpcRate, 'cpcRate');
          if (!p.ok) {
            res.status(400).json({ error: p.error });
            return;
          }
          data.cpcRate = p.value;
        }
      }
      if (startDate !== undefined) {
        const d = parseOptionalDate(startDate, 'startDate');
        if (!d.ok) {
          res.status(400).json({ error: d.error });
          return;
        }
        if (d.value !== undefined) data.startDate = d.value;
      }
      if (endDate !== undefined) {
        const d = parseOptionalDate(endDate, 'endDate');
        if (!d.ok) {
          res.status(400).json({ error: d.error });
          return;
        }
        if (d.value !== undefined) data.endDate = d.value;
      }
      if (targetCategories !== undefined) {
        data.targetCategories = parseStringArray(targetCategories);
      }
      if (targetRegions !== undefined) {
        data.targetRegions = parseStringArray(targetRegions);
      }
      if (status !== undefined) {
        const s = parseOptionalCampaignStatusBody(status);
        if (!s.ok) {
          res.status(400).json({ error: 'Invalid campaign status' });
          return;
        }
        if (s.value !== undefined) data.status = s.value;
      }

      if (Object.keys(data).length === 0) {
        res.status(400).json({ error: 'No fields to update' });
        return;
      }

      const updated = await prisma.campaign.update({
        where: { id },
        data,
        include: {
          sponsor: { select: { id: true, name: true } },
        },
      });

      res.json(updated);
    } catch (error) {
      console.error('Error updating campaign:', error);
      res.status(500).json({ error: 'Failed to update campaign' });
    }
  },
);

// DELETE /api/campaigns/:id - Delete campaign (owner only)
router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(['SPONSOR']),
  async (req: AuthRequest, res: Response) => {
    try {
      const sponsorId = req.user!.sponsorId;
      if (!sponsorId) {
        res.status(403).json({ error: 'Sponsor profile not found' });
        return;
      }

      const id = getParam(req.params.id);

      const campaign = await prisma.campaign.findFirst({
        where: { id, sponsorId },
      });

      if (!campaign) {
        res.status(404).json({ error: 'Campaign not found' });
        return;
      }

      await prisma.campaign.delete({ where: { id } });
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting campaign:', error);
      res.status(500).json({ error: 'Failed to delete campaign' });
    }
  },
);

export default router;
