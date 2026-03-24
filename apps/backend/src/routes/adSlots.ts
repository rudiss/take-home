import { Router, type Response, type IRouter } from 'express';
import { prisma, type AdSlotType } from '../db.js';
import { getParam } from '../utils/helpers.js';
import { authMiddleware, roleMiddleware, type AuthRequest } from '../auth.js';

const router: IRouter = Router();

// GET /api/ad-slots - List ad slots
// Publishers see only their own slots; sponsors see all available slots (marketplace)
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { type, available } = req.query;

    const adSlots = await prisma.adSlot.findMany({
      where: {
        // Publishers see only their own; sponsors see all
        ...(req.user!.role === 'PUBLISHER' && { publisherId: req.user!.publisherId }),
        ...(type && {
          type: type as string as 'DISPLAY' | 'VIDEO' | 'NATIVE' | 'NEWSLETTER' | 'PODCAST',
        }),
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

    // Publishers can only view their own slots; sponsors can view any (marketplace)
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
      const { name, description, type, dimensions, basePrice } = req.body;

      if (!name || !type || !basePrice) {
        res.status(400).json({
          error: 'Name, type, and basePrice are required',
        });
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
          type: type as AdSlotType,
          width,
          height,
          basePrice,
          publisherId: req.user!.publisherId!,
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

// POST /api/ad-slots/:id/book - Book an ad slot (requires authentication)
router.post('/:id/book', authMiddleware, async (req: AuthRequest, res: Response) => {
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
});

// POST /api/ad-slots/:id/unbook - Reset ad slot to available (requires authentication)
router.post('/:id/unbook', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const id = getParam(req.params.id);

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
});

export default router;
