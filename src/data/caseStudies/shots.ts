/* The capture manifest, typed.
 *
 * `shots/<study>.json` is written by `npm run shots` — every annotation box in
 * it was measured off the live DOM at capture time, so nothing is positioned
 * by hand and nothing drifts when a client edits a page. Re-run the capture
 * and the boxes move with the site.
 *
 * One file per study rather than one shared manifest: five capture runs go at
 * once, and a shared file would have them overwriting each other's work.
 */

import andys from './shots/andys.json';
import bullfrog from './shots/bullfrog.json';
import seacave from './shots/seacave.json';
import presqueisle from './shots/presqueisle.json';
import middleman from './shots/middleman.json';

/** Percentages of the capture, so the box scales with the rendered phone. */
export interface Box {
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
}

export interface ManifestShot {
  readonly src: string;
  /** Domain drawn in the Safari address bar. */
  readonly url: string;
  readonly alt: string;
  /** Absent on cover shots — those are the title wall, not evidence. */
  readonly box?: Box;
  /** 2–5 words on the marker. Pairs with the box. */
  readonly note?: string;
}

const STUDIES: Record<string, Record<string, ManifestShot>> = {
  andys,
  bullfrog,
  seacave,
  presqueisle,
  middleman,
};

export const SHOTS: Record<string, ManifestShot> = Object.fromEntries(
  Object.entries(STUDIES).flatMap(([study, shots]) =>
    Object.entries(shots).map(([id, shot]) => [`${study}/${id}`, shot]),
  ),
);

/** Ids are `<study>/<shot>`. A miss is a spec that was renamed and not swept,
    so it fails the budget check rather than rendering a hole. */
export function getShot(id: string): ManifestShot | undefined {
  return SHOTS[id];
}
