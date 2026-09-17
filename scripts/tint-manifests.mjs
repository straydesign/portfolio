/* iOS Safari does not paint a light toolbar on a dark page. The status area
 * takes the top of the document and the bottom toolbar takes what is behind
 * it, so a light grey slab over a dark navy species page is the one part of
 * the frame that gives it away as drawn rather than photographed.
 *
 * The tint is measured, not declared: the strip of each capture that ends up
 * behind each bar is sampled and its mean relative luminance decides. Run this
 * after `capture-shots.mjs` — it only ever adds `tintTop`/`tintBottom` to the
 * manifest, so re-running it on unchanged captures is a no-op.
 *
 * The strips are the bars' own coverage, worked back from the frame geometry:
 * a 13.2cqw status bar and a 15.2cqw toolbar against a 208.3cqw screen.
 */
import { readFile, writeFile } from 'fs/promises';
import { createRequire } from 'module';
const sharp = createRequire(import.meta.url)('sharp');

const TOP = 0.0634;
const BOTTOM = 0.0730;
// Below this the bar is drawn dark. Sits above mid-grey on purpose: a bar is
// translucent, so it has to go dark a little before the content behind it does.
const DARK_BELOW = 0.42;

async function lumaOfStrip(file, from, to) {
  const img = sharp(file);
  const { width, height } = await img.metadata();
  const top = Math.round(height * from);
  const h = Math.max(1, Math.round(height * (to - from)));
  const { data } = await sharp(file)
    .extract({ left: 0, top, width, height: h })
    .resize(1, 1, { fit: 'fill' })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const [r, g, b] = data;
  // Rec. 709 on sRGB values, which is close enough to decide light vs dark.
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

for (const slug of ['andys', 'bullfrog', 'seacave', 'presqueisle', 'middleman']) {
  const path = `src/data/caseStudies/shots/${slug}.json`;
  const manifest = JSON.parse(await readFile(path, 'utf8'));
  let dark = 0;
  for (const [id, shot] of Object.entries(manifest)) {
    const file = `public${shot.src}`;
    const t = await lumaOfStrip(file, 0, TOP);
    const b = await lumaOfStrip(file, 1 - BOTTOM, 1);
    shot.tintTop = t < DARK_BELOW ? 'dark' : 'light';
    shot.tintBottom = b < DARK_BELOW ? 'dark' : 'light';
    if (shot.tintTop === 'dark') dark += 1;
  }
  await writeFile(path, JSON.stringify(manifest, null, 2) + '\n');
  const n = Object.keys(manifest).length;
  console.log(`${slug.padEnd(12)} ${n} shots, ${dark} with a dark status bar`);
}
