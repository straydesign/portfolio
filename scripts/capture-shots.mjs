#!/usr/bin/env node
/* Capture every case-study screenshot, and the box on it that the text is
 * talking about, in one pass.
 *
 * The annotation rectangles are READ OFF THE LIVE DOM rather than eyeballed —
 * a spec entry names the element by its own text, the browser measures it, and
 * the rect lands in `shots.generated.json` as a percentage of the shot. Nothing
 * is positioned by hand, so nothing drifts when a site is restyled.
 *
 * A spec also declares what the box has to frame — `must` strings that have to
 * fall inside it, `mustNot` strings that have to fall outside. The browser
 * checks both against real rects at the moment of the shot, because geometry
 * alone shipped a "name, description, price" box that stopped short of the
 * price, and a "today's specials" box that reached down into the food card
 * below the panel.
 *
 *   node scripts/capture-shots.mjs            # everything
 *   node scripts/capture-shots.mjs andys      # one study
 */
import { createRequire } from 'node:module';
const require = createRequire('/opt/homebrew/lib/node_modules/');
const { chromium } = require('playwright');
const sharp = require('sharp');
import fs from 'node:fs';
import path from 'node:path';
import { SITES, SHOT_SPECS } from './shots.config.mjs';

// One manifest per study, so five capture runs can go at once without two of
// them read-modify-writing the same file.
const OUT_DIR = 'src/data/caseStudies/shots';
const outFile = (study) => path.join(OUT_DIR, `${study}.json`);
const VIEWPORT = { width: 390, height: 844 };

/* Runs in the page. Finds the deepest element whose own text contains the
   needle (so a match never returns <body>), then climbs parents toward the
   card or row that frames it — but STOPS as soon as the next parent is bigger
   than `maxH`. Without that guard a single `up: 2` on a grid item walks all
   the way to <section> and returns a box 1187% of the viewport tall, which is
   not an annotation, it is the whole page. */
const PROBE_EL = ({ text, css, up = 0, nth = 0, maxH = 500 }) => {
  let el;
  if (css) {
    el = document.querySelectorAll(css)[nth];
  } else {
    // Visible matches only. A screen-reader label or a collapsed <option>
    // carrying the same words is the deepest match and has no box at all,
    // which is how "Sun" resolved to something 0px tall five times.
    const hits = [...document.querySelectorAll('body *')].filter((e) => {
      if (!(e.innerText || '').includes(text)) return false;
      if ([...e.children].some((c) => (c.innerText || '').includes(text))) return false;
      const r = e.getBoundingClientRect();
      return r.height > 4 && r.width > 8;
    });
    el = hits[nth];
  }
  if (!el) return null;
  for (let i = 0; i < up; i++) {
    const parent = el.parentElement;
    if (!parent) break;
    const pr = parent.getBoundingClientRect();
    if (pr.height > maxH) break;
    el = parent;
  }
  return el;
};

const RECT = (el) => {
  const r = el.getBoundingClientRect();
  return { top: r.top + window.scrollY, x: r.left, y: r.top, w: r.width, h: r.height };
};

/* A marker is a pointer, not a crop. The rect above is the element's own box,
   and the 2px border is drawn inside it, so on left-aligned text the stroke
   landed on the first glyph of the very noun the sentence names — eight shots
   had "Upcoming" reading as "pcoming", "ON THE TABLE" as "N THE TABLE", and a
   nine-item list whose ninth item the bottom border ran through. Six device
   pixels of air on every side puts the stroke in the gutter instead.
   Clamped to the viewport, because a box that leaves the frame trips the
   on-screen guard below and a shot with no marker is worse than a tight one. */
const AIR = 6;
const inflate = (r) => {
  const x = Math.max(0, r.x - AIR);
  const y = Math.max(0, r.y - AIR);
  return {
    ...r,
    x,
    y,
    w: Math.min(VIEWPORT.width, r.x + r.w + AIR) - x,
    h: Math.min(VIEWPORT.height, r.y + r.h + AIR) - y,
  };
};

/* Marquees keep moving between the measure and the shot, so a card that was
   on screen when it was measured is off the left edge by the time the frame is
   taken. Freezing animations makes a capture reproducible. */
/* Does the box actually frame what the sentence is about?
   Two shipped boxes proved it does not follow from `find` alone: a specials
   panel whose `up: 2` swallowed the food card underneath it, and a menu row
   whose box stopped short of the right-aligned price the copy was naming. So
   a spec declares the strings that MUST fall inside the box and the ones that
   must NOT, and the browser checks the rects at the moment of the shot. */
