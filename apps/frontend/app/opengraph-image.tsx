import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Anvara — Sponsorship marketplace for brands and publishers';

export const size = { width: 1200, height: 630 };

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1e1b4b 0%, #4f46e5 42%, #047857 100%)',
          padding: 72,
          color: '#f9fafb',
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        <div style={{ fontSize: 56, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          Anvara
        </div>
        <div
          style={{
            fontSize: 26,
            marginTop: 20,
            opacity: 0.92,
            maxWidth: 640,
            lineHeight: 1.35,
            fontWeight: 500,
          }}
        >
          Where sponsors find premium placements—and publishers monetize with confidence.
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 18,
            opacity: 0.75,
            letterSpacing: '0.02em',
          }}
        >
          anvara.marketplace
        </div>
      </div>
    ),
    { ...size },
  );
}
