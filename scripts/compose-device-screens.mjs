/* Screen artwork for the Envato photoreal mockups.
 *
 * The kit's smart objects all take a 1320x2868 canvas — an iPhone 16 Pro Max
 * screen at 3x — and the kit supplies the hardware only. The Dynamic Island is
 * there (a `Camera Effect` layer that paints OVER the smart object), but the
 * iOS status bar and the Safari toolbar are software and have to be in the
 * artwork. Without them the render is a phone showing a web page, which is the
 * thing Tom pointed at: "even the laptops would have the search in Safari."
 *
 * The bars STACK here rather than overlay. SafariPhone.tsx overlays them
 * because stacking grew its drawn silhouette taller than a real handset — but
 * this canvas is a fixed screen rectangle, so stacking inside it costs nothing
 * and is what mobile Safari actually shows: web content begins below the status
 * bar and ends above the toolbar. Overlaying here would have put the status bar
 * across each site's own header, which is how the Sea Cave lockup ended up
 * looking cropped.
 *
 * So the page is captured at 440x826 and the two bars take the remaining 130.
 *
 * Every number is the same one SafariPhone spends, converted once: its values
 * are cqw off a 409pt device, this canvas is a 393pt screen at 440 CSS px, so
 * 1cqw = 4.09pt = 4.5791px. Nothing here is a second set of numbers.
 */
import { chromium } from 'playwright';
import { mkdir, writeFile } from 'fs/promises';
import { createRequire } from 'module';
import path from 'path';
import { SITES } from './shots.config.mjs';

const sharp = createRequire(import.meta.url)('sharp');

const OUT = path.resolve('.ps-run/screens');
/* The phone's artwork is an intermediate — Photoshop places it into the kit's
   smart object and writes the finished render to .ps-run/out. The laptop has
   no such step: the composer's own screenshot IS the device, so it is written
   where publish-devices.mjs will find it. */
const OUT_DEVICE = path.resolve('.ps-run/out');
const CQW = 4.5791;                 // one cqw of SafariPhone, in this canvas's px
const SCREEN = { w: 440, h: 956 };  // iPhone 16 Pro Max points; x3 = 1320x2868
const STATUS_H = +(13.2 * CQW).toFixed(2);
const BAR_H = +(15.2 * CQW).toFixed(2);
const PAGE_H = +(SCREEN.h - STATUS_H - BAR_H).toFixed(2);
const DARK_BELOW = 0.42;            // same threshold as tint-manifests.mjs

/* Which page of each site is the one worth showing on a shelf. The home page
   in every case: this render is the work grid's thumbnail, not an annotation. */
const HERO = {
  andys: '/',
  bullfrog: '/',
  seacave: '/',
  presqueisle: '/',
  middleman: '/',
};

async function luma(buf, from, to) {
  const { width, height } = await sharp(buf).metadata();
  const top = Math.round(height * from);
  const h = Math.max(1, Math.round(height * (to - from)));
  const { data } = await sharp(buf)
    .extract({ left: 0, top, width, height: h })
    .resize(1, 1, { fit: 'fill' })
    .raw()
    .toBuffer({ resolveWithObject: true });
  return (0.2126 * data[0] + 0.7152 * data[1] + 0.0722 * data[2]) / 255;
}

const ICONS = `
<svg viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>
<svg viewBox="0 0 16 12" fill="currentColor"><path d="M8 11.2 5.9 8.8a3.2 3.2 0 0 1 4.2 0L8 11.2Z"/><path d="M8 6.3c-1.5 0-2.9.55-4 1.5l-1.4-1.6A8.1 8.1 0 0 1 8 4.2c2.06 0 3.95.75 5.4 2l-1.4 1.6A6.06 6.06 0 0 0 8 6.3Z"/><path d="M8 2.1c-2.6 0-5 .95-6.85 2.55L-.25 3.05A12.3 12.3 0 0 1 8 0c3.2 0 6.12 1.16 8.25 3.05L14.85 4.65A10.25 10.25 0 0 0 8 2.1Z"/></svg>
<svg viewBox="0 0 27 12" fill="none"><rect x="0.5" y="0.5" width="22" height="11" rx="3.2" stroke="currentColor" opacity="0.38"/><rect x="2" y="2" width="17" height="8" rx="2" fill="currentColor"/><path d="M24.5 4.2a2.6 2.6 0 0 1 0 3.6V4.2Z" fill="currentColor" opacity="0.45"/></svg>`;