const CONTAINS = ({ box, must = [], mustNot = [], tol = 3 }) => {
  // EVERY visible occurrence, not the first. "Wings" is a category tile in the
  // grid AND a caption on the photo marquee, and the marquee clone sitting at
  // x -2594 is first in the DOM — reading only hits[0] reported the tile as
  // outside its own box.
  const all = (t) =>
    [...document.querySelectorAll('body *')].filter((e) => {
      if (!(e.innerText || '').includes(t)) return false;
      if ([...e.children].some((c) => (c.innerText || '').includes(t))) return false;
      const r = e.getBoundingClientRect();
      return r.height > 4 && r.width > 8;
    });
  const inside = (r) =>
    r.left >= box.x - tol &&
    r.right <= box.x + box.w + tol &&
    r.top >= box.y - tol &&
    r.bottom <= box.y + box.h + tol;
  const bad = [];
  for (const t of must) {
    const hits = all(t);
    if (hits.length === 0) bad.push(`must "${t}" — not visible on the page at all`);
    else if (!hits.some((e) => inside(e.getBoundingClientRect()))) {
      bad.push(`must "${t}" — no occurrence sits inside the box`);
    }
  }
  for (const t of mustNot) {
    if (all(t).some((e) => inside(e.getBoundingClientRect()))) {
      bad.push(`mustNot "${t}" — sits INSIDE the box`);
    }
  }
  return bad;
};

const FREEZE = `*, *::before, *::after {
  animation-play-state: paused !important;
  transition: none !important;
}`;

const settle = async (page) => {
  await page.waitForTimeout(900);
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 260));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
  });
  await page.evaluate(() =>
    Promise.race([
      Promise.all([...document.images].filter((i) => !i.complete).map((i) => new Promise((r) => { i.onload = i.onerror = r; }))),
      new Promise((r) => setTimeout(r, 8000)),
    ]),
  );
  await page.waitForTimeout(400);
};

const only = process.argv[2];
fs.mkdirSync(OUT_DIR, { recursive: true });
const load = (study) =>
  fs.existsSync(outFile(study)) ? JSON.parse(fs.readFileSync(outFile(study), 'utf8')) : {};
const browser = await chromium.launch();
const log = [];

