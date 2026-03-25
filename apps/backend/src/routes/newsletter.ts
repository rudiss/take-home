import { Router, type Request, type Response, type IRouter } from 'express';

const router: IRouter = Router();

// In-memory set to prevent duplicate subscriptions (demo only)
const subscribers = new Set<string>();

// POST /api/newsletter/subscribe - Subscribe to newsletter
router.post('/subscribe', (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email || typeof email !== 'string') {
    res.status(400).json({ error: 'Email is required' });
    return;
  }

  const trimmed = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(trimmed)) {
    res.status(400).json({ error: 'Please enter a valid email address' });
    return;
  }

  if (subscribers.has(trimmed)) {
    // Return success to avoid leaking subscription status
    res.json({ success: true, message: 'Thanks for subscribing!' });
    return;
  }

  subscribers.add(trimmed);
  console.log(`[Newsletter] New subscriber: ${trimmed} (total: ${subscribers.size})`);

  res.json({ success: true, message: 'Thanks for subscribing!' });
});

export default router;