const AA = `<svg viewBox="0 0 20 12" fill="currentColor"><path d="M4.4 2.6 1.4 10h1.5l.66-1.75h3l.66 1.75h1.5l-3-7.4H4.4Zm-.36 4.4.95-2.55.95 2.55h-1.9Z"/><path d="M13.9 0 10 10h1.9l.9-2.4h4.2l.9 2.4H19.8L15.9 0h-2Zm-.55 6.2 1.55-4.2 1.55 4.2h-3.1Z"/></svg>`;
const LOCK = `<svg viewBox="0 0 10 13" fill="currentColor"><path d="M5 0a3 3 0 0 0-3 3v2h1.5V3a1.5 1.5 0 0 1 3 0v2H8V3a3 3 0 0 0-3-3Z"/><rect x="0.6" y="5" width="8.8" height="8" rx="2.2"/></svg>`;
const RELOAD = `<svg viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M11.4 6.5a4.9 4.9 0 1 1-1.5-3.5"/><path d="M11.6 0.6v3h-3"/></svg>`;

const composer = ({ pageFile, display, dark }) => `<!doctype html><meta charset="utf-8">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:${SCREEN.w}px;height:${SCREEN.h}px;overflow:hidden;
    font-family:-apple-system,"SF Pro Text","Helvetica Neue",sans-serif;
    -webkit-font-smoothing:antialiased}
  .screen{width:${SCREEN.w}px;height:${SCREEN.h}px;display:grid;
    grid-template-rows:${STATUS_H}px ${PAGE_H}px ${BAR_H}px;background:#fff}
  .status{display:flex;align-items:center;justify-content:space-between;
    padding:0 ${(8.4 * CQW).toFixed(1)}px 0 ${(9.4 * CQW).toFixed(1)}px;
    background:${dark.top ? 'rgb(22,22,26)' : 'rgb(242,242,245)'};
    color:${dark.top ? '#f4f4f6' : '#101013'}}
  .time{font-size:${(4.1 * CQW).toFixed(1)}px;font-weight:650;letter-spacing:.01em;
    font-variant-numeric:tabular-nums}
  .icons{display:flex;align-items:center;gap:${(1.5 * CQW).toFixed(1)}px}
  .icons svg{height:${(3.1 * CQW).toFixed(1)}px;width:auto;display:block}
  .page{overflow:hidden}
  .page img{display:block;width:${SCREEN.w}px;height:${PAGE_H}px;object-fit:cover;object-position:top}
  .bar{display:flex;align-items:center;gap:${(2 * CQW).toFixed(1)}px;
    padding:0 ${(3.4 * CQW).toFixed(1)}px ${(3.6 * CQW).toFixed(1)}px;
    background:${dark.bottom ? 'rgb(22,22,26)' : 'rgb(242,242,245)'}}
  .aa,.reload{flex:0 0 auto;display:grid;place-items:center;width:${(7 * CQW).toFixed(1)}px;
    color:${dark.bottom ? '#d3d3d8' : '#3c3c43'}}
  .aa svg{width:${(3.9 * CQW).toFixed(1)}px}
  .reload svg{width:${(3.4 * CQW).toFixed(1)}px}
  .url{flex:1 1 auto;display:flex;align-items:center;justify-content:center;
    gap:${(1.2 * CQW).toFixed(1)}px;min-width:0;height:${(8.8 * CQW).toFixed(1)}px;
    padding:0 ${(2 * CQW).toFixed(1)}px;border-radius:${(2.6 * CQW).toFixed(1)}px;
    background:${dark.bottom ? 'rgba(255,255,255,.15)' : 'rgba(0,0,0,.075)'};
    font-size:${(3.6 * CQW).toFixed(1)}px;font-weight:450;
    color:${dark.bottom ? '#f4f4f6' : '#101013'};white-space:nowrap;overflow:hidden}
  .url svg{height:${(3.1 * CQW).toFixed(1)}px;width:auto;opacity:.62;flex:0 0 auto}
  .urltext{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .home{position:absolute;left:50%;bottom:${(2 * CQW).toFixed(1)}px;transform:translateX(-50%);
    width:${(34.2 * CQW).toFixed(1)}px;height:${(1.25 * CQW).toFixed(1)}px;
    border-radius:${(1 * CQW).toFixed(1)}px;
    background:${dark.bottom ? 'rgba(244,244,246,.55)' : 'rgba(16,16,19,.34)'}}
</style>
<div class="screen">
  <div class="status"><span class="time">9:41</span><span class="icons">${ICONS}</span></div>
  <div class="page"><img src="${pageFile}"></div>
  <div class="bar">
    <span class="aa">${AA}</span>
    <span class="url">${LOCK}<span class="urltext">${display}</span></span>
    <span class="reload">${RELOAD}</span>
  </div>
</div>
<div class="home"></div>`;

