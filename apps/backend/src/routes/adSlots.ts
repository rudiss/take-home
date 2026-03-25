import { Router, type Response, type IRouter } from 'express';
import type { Prisma } from '../generated/prisma/client.js';
import { prisma } from '../db.js';
import { getParam } from '../utils/helpers.js';
import { authMiddleware, roleMiddleware, type AuthRequest } from '../auth.js';
import {
  parseOptionalAdSlotTypeQuery,
  parseRequiredAdSlotType,
  parseOptionalAdSlotTypeBody,
  parsePositiveAmount,
  parseOptionalPositiveAmount,
  parseOptionalInt,
  parseOptionalBoolean,
} from '../utils/validation.js';

const router: IRouter = Router();

// GET /api/ad-slots/marketplace - Public: browse available ad slots (no auth required)
// Supports pagination via ?page=1&limit=6 query params
router.get('/marketplace', async (req, res: Response) => {
  try {
    const page = Math.max(1, parseInt(String(req.query.page ?? ''), 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(String(req.query.limit ?? ''), 10) || 6));
    const skip = (page - 1) * limit;

    const [adSlots, total] = await Promise.all([
      prisma.adSlot.findMany({
        where: { isAvailable: true },
        include: {
          publisher: { select: { id: true, name: true, category: true, monthlyViews: true } },
          _count: { select: { placements: true } },
        },
        orderBy: { basePrice: 'desc' },
        skip,
        take: limit,
      }),
      prisma.adSlot.count({ where: { isAvailable: true } }),
    ]);

    res.json({
      data: adSlots,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching marketplace ad slots:', error);
    res.status(500).json({ error: 'Failed to fetch ad slots' });
  }
});

// GET /api/ad-slots/marketplace/:id - Public: view single ad slot details (no auth required)
router.get('/marketplace/:id', async (req, res: Response) => {
  try {
    const id = getParam(req.params.id);
    const adSlot = await prisma.adSlot.findUnique({
      where: { id },
      include: {
        publisher: {
          select: { id: true, name: true, category: true, website: true, monthlyViews: true },
        },
      },
    });

    if (!adSlot) {
      res.status(404).json({ error: 'Ad slot not found' });
      return;
    }

    res.json(adSlot);
  } catch (error) {
    console.error('Error fetching marketplace ad slot:', error);
    res.status(500).json({ error: 'Failed to fetch ad slot' });
  }
});

// GET /api/ad-slots - List ad slots (authenticated, owner-scoped)
// Publishers see only their own slots; sponsors see all available slots (marketplace)
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { type, available } = req.query;

    const typeParse = parseOptionalAdSlotTypeQuery(type);
    if (!typeParse.ok) {
      res.status(400).json({ error: 'Invalid type query parameter' });
      return;
    }

    const adSlots = await prisma.adSlot.findMany({
      where: {
        ...(req.user!.role === 'PUBLISHER' && { publisherId: req.user!.publisherId }),
        ...(typeParse.value !== undefined && { type: typeParse.value }),
        ...(available === 'true' && { isAvailable: true }),
      },
      include: {
        publisher: { select: { id: true, name: true, category: true, monthlyViews: true } },
        _count: { select: { placements: true } },
      },
      orderBy: { basePrice: 'desc' },
    });

    res.json(adSlots);
  } catch (error) {
    console.error('Error fetching ad slots:', error);
    res.status(500).json({ error: 'Failed to fetch ad slots' });
  }
});

// POST /api/ad-slots/:id/book — sponsors only (marketplace booking)
router.post(
  '/:id/book',
  authMiddleware,
  roleMiddleware(['SPONSOR']),
  async (req: AuthRequest, res: Response) => {
    try {
      const id = getParam(req.params.id);

      const adSlot = await prisma.adSlot.findUnique({
        where: { id },
        include: { publisher: true },
      });

      if (!adSlot) {
        res.status(404).json({ error: 'Ad slot not found' });
        return;
      }

      if (!adSlot.isAvailable) {
        res.status(400).json({ error: 'Ad slot is no longer available' });
        return;
      }

      const updatedSlot = await prisma.adSlot.update({
        where: { id },
        data: { isAvailable: false },
        include: {
          publisher: { select: { id: true, name: true } },
        },
      });

      res.json({
        success: true,
        message: 'Ad slot booked successfully!',
        adSlot: updatedSlot,
      });
    } catch (error) {
      console.error('Error booking ad slot:', error);
      res.status(500).json({ error: 'Failed to book ad slot' });
    }
  },
);

// POST /api/ad-slots/:id/unbook — publisher who owns the slot only (reset listing)
router.post(
  '/:id/unbook',
  authMiddleware,
  roleMiddleware(['PUBLISHER']),
  async (req: AuthRequest, res: Response) => {
    try {
      const id = getParam(req.params.id);

      const owned = await prisma.adSlot.findFirst({
        where: { id, publisherId: req.user!.publisherId },
      });

      if (!owned) {
        res.status(404).json({ error: 'Ad slot not found' });
        return;
      }

      const updatedSlot = await prisma.adSlot.update({
        where: { id },
        data: { isAvailable: true },
        include: {
          publisher: { select: { id: true, name: true } },
        },
      });

      res.json({
        success: true,
        message: 'Ad slot is now available again',
        adSlot: updatedSlot,
      });
    } catch (error) {
      console.error('Error unbooking ad slot:', error);
      res.status(500).json({ error: 'Failed to unbook ad slot' });
    }
  },
);