const written = [];
for (const [study, specs] of Object.entries(SHOT_SPECS)) {
  if (only && study !== only) continue;
  const manifest = load(study);
  const site = SITES[study];
  const dir = path.join('public/images/case-studies', study);
  fs.mkdirSync(dir, { recursive: true });

  const ctx = await browser.newContext({
    viewport: VIEWPORT, deviceScaleFactor: 3, isMobile: true, hasTouch: true, reducedMotion: 'reduce',
  });
  const page = await ctx.newPage();
  let currentRoute = null;

  for (const spec of specs) {
    const shotId = spec.id;
    const id = `${study}/${shotId}`;
    try {
      if (spec.route !== currentRoute) {
        await page.goto(site.base + spec.route, { waitUntil: 'domcontentloaded', timeout: 45000 });
        await settle(page);
        // Collapse anything the site floats over its own content. Clicking the
        // site's own control, not hiding the element, so the shot still shows
        // what a visitor sees.
        for (const sel of site.dismiss ?? []) {
          const el = await page.$(sel);
          if (!el) continue;
          await el.click().catch(() => {});
          await page.waitForTimeout(400);
          // A swallowed click is a panel still sitting over the shot, and the
          // only evidence would have been the picture. Say so.
          if (await page.$(sel)) log.push(`WARN ${study}${spec.route} :: "${sel}" still present after the click`);
        }
        await page.addStyleTag({ content: FREEZE });
        await page.waitForTimeout(250);
        currentRoute = spec.route;
      }

      // A control sometimes has to be put somewhere before the box is
      // measured. Runs per spec rather than per navigation, because routes are
      // cached across specs and a prep run on arrival would have been undone
      // by whatever the spec before it did to the page.
      for (const js of spec.prep ?? []) {
        await page.evaluate(js);
        await page.waitForTimeout(300);
      }

      let rect = null;
      if (spec.find) {
        // Resolve to a live handle ONCE and keep it. Re-running the text match
        // after scrolling picked a different node whenever content lazily
        // changed, which is how five entries came back 0px tall.
        const handle = (await page.evaluateHandle(PROBE_EL, spec.find)).asElement();
        if (!handle) throw new Error(`target not found: ${JSON.stringify(spec.find)}`);
        const before = await handle.evaluate(RECT);
        const pad = spec.pad ?? 0.26;
        await page.evaluate(
          ({ top, pad }) => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            window.scrollTo(0, Math.min(Math.max(0, top - window.innerHeight * pad), max));
          },
          { top: before.top, pad },
        );
        await page.waitForTimeout(800);
        rect = inflate(await handle.evaluate(RECT));
      } else {
        await page.evaluate((y) => window.scrollTo(0, y), spec.scrollY ?? 0);
        await page.waitForTimeout(600);
      }

      const raw = path.join(dir, `${spec.id}.raw.png`);
      await page.screenshot({ path: raw });
      const webp = path.join(dir, `${spec.id}.webp`);
      await sharp(raw).resize({ width: 900 }).webp({ quality: 84, effort: 5 }).toFile(webp);
      fs.unlinkSync(raw);

      if (rect && (rect.h > VIEWPORT.height * 0.78 || rect.h < 12)) {
        throw new Error(`box is ${Math.round(rect.h)}px tall — adjust \`up\` (want 12–${Math.round(VIEWPORT.height * 0.78)})`);
      }
      // A box the reader cannot see is worse than no box at all.
      if (rect && (rect.y < -4 || rect.y + rect.h > VIEWPORT.height + 4)) {
        throw new Error(`box sits at y ${Math.round(rect.y)}..${Math.round(rect.y + rect.h)} — outside the 0..${VIEWPORT.height} shot; change \`pad\``);
      }
      if (rect && (rect.x < -4 || rect.x + rect.w > VIEWPORT.width + 4)) {
        throw new Error(`box spans x ${Math.round(rect.x)}..${Math.round(rect.x + rect.w)} — wider than the ${VIEWPORT.width}px shot; target a card, not the carousel track`);
      }

      // Geometry only proves the box is on screen and a sane size. This proves
      // it frames the right thing.
      if (rect && (spec.must || spec.mustNot)) {
        const bad = await page.evaluate(CONTAINS, {
          box: { x: rect.x, y: rect.y, w: rect.w, h: rect.h },
          must: spec.must ?? [],
          mustNot: spec.mustNot ?? [],
        });
        if (bad.length) throw new Error(`box frames the wrong thing — ${bad.join('; ')}`);
      }

      manifest[shotId] = {
        src: `/images/case-studies/${study}/${spec.id}.webp`,
        // The address bar is part of the evidence, so it shows the route a
        // reader could type. A query string is plumbing — `?demo` opens the
        // middleman prototype past its login gate — and printing it in a
        // portfolio shot advertises a debug switch as if it were the URL.
        url: site.display + (spec.route === '/' ? '' : spec.route.split(/[?#]/)[0]),
        alt: spec.alt,
        ...(rect
          ? {
              box: {
                x: +((rect.x / VIEWPORT.width) * 100).toFixed(2),
                y: +((rect.y / VIEWPORT.height) * 100).toFixed(2),
                w: +((rect.w / VIEWPORT.width) * 100).toFixed(2),
                h: +((rect.h / VIEWPORT.height) * 100).toFixed(2),
              },
              note: spec.note,
            }
          : {}),
      };
      const b = manifest[shotId].box;
      const unchecked = b && !spec.must && !spec.mustNot ? '  ⚠ no must/mustNot' : '';
      log.push(`OK   ${id}${b ? `  box ${b.x},${b.y} ${b.w}x${b.h}` : ''}${unchecked}`);
    } catch (e) {
      log.push(`FAIL ${id} :: ${e.message.split('\n')[0]}`);
    }
    console.log(log[log.length - 1]);
  }
  // Drop ids the spec no longer declares. Without this a retargeted shot
  // leaves its predecessor behind and the old image keeps rendering.
  const live = new Set(specs.map((sp) => sp.id));
  for (const k of Object.keys(manifest)) if (!live.has(k)) delete manifest[k];
  fs.writeFileSync(outFile(study), JSON.stringify(manifest, null, 2) + '\n');
  written.push(outFile(study));

  await ctx.close();
}
await browser.close();

const fails = log.filter((l) => l.startsWith('FAIL'));
console.log(`\n${log.length - fails.length} ok, ${fails.length} failed → ${written.join(', ')}`);
if (fails.length) process.exit(1);