/* ── The laptop ──────────────────────────────────────────────────────────────
   Same complaint, other device: "even the laptops would have the search in
   Safari stuff." The MacBook frame draws a convincing lid and deck around a
   bare screenshot, which is a photograph of a web page rather than of somebody
   using the site.

   A 1440x900 window at 2x, which is 16:10 — the aspect MacBookFrame already
   expects, so the frame takes this image with no crop and no change. One tab,
   so there is no tab strip: a second tab would be a fabricated one. */
const WIN = { w: 1440, h: 900 };
const TOOLBAR_H = 52;
const DESK_PAGE_H = WIN.h - TOOLBAR_H;

const LIGHT = (c) => `<i style="background:${c}"></i>`;
const CHEV = (d) =>
  `<svg viewBox="0 0 8 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="${d}"/></svg>`;
const SIDEBAR = `<svg viewBox="0 0 16 14" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="0.65" y="0.65" width="14.7" height="12.7" rx="2.4"/><path d="M5.8 0.9v12.2"/></svg>`;
const SHARE = `<svg viewBox="0 0 12 15" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9.6V1.2"/><path d="M3.3 3.7 6 1l2.7 2.7"/><path d="M2.2 6.6H1.1v7.3h9.8V6.6H9.8"/></svg>`;
const PLUS = `<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M7 1.6v10.8M1.6 7h10.8"/></svg>`;
const TABS = `<svg viewBox="0 0 16 13" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="0.65" y="0.65" width="9.2" height="11.7" rx="2"/><path d="M12.2 2.4h3.15v8.2H12.2"/></svg>`;

const deskComposer = ({ pageFile, display }) => `<!doctype html><meta charset="utf-8">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:${WIN.w}px;height:${WIN.h}px;overflow:hidden;
    font-family:-apple-system,"SF Pro Text","Helvetica Neue",sans-serif;
    -webkit-font-smoothing:antialiased}
  .win{width:${WIN.w}px;height:${WIN.h}px;display:grid;
    grid-template-rows:${TOOLBAR_H}px ${DESK_PAGE_H}px;background:#fff}
  /* Three columns rather than a flex row. Safari centres the address field in
     the WINDOW, and a flex row centres it in whatever space the two icon
     groups leave — which are different widths, so the pill sat noticeably
     right of centre. Equal 1fr side tracks put it back on the centreline. */
  .tb{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;
    gap:16px;padding:0 16px;
    background:#f2f2f4;box-shadow:inset 0 -1px 0 rgba(0,0,0,.13)}
  .lights{display:flex;gap:8px;flex:0 0 auto}
  .left{display:flex;align-items:center;gap:16px;justify-self:start}
  .lights i{width:12px;height:12px;border-radius:50%;display:block}
  .nav{display:flex;align-items:center;gap:16px;color:#7c7c82;flex:0 0 auto}
  .nav svg{height:14px;width:auto;display:block}
  .nav .dim{color:#bcbcc2}
  .pill{width:540px;height:30px;border-radius:8px;
    background:rgba(0,0,0,.055);display:flex;align-items:center;justify-content:center;
    gap:6px;font-size:13px;color:#1d1d1f;white-space:nowrap;overflow:hidden}
  .pill svg{height:12px;width:auto;opacity:.55;flex:0 0 auto}
  .right{display:flex;align-items:center;gap:18px;color:#7c7c82;justify-self:end}
  .right svg{height:14px;width:auto;display:block}
  .page{overflow:hidden}
  .page img{display:block;width:${WIN.w}px;height:${DESK_PAGE_H}px;
    object-fit:cover;object-position:top}
</style>
<div class="win">
  <div class="tb">
    <span class="left">
      <span class="lights">${LIGHT('#ff5f57')}${LIGHT('#febc2e')}${LIGHT('#28c840')}</span>
      <span class="nav">${SIDEBAR}${CHEV('M6.6 1 1.4 7l5.2 6')}<span class="dim">${CHEV('M1.4 1l5.2 6-5.2 6')}</span></span>
    </span>
    <span class="pill">${LOCK}${display}</span>
    <span class="right">${SHARE}${PLUS}${TABS}</span>
  </div>
  <div class="page"><img src="${pageFile}"></div>
</div>`;

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith('--')));
const named = args.filter((a) => !a.startsWith('--'));
const wantPhone = !flags.has('--desktop-only');
const wantDesk = !flags.has('--phone-only');
const studies = (named.length ? named : Object.keys(HERO)).filter((s) => HERO[s]);

await mkdir(OUT, { recursive: true });
await mkdir(OUT_DEVICE, { recursive: true });
const browser = await chromium.launch();

/* One page capture, taken at exactly the height the browser chrome leaves it.
   `dismiss` is the shots pipeline's own list: Andy's and Bullfrog float an
   expanded HOURS card over the top right of every route, and its minimize
   button is a control a real visitor uses, so the capture stays a picture of
   the site as shipped rather than the site with a part removed. */