// GET /api/ad-slots/:id - Get single ad slot (must belong to authenticated user)
router.get('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const id = getParam(req.params.id);
    const adSlot = await prisma.adSlot.findUnique({
      where: { id },
      include: {
        publisher: true,
        placements: {
          include: {
            campaign: { select: { id: true, name: true, status: true } },
          },
        },
      },
    });

    if (!adSlot) {
      res.status(404).json({ error: 'Ad slot not found' });
      return;
    }

    if (req.user!.role === 'PUBLISHER' && adSlot.publisherId !== req.user!.publisherId) {
      res.status(403).json({ error: 'Access denied' });
      return;
    }

    res.json(adSlot);
  } catch (error) {
    console.error('Error fetching ad slot:', error);
    res.status(500).json({ error: 'Failed to fetch ad slot' });
  }
});

// POST /api/ad-slots - Create new ad slot for the authenticated publisher
router.post(
  '/',
  authMiddleware,
  roleMiddleware(['PUBLISHER']),
  async (req: AuthRequest, res: Response) => {
    try {
      const publisherId = req.user!.publisherId;
      if (!publisherId) {
        res.status(403).json({ error: 'Publisher profile not found' });
        return;
      }

      const { name, description, type, dimensions, basePrice } = req.body;

      if (!name || !type || basePrice === undefined || basePrice === null) {
        res.status(400).json({
          error: 'Name, type, and basePrice are required',
        });
        return;
      }

      const typeParsed = parseRequiredAdSlotType(type);
      if (!typeParsed.ok) {
        res.status(400).json({ error: 'Invalid ad slot type' });
        return;
      }

      const priceParsed = parsePositiveAmount(basePrice, 'basePrice');
      if (!priceParsed.ok) {
        res.status(400).json({ error: priceParsed.error });
        return;
      }

      let width: number | undefined;
      let height: number | undefined;
      if (dimensions && typeof dimensions === 'object' && !Array.isArray(dimensions)) {
        const d = dimensions as { width?: unknown; height?: unknown };
        if (typeof d.width === 'number') width = d.width;
        if (typeof d.height === 'number') height = d.height;
      }

      const adSlot = await prisma.adSlot.create({
        data: {
          name,
          description,
          type: typeParsed.value,
          width,
          height,
          basePrice: priceParsed.value,
          publisherId,
        },
        include: {
          publisher: { select: { id: true, name: true } },
        },
      });

      res.status(201).json(adSlot);
    } catch (error) {
      console.error('Error creating ad slot:', error);
      res.status(500).json({ error: 'Failed to create ad slot' });
    }
  },
);

// PUT /api/ad-slots/:id - Update ad slot (owner only)
router.put(
  '/:id',
  authMiddleware,
  roleMiddleware(['PUBLISHER']),
  async (req: AuthRequest, res: Response) => {
    try {
      const id = getParam(req.params.id);

      const adSlot = await prisma.adSlot.findFirst({
        where: { id, publisherId: req.user!.publisherId },
      });

      if (!adSlot) {
        res.status(404).json({ error: 'Ad slot not found' });
        return;
      }

      const { name, description, type, position, width, height, basePrice, cpmFloor, isAvailable } = req.body;

      const data: Prisma.AdSlotUpdateInput = {};
      if (name !== undefined) data.name = name;
      if (description !== undefined) data.description = description;
      if (type !== undefined) {
        const t = parseOptionalAdSlotTypeBody(type);
        if (!t.ok) {
          res.status(400).json({ error: 'Invalid ad slot type' });
          return;
        }
        if (t.value !== undefined) data.type = t.value;
      }
      if (position !== undefined) data.position = position;
      if (width !== undefined) {
        const w = parseOptionalInt(width, 'width', 0);
        if (!w.ok) {
          res.status(400).json({ error: w.error });
          return;
        }
        if (w.value !== undefined) data.width = w.value;
      }
      if (height !== undefined) {
        const h = parseOptionalInt(height, 'height', 0);
        if (!h.ok) {
          res.status(400).json({ error: h.error });
          return;
        }
        if (h.value !== undefined) data.height = h.value;
      }
      if (basePrice !== undefined) {
        const p = parseOptionalPositiveAmount(basePrice, 'basePrice');
        if (!p.ok) {
          res.status(400).json({ error: p.error });
          return;
        }
        if (p.value !== undefined) data.basePrice = p.value;
      }
      if (cpmFloor !== undefined) {
        const p = parseOptionalPositiveAmount(cpmFloor, 'cpmFloor');
        if (!p.ok) {
          res.status(400).json({ error: p.error });
          return;
        }
        if (p.value !== undefined) data.cpmFloor = p.value;
      }
      if (isAvailable !== undefined) {
        const b = parseOptionalBoolean(isAvailable);
        if (!b.ok) {
          res.status(400).json({ error: b.error });
          return;
        }
        if (b.value !== undefined) data.isAvailable = b.value;
      }

      if (Object.keys(data).length === 0) {
        res.status(400).json({ error: 'No fields to update' });
        return;
      }

      const updated = await prisma.adSlot.update({
        where: { id },
        data,
        include: {
          publisher: { select: { id: true, name: true } },
        },
      });

      res.json(updated);
    } catch (error) {
      console.error('Error updating ad slot:', error);
      res.status(500).json({ error: 'Failed to update ad slot' });
    }
  },
);

// DELETE /api/ad-slots/:id - Delete ad slot (owner only)
router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(['PUBLISHER']),
  async (req: AuthRequest, res: Response) => {
    try {
      const id = getParam(req.params.id);

      const slot = await prisma.adSlot.findFirst({
        where: { id, publisherId: req.user!.publisherId },
      });

      if (!slot) {
        res.status(404).json({ error: 'Ad slot not found' });
        return;
      }

      await prisma.adSlot.delete({ where: { id } });
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting ad slot:', error);
      res.status(500).json({ error: 'Failed to delete ad slot' });
    }
  },
);

export default router;
