#!/usr/bin/env node
/**
 * The home-page pair each project card shows: `home-desktop.webp` at
 * 1800x1125 and `home-mobile.webp` at 900x1948, read by src/data/projects.ts
 * as `screenshot` and `phoneScreenshot`.
 *
 *   node scripts/capture-home-pair.mjs [study ...]     (default: all five)
 *
 * These two were the only captures on the site with no pipeline behind them,
 * and it showed: Andy's and Bullfrog float an expanded HOURS card over the top
 * right of every route, `capture-shots.mjs` has clicked it shut since the day
 * it was written, and this pair never went through it. Bullfrog shipped with
 * the card sitting across "Neighborhood Bar." on the phone. Tom found it on
 * the live site.
 *
 * So the settings here are that script's, not a second set: the same
 * 390x844 mobile context, the same reduced motion, the same `site.dismiss`
 * from shots.config.mjs. A selector that stops matching is a loud failure
 * rather than a quiet one — the run reports what it clicked.
 */
import { chromium } from 'playwright';
import { createRequire } from 'module';
import { mkdir } from 'fs/promises';
import path from 'path';
import { SITES } from './shots.config.mjs';

const sharp = createRequire(import.meta.url)('sharp');

const OUT = (study) => path.resolve('public/images/case-studies', study);
const STUDIES = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ['seacave', 'andys', 'bullfrog', 'presqueisle', 'middleman'];

/* Captured large and resized down, which is what the shipped files are: a
   390x844 viewport at 3x is 1170x2532, published at 900x1948. */
const MOBILE = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true };
const DESKTOP = { viewport: { width: 1280, height: 800 }, deviceScaleFactor: 2 };
const MOBILE_OUT = { w: 900, h: 1948 };
const DESKTOP_OUT = { w: 1800, h: 1125 };

const browser = await chromium.launch();
let failed = 0;

for (const study of STUDIES) {
  const site = SITES[study];
  if (!site) { console.log(`SKIP ${study} — no entry in SITES`); continue; }
  await mkdir(OUT(study), { recursive: true });

  for (const [kind, ctxOpts, size] of [
    ['mobile', MOBILE, MOBILE_OUT],
    ['desktop', DESKTOP, DESKTOP_OUT],
  ]) {
    const ctx = await browser.newContext({ ...ctxOpts, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    try {
      await page.goto(site.base + '/', { waitUntil: 'domcontentloaded', timeout: 60000 });
      await page.waitForTimeout(3500);

      const clicked = [];
      for (const sel of site.dismiss ?? []) {
        const el = page.locator(sel).first();
        if (await el.count()) {
          await el.click().catch(() => {});
          await page.waitForTimeout(500);
          clicked.push(sel);
        } else {
          // Not a warning to swallow: this is exactly how the card got shipped.
          console.log(`     !! ${study}/${kind}: dismiss selector matched nothing — ${sel}`);
          failed++;
        }
      }
      await page.waitForTimeout(600);

      const raw = await page.screenshot();
      const out = path.join(OUT(study), `home-${kind}.webp`);
      await sharp(raw).resize(size.w, size.h, { fit: 'cover', position: 'top' }).webp({ quality: 82 }).toFile(out);
      console.log(`OK   ${study}/home-${kind}.webp  ${size.w}x${size.h}${clicked.length ? `  (dismissed ${clicked.length})` : ''}`);
    } catch (e) {
      failed++;
      console.log(`FAIL ${study}/home-${kind}  ${e.message.split('\n')[0]}`);
    }
    await ctx.close();
  }
}

await browser.close();
process.exit(failed ? 1 : 0);
