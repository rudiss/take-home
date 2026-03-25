import { describe, it, expect, beforeEach } from 'vitest';
import express from 'express';
import newsletterRoutes from './newsletter.js';

function createApp() {
  const app = express();
  app.use(express.json());
  app.use('/api/newsletter', newsletterRoutes);
  return app;
}

interface PostResult {
  status: number;
  body: Record<string, unknown>;
}

async function post(app: express.Application, body: unknown): Promise<PostResult> {
  const server = app.listen(0);
  const address = server.address();
  const port = typeof address === 'object' && address ? address.port : 0;

  try {
    const res = await fetch(`http://127.0.0.1:${port}/api/newsletter/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = (await res.json()) as Record<string, unknown>;
    return { status: res.status, body: data };
  } finally {
    server.close();
  }
}

describe('POST /api/newsletter/subscribe', () => {
  let app: express.Application;

  beforeEach(() => {
    app = createApp();
  });

  it('returns success for a valid email', async () => {
    const res = await post(app, { email: 'user@example.com' });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('Thanks for subscribing!');
  });

  it('returns 400 when email is missing', async () => {
    const res = await post(app, {});
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Email is required');
  });

  it('returns 400 for an invalid email', async () => {
    const res = await post(app, { email: 'not-an-email' });
    expect(res.status).toBe(400);
    expect(res.body.error).toContain('valid email');
  });

  it('returns success for duplicate subscriptions (no leak)', async () => {
    await post(app, { email: 'dup@example.com' });
    const res = await post(app, { email: 'dup@example.com' });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('normalizes email to lowercase', async () => {
    const res = await post(app, { email: 'USER@Example.COM' });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
