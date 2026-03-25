/** Deterministic placeholder imagery for listings (no CDN upload flow yet). */
export function adSlotImageUrl(id: string, width: number, height: number) {
  return `https://picsum.photos/seed/${encodeURIComponent(id)}/${width}/${height}`;
}
