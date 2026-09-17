/* The last step of the mockup pipeline: the PNGs Photoshop exported are
 * 8-10MB each with an alpha channel, which is a render, not a web asset.
 *
 * WebP keeps the alpha — the handset is cut out, so any format without it
 * would reintroduce the rectangle the drop-shadow is meant to avoid. Quality
 * 82 because these are photographs of glass and anodised aluminium: the
 * gradients across the frame band before the screen does.
 *
 *   node scripts/ps/publish-devices.mjs
 */
import { readdir, mkdir, stat } from 'fs/promises';
import { createRequire } from 'module';
import path from 'path';

const sharp = createRequire(import.meta.url)('sharp');

const SRC = path.resolve('.ps-run/out');
const DEST = path.resolve('public/images/devices');

await mkdir(DEST, { recursive: true });
const files = (await readdir(SRC)).filter((f) => /^(phone|laptop)-.+\.png$/.test(f));
if (!files.length) throw new Error(`nothing to publish in ${SRC}`);

let total = 0;
for (const file of files.sort()) {
  const from = path.join(SRC, file);
  const to = path.join(DEST, file.replace(/\.png$/, '.webp'));
  const meta = await sharp(from).metadata();
  await sharp(from).webp({ quality: 82, alphaQuality: 90, effort: 6 }).toFile(to);
  const before = (await stat(from)).size;
  const after = (await stat(to)).size;
  total += after;
  console.log(
    `${path.basename(to).padEnd(24)} ${meta.width}x${meta.height}  ` +
    `${(before / 1048576).toFixed(1)}MB -> ${(after / 1024).toFixed(0)}KB` +
    `${meta.hasAlpha ? '' : '  NO ALPHA'}`,
  );
}
console.log(`\n${files.length} device renders, ${(total / 1024).toFixed(0)}KB total, in public/images/devices`);
