#!/usr/bin/env node
/**
 * The topic block's caption bar, in the four states that matter.
 *
 *   node scripts/verify-topic-caption.mjs [baseUrl] [slug...]
 *
 * Under 1000px a topic's sentences collapse into one bar pinned to the bottom
 * of the screen and the rest are hidden. That trade is only honest while
 * something is swapping them, so three of these four checks are about the
 * fallbacks rather than the animation:
 *
 *   DESKTOP   at 1440 nothing changed — copy still pinned, leader line still
 *             drawn, every sentence in the page.
 *   PINNED    at 390 the bar reaches the bottom edge, holds one sentence,
 *             and that sentence changes as the phones go past.
 *   REDUCE    with reduce on, the bar is gone and every sentence is visible
 *             in normal flow.
 *   NOJS      with JavaScript off, same.
 *
 * REDUCE and NOJS are the ones worth having. They were verified by hand once
 * and nothing would have caught them going wrong: the default view looks
 * correct either way, so a broken fallback ships silently.
 */
import { chromium } from 'playwright';

const BASE = process.argv[2]?.startsWith('http') ? process.argv[2] : 'http://localhost:4760';
const SLUGS = process.argv.slice(process.argv[2]?.startsWith('http') ? 3 : 2);
const STUDIES = SLUGS.length ? SLUGS : ['seacave', 'andys', 'bullfrog', 'presqueisle', 'middleman'];

const PHONE = { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 };
const DESK = { viewport: { width: 1440, height: 900 } };

const browser = await chromium.launch();
let failures = 0;

const say = (ok, label, detail) => {
  if (!ok) failures++;
  console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${label}${detail ? `  ${detail}` : ''}`);
};

/** Count sentences a reader can actually see, not ones merely in the DOM. */
const visibleSentences = (page) =>
  page.evaluate(() => {
    const t = document.querySelector('.cs-topic');
    if (!t) return { visible: -1, total: -1 };
    const items = Array.from(t.querySelectorAll('.cs-item'));
    const visible = items.filter((el) => {
      const s = getComputedStyle(el);
      return s.display !== 'none' && s.visibility !== 'hidden' && parseFloat(s.opacity) > 0.05;
    }).length;
    /* Against the block's own count, not a literal 3. straydesign topics run
       three sentences and straywebdesign's run four, and a check written to
       the number rather than to the rule passes on one site while saying
       nothing about the other. */
    return { visible, total: items.length };
  });

/** Every sentence in the block is readable — the fallback contract. */
const allVisible = async (page) => {
  const { visible, total } = await visibleSentences(page);
  return { ok: total > 0 && visible === total, detail: `${visible} of ${total}` };
};

for (const study of STUDIES) {
  console.log(`\n${study}`);
  const url = `${BASE}/${study}`;

  /* DESKTOP — the layout this was all built for, unchanged. */
  {
    const ctx = await browser.newContext(DESK);
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.locator('.cs-topic').first().scrollIntoViewIfNeeded();
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(1000);
    const d = await page.evaluate(() => {
      const t = document.querySelector('.cs-topic');
      return {
        textPinned: getComputedStyle(t.querySelector('.cs-topic__text')).position === 'sticky',
        lead: !!t.querySelector('.cs-lead path'),
      };
    });
    say(d.textPinned, 'DESKTOP copy column still pinned');
    say(d.lead, 'DESKTOP leader line still drawn');
    { const v = await allVisible(page); say(v.ok, 'DESKTOP every sentence visible', v.detail); }
    await ctx.close();
  }

  /* PINNED — the bar itself. */
  {
    const ctx = await browser.newContext(PHONE);
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.locator('.cs-topic').first().scrollIntoViewIfNeeded();

    const seen = new Set();
    let pinnedToEdge = false;
    let barsAtOnce = 0;
    for (let i = 0; i < 8; i++) {
      await page.mouse.wheel(0, 420);
      await page.waitForTimeout(800);
      const s = await page.evaluate(() => {
        const live = document.querySelector('.cs-topic--live');
        const bar = live?.querySelector('.cs-items');
        const rect = bar?.getBoundingClientRect();
        const lit = Array.from(document.querySelectorAll('.cs-items'))
          .filter((b) => parseFloat(getComputedStyle(b).opacity) > 0.05).length;
        return {
          heading: live?.querySelector('.cs-item.is-shown .cs-item__heading')?.textContent ?? null,
          atEdge: rect ? Math.abs(rect.bottom - window.innerHeight) < 2 : false,
          sticky: bar ? getComputedStyle(bar).position === 'sticky' : false,
          lit,
        };
      });
      if (s.heading) seen.add(s.heading);
      if (s.atEdge && s.sticky) pinnedToEdge = true;
      barsAtOnce = Math.max(barsAtOnce, s.lit);
    }
    say(pinnedToEdge, 'PINNED bar reaches the bottom edge');
    say(seen.size >= 2, 'PINNED caption changes as phones pass', `${seen.size} sentences seen`);
    say(barsAtOnce <= 1, 'PINNED never two bars on screen', `max ${barsAtOnce}`);
    await ctx.close();
  }

  /* REDUCE — the bar must not exist, and nothing may be hidden by it. */
  {
    const ctx = await browser.newContext({ ...PHONE, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.locator('.cs-topic').first().scrollIntoViewIfNeeded();
    await page.mouse.wheel(0, 900);
    await page.waitForTimeout(1000);
    const pinnable = await page.evaluate(() => !!document.querySelector('.cs-topic--pinnable'));
    say(!pinnable, 'REDUCE no caption bar');
    { const v = await allVisible(page); say(v.ok, 'REDUCE every sentence visible', v.detail); }
    await ctx.close();
  }

  /* NOJS — the observers never install, so the class never lands. */
  {
    const ctx = await browser.newContext({ ...PHONE, javaScriptEnabled: false });
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);
    { const v = await allVisible(page); say(v.ok, 'NOJS every sentence visible', v.detail); }
    await ctx.close();
  }
}

await browser.close();
console.log(failures ? `\n${failures} failing check(s)` : '\nall checks passed');
process.exit(failures ? 1 : 0);