async function capturePage(site, route, viewport, deviceScaleFactor, mobile) {
  const ctx = await browser.newContext({
    viewport,
    deviceScaleFactor,
    isMobile: mobile,
    hasTouch: mobile,
    reducedMotion: 'reduce',
  });
  const page = await ctx.newPage();
  await page.goto(site.base + route, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(3500);
  for (const sel of site.dismiss ?? []) {
    const el = page.locator(sel).first();
    if (await el.count()) { await el.click().catch(() => {}); await page.waitForTimeout(400); }
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  const buf = await page.screenshot({ type: 'png' });
  await ctx.close();
  return buf;
}

/* The composer is written to disk and navigated to, never handed to
   setContent: a setContent page has an `about:blank` origin and Chromium
   refuses to load a file:// subresource into one, which rendered both bars
   perfectly around a broken-image icon. */
async function shootComposer(html, name, viewport, out) {
  const htmlPath = path.join(OUT, `${name}.html`);
  await writeFile(htmlPath, html);
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto(`file://${htmlPath}`, { waitUntil: 'load' });
  await page.waitForSelector('img');
  await page.evaluate(() => {
    const img = document.querySelector('img');
    return img.complete ? null : new Promise((r) => { img.onload = r; img.onerror = r; });
  });
  const loaded = await page.evaluate(() => document.querySelector('img').naturalWidth);
  if (!loaded) throw new Error(`${name}: the page capture did not load into the composer`);
  await page.screenshot({ path: out, type: 'png' });
  await ctx.close();
}

for (const study of studies) {
  const site = SITES[study];
  if (!site) throw new Error(`no site for "${study}"`);

  if (wantPhone) {
    const buf = await capturePage(site, HERO[study], { width: SCREEN.w, height: Math.round(PAGE_H) }, 3, true);
    const pagePath = path.join(OUT, `${study}-page.png`);
    await writeFile(pagePath, buf);

    // Which way each bar tints, measured off the strip of page beside it.
    const dark = {
      top: (await luma(buf, 0, 0.06)) < DARK_BELOW,
      bottom: (await luma(buf, 0.94, 1)) < DARK_BELOW,
    };

    const out = path.join(OUT, `${study}.png`);
    const htmlPath = path.join(OUT, `${study}-frame.html`);
    await writeFile(htmlPath, composer({ pageFile: `${study}-page.png`, display: site.display, dark }));
    const ctx = await browser.newContext({ viewport: { width: SCREEN.w, height: SCREEN.h }, deviceScaleFactor: 3 });
    const comp = await ctx.newPage();
    await comp.goto(`file://${htmlPath}`, { waitUntil: 'load' });
    await comp.waitForSelector('.page img');
    await comp.evaluate(() => {
      const img = document.querySelector('.page img');
      return img.complete ? null : new Promise((r) => { img.onload = r; img.onerror = r; });
    });
    if (!(await comp.evaluate(() => document.querySelector('.page img').naturalWidth))) {
      throw new Error(`${study}: the page capture did not load into the composer`);
    }
    await comp.screenshot({ path: out, type: 'png' });
    await ctx.close();

    const meta = await sharp(out).metadata();
    const ok = meta.width === 1320 && meta.height === 2868;
    console.log(
      `${study.padEnd(12)} phone   ${meta.width}x${meta.height} ${ok ? 'ok ' : 'WRONG SIZE '}` +
      `status ${dark.top ? 'dark' : 'light'}  bar ${dark.bottom ? 'dark' : 'light'}`,
    );
    if (!ok) process.exitCode = 1;
  }

  if (wantDesk) {
    const buf = await capturePage(site, HERO[study], { width: WIN.w, height: DESK_PAGE_H }, 2, false);
    const pagePath = path.join(OUT, `${study}-desktop-page.png`);
    await writeFile(pagePath, buf);

    const out = path.join(OUT_DEVICE, `laptop-${study}.png`);
    await shootComposer(
      deskComposer({ pageFile: `${study}-desktop-page.png`, display: site.display }),
      `${study}-desktop-frame`,
      { width: WIN.w, height: WIN.h },
      out,
    );

    const meta = await sharp(out).metadata();
    const ok = meta.width === 2880 && meta.height === 1800;
    console.log(`${study.padEnd(12)} desktop ${meta.width}x${meta.height} ${ok ? 'ok' : 'WRONG SIZE'}`);
    if (!ok) process.exitCode = 1;
  }
}

await browser.close();
console.log(`\n${studies.length} stud${studies.length === 1 ? 'y' : 'ies'} in ${OUT}`);
