/**
 * Lightweight SVG illustration — no remote images, instant paint.
 */
export function LandingHeroVisual() {
  return (
    <svg
      viewBox="0 0 480 360"
      className="h-auto w-full drop-shadow-sm"
      aria-hidden
      role="img"
    >
      <defs>
        <linearGradient id="hero-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="node-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
      </defs>
      <rect x="24" y="24" width="432" height="312" rx="24" fill="url(#hero-grad)" />
      <g stroke="#4f46e5" strokeWidth="2" strokeOpacity="0.35" fill="none">
        <path d="M120 180 L240 120 L360 180" />
        <path d="M120 180 L240 240 L360 180" />
      </g>
      <circle cx="120" cy="180" r="36" fill="url(#node-grad)" />
      <circle cx="240" cy="120" r="40" fill="url(#node-grad)" />
      <circle cx="360" cy="180" r="36" fill="url(#node-grad)" />
      <circle cx="240" cy="240" r="32" fill="#10b981" opacity="0.9" />
      <text
        x="240"
        y="128"
        textAnchor="middle"
        fill="white"
        fontSize="14"
        fontWeight="600"
        fontFamily="system-ui, sans-serif"
      >
        Sponsor
      </text>
      <text
        x="120"
        y="186"
        textAnchor="middle"
        fill="white"
        fontSize="11"
        fontWeight="600"
        fontFamily="system-ui, sans-serif"
      >
        Slot A
      </text>
      <text
        x="360"
        y="186"
        textAnchor="middle"
        fill="white"
        fontSize="11"
        fontWeight="600"
        fontFamily="system-ui, sans-serif"
      >
        Slot B
      </text>
      <text
        x="240"
        y="246"
        textAnchor="middle"
        fill="white"
        fontSize="12"
        fontWeight="600"
        fontFamily="system-ui, sans-serif"
      >
        Publisher
      </text>
    </svg>
  );
}
