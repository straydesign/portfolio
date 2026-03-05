import { chromium } from 'playwright';
import path from 'path';
import { execSync } from 'child_process';
import fs from 'fs';
import sharp from 'sharp';

const OUT_DIR = path.resolve('public/images/carousel');
const FRAME_DIR = path.resolve('.tmp-frames');
fs.mkdirSync(OUT_DIR, { recursive: true });

const VIEWPORT = { width: 393, height: 852 };
const FPS = 12;
const SQUARE = 600;
const PHONE_W = 260;
const PHONE_H = Math.round(PHONE_W * (852 / 393));
const PHONE_X = Math.round((SQUARE - PHONE_W) / 2);
const PHONE_Y = Math.round((SQUARE - PHONE_H) / 2);
const CORNER_R = 32;

// ─── Compositing (green/teal gradient for FirstDay) ───

async function createGradientBg() {
  const svg = `<svg width="${SQUARE}" height="${SQUARE}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#00CC88;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#0077CC;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#111111;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="${SQUARE}" height="${SQUARE}" fill="url(#g)" />
  </svg>`;
  return sharp(Buffer.from(svg)).png().toBuffer();
}

function phoneMaskSvg() {
  return `<svg width="${PHONE_W}" height="${PHONE_H}" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="${PHONE_W}" height="${PHONE_H}" rx="${CORNER_R}" ry="${CORNER_R}" fill="white" />
  </svg>`;
}

function glossSvg() {
  return `<svg width="${PHONE_W}" height="${PHONE_H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gloss" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:white;stop-opacity:0.15" />
        <stop offset="30%" style="stop-color:white;stop-opacity:0.05" />
        <stop offset="50%" style="stop-color:white;stop-opacity:0" />
        <stop offset="100%" style="stop-color:white;stop-opacity:0" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="${PHONE_W}" height="${PHONE_H}" rx="${CORNER_R}" ry="${CORNER_R}" fill="url(#gloss)" />
  </svg>`;
}

function shadowSvg() {
  return `<svg width="${SQUARE}" height="${SQUARE}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="12" />
        <feOffset dx="0" dy="4" />
        <feComponentTransfer><feFuncA type="linear" slope="0.5" /></feComponentTransfer>
      </filter>
    </defs>
    <rect x="${PHONE_X}" y="${PHONE_Y}" width="${PHONE_W}" height="${PHONE_H}" rx="${CORNER_R}" ry="${CORNER_R}" fill="black" filter="url(#shadow)" />
  </svg>`;
}

function bezelSvg() {
  return `<svg width="${SQUARE}" height="${SQUARE}" xmlns="http://www.w3.org/2000/svg">
    <rect x="${PHONE_X}" y="${PHONE_Y}" width="${PHONE_W}" height="${PHONE_H}" rx="${CORNER_R}" ry="${CORNER_R}" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="2" />
  </svg>`;
}

let gradientBuf, maskBuf, glossBuf, shadowBuf, bezelBuf;

async function initAssets() {
  gradientBuf = await createGradientBg();
  maskBuf = Buffer.from(phoneMaskSvg());
  glossBuf = Buffer.from(glossSvg());
  shadowBuf = Buffer.from(shadowSvg());
  bezelBuf = Buffer.from(bezelSvg());
}

async function compositeFrame(inputPath, outputPath) {
  const resized = await sharp(inputPath)
    .resize(PHONE_W, PHONE_H, { fit: 'cover' })
    .composite([{ input: maskBuf, blend: 'dest-in' }])
    .png()
    .toBuffer();
  const withGloss = await sharp(resized)
    .composite([{ input: glossBuf, blend: 'over' }])
    .png()
    .toBuffer();
  await sharp(gradientBuf)
    .composite([
      { input: shadowBuf, blend: 'over' },
      { input: withGloss, left: PHONE_X, top: PHONE_Y, blend: 'over' },
      { input: bezelBuf, blend: 'over' },
    ])
    .png()
    .toFile(outputPath);
}

// ─── Click indicator ───

async function injectClickIndicator(page) {
  await page.addStyleTag({
    content: `
      @keyframes click-ripple {
        0%   { transform: translate(-50%, -50%) scale(0.5); opacity: 0.8; }
        100% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; }
      }
      .click-indicator {
        position: fixed;
        width: 36px; height: 36px;
        border-radius: 50%;
        background: rgba(0, 200, 120, 0.4);
        border: 2px solid rgba(0, 200, 120, 0.7);
        pointer-events: none;
        z-index: 99999;
        transform: translate(-50%, -50%);
      }
      .click-indicator::after {
        content: '';
        position: absolute;
        inset: -4px;
        border-radius: 50%;
        border: 2px solid rgba(0, 200, 120, 0.5);
        animation: click-ripple 0.5s ease-out forwards;
      }
    `,
  });
}

async function showClickAt(page, x, y, capture, holdFrames = 3) {
  await page.evaluate(({ x, y }) => {
    document.getElementById('__click_dot')?.remove();
    const el = document.createElement('div');
    el.className = 'click-indicator';
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.id = '__click_dot';
    document.body.appendChild(el);
  }, { x, y });
  await capture(holdFrames);
  await page.evaluate(() => document.getElementById('__click_dot')?.remove());
}

async function clickWithIndicator(page, locator, capture, holdFrames = 3) {
  const box = await locator.boundingBox();
  if (box) {
    await showClickAt(page, box.x + box.width / 2, box.y + box.height / 2, capture, holdFrames);
  }
  await locator.click();
}

// ─── Helpers ───

async function smoothScroll(page, capture, distance, frameCount) {
  const step = distance / frameCount;
  for (let i = 0; i < frameCount; i++) {
    await page.evaluate((d) => window.scrollBy(0, d), step);
    await capture(1);
  }
}

async function recordSite(browser, name, fn) {
  console.log(`Recording ${name}...`);
  const rawDir = path.join(FRAME_DIR, name, 'raw');
  const compDir = path.join(FRAME_DIR, name, 'comp');
  fs.mkdirSync(rawDir, { recursive: true });
  fs.mkdirSync(compDir, { recursive: true });

  const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 1 });
  const page = await context.newPage();
  let frameNum = 0;
  const capture = async (count) => {
    for (let i = 0; i < count; i++) {
      await page.screenshot({ path: path.join(rawDir, `frame-${String(frameNum).padStart(5, '0')}.png`) });
      frameNum++;
    }
  };

  try {
    await injectClickIndicator(page);
    await fn(page, capture);
  } catch (e) {
    console.log(`  Error at frame ${frameNum}: ${e.message.split('\n')[0]}`);
  }
  await page.close();
  await context.close();

  if (frameNum === 0) { console.log(`  Skipped (no frames)`); return; }

  console.log(`  Compositing ${frameNum} frames...`);
  for (let i = 0; i < frameNum; i++) {
    const rawPath = path.join(rawDir, `frame-${String(i).padStart(5, '0')}.png`);
    const compPath = path.join(compDir, `frame-${String(i).padStart(5, '0')}.png`);
    await compositeFrame(rawPath, compPath);
  }

  const mp4Path = path.join(OUT_DIR, `${name}.mp4`);
  console.log(`  Stitching ${frameNum} frames...`);
  execSync(
    `ffmpeg -y -framerate ${FPS} -i "${compDir}/frame-%05d.png" -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p -an -movflags +faststart "${mp4Path}"`,
    { stdio: 'pipe' }
  );
  const size = (fs.statSync(mp4Path).size / 1024).toFixed(0);
  console.log(`  Done: ${name}.mp4 (${size}KB)`);
  fs.rmSync(path.join(FRAME_DIR, name), { recursive: true, force: true });
}

const URL = 'https://firstday.life';
const EMAIL = 'demo@firstday.app';
const PASS = 'DemoPass2026';

// Reusable login helper — returns the page in logged-in state
async function loginFlow(page) {
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1200);
  await page.locator('button:has-text("Log In")').first().click();
  await page.waitForTimeout(1500);
  await page.locator('input[type="email"]').first().fill(EMAIL);
  await page.locator('input[type="password"]').first().fill(PASS);
  await page.waitForTimeout(300);
  // Click the SECOND "Log In" button (modal submit, not nav)
  await page.locator('button:has-text("Log In")').nth(1).click();
  await page.waitForTimeout(5000);
}

// Delete existing goals so we can record the fresh/empty state
async function deleteAllGoals(page) {
  // Look for trash/delete icons on goal cards
  while (true) {
    const trashBtn = page.locator('button:has(svg), [aria-label*="delete" i], [aria-label*="remove" i]').first();
    // Find the red trash icon button near the goal card
    const allBtns = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('button'))
        .filter(el => {
          const r = el.getBoundingClientRect();
          return el.offsetParent !== null && el.textContent?.trim() === '' && r.width < 60 && r.y > 180 && r.y < 400;
        })
        .map(el => ({ x: el.getBoundingClientRect().x, y: el.getBoundingClientRect().y }));
    });
    if (allBtns.length === 0) break;

    // Click the trash button
    await page.click(`button >> nth=0`, { position: { x: allBtns[0].x + 15, y: allBtns[0].y + 15 } }).catch(() => {});
    await page.mouse.click(allBtns[0].x + 15, allBtns[0].y + 15);
    await page.waitForTimeout(1000);

    // Confirm deletion if dialog appears
    const confirmBtn = page.locator('button:has-text("Delete"), button:has-text("Confirm"), button:has-text("Yes")');
    if (await confirmBtn.isVisible().catch(() => false)) {
      await confirmBtn.first().click();
      await page.waitForTimeout(2000);
    } else {
      break;
    }
  }
}

async function main() {
  await initAssets();
  const browser = await chromium.launch({ headless: true });

  // First, clean up the demo account (delete existing goals)
  console.log('Cleaning demo account...');
  const cleanCtx = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 1 });
  const cleanPage = await cleanCtx.newPage();
  await loginFlow(cleanPage);
  await deleteAllGoals(cleanPage);
  await cleanPage.close();
  await cleanCtx.close();
  console.log('Account cleaned\n');

  // ── 1: Landing Page — scroll through, show features ──
  await recordSite(browser, 'fd-landing', async (page, capture) => {
    await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1000);
    await capture(18);
    await smoothScroll(page, capture, 700, 45);
    await capture(10);
    await smoothScroll(page, capture, -700, 35);
    await capture(8);
  });

  // ── 2 & 3: Login Modal + Credentials ──
  await recordSite(browser, 'fd-login', async (page, capture) => {
    await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1000);
    await capture(8);

    // Click Log In — show modal
    await clickWithIndicator(page, page.locator('button:has-text("Log In")').first(), capture, 4);
    await page.waitForTimeout(1500);
    await capture(8);

    // Type email character by character
    const emailInput = page.locator('input[type="email"]').first();
    await emailInput.click();
    await capture(2);
    await emailInput.type(EMAIL, { delay: 50 });
    await capture(4);

    // Type password
    const passInput = page.locator('input[type="password"]').first();
    await passInput.click();
    await capture(2);
    await passInput.type(PASS, { delay: 40 });
    await capture(4);

    // Click modal Log In
    await clickWithIndicator(page, page.locator('button:has-text("Log In")').nth(1), capture, 4);
    await page.waitForTimeout(4000);
    await capture(20); // Goals homepage — empty state
  });

  // ── 4 & 5 & 6 & 7: Empty State → Goal Creation → Generate → Calendar ──
  await recordSite(browser, 'fd-goal-create', async (page, capture) => {
    await loginFlow(page);
    await injectClickIndicator(page);
    await capture(12); // Empty goals page with "Create Your Goal"

    // Click Create Your Goal
    const createBtn = page.locator('button:has-text("Create Your Goal")');
    if (await createBtn.isVisible().catch(() => false)) {
      await clickWithIndicator(page, createBtn, capture, 4);
    } else {
      // Fallback: Add New Goal
      await clickWithIndicator(page, page.locator('button:has-text("Add New Goal")').first(), capture, 4);
    }
    await page.waitForTimeout(2000);
    await capture(10); // Goal creation form

    // Type goal
    const goalInput = page.locator('textarea[placeholder="Type your goal here..."]');
    await goalInput.click();
    await capture(2);
    await goalInput.type('Learn to cook healthy meals', { delay: 55 });
    await capture(8);

    // Scroll down to see motivation + experience
    await smoothScroll(page, capture, 400, 25);
    await capture(5);

    // Fill motivation
    const motivInput = page.locator('textarea[placeholder*="motivates"]');
    if (await motivInput.isVisible().catch(() => false)) {
      await motivInput.click();
      await capture(2);
      await motivInput.type('I want to eat healthier and save money', { delay: 40 });
      await capture(6);
    }

    // Scroll to Generate button
    await smoothScroll(page, capture, 400, 25);
    await capture(5);

    // Click Generate My Plan
    const genBtn = page.locator('button:has-text("Generate My Plan")');
    await clickWithIndicator(page, genBtn, capture, 4);

    // Capture the generating animation
    for (let i = 0; i < 15; i++) {
      await page.waitForTimeout(1000);
      await capture(FPS); // 1 second of frames per iteration
    }

    // Should now show calendar — capture it
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    await capture(15);
    await smoothScroll(page, capture, 400, 25);
    await capture(10);
  });

  // ── 8 & 9: Calendar View + Day View ──
  await recordSite(browser, 'fd-calendar', async (page, capture) => {
    await loginFlow(page);
    await injectClickIndicator(page);

    // Wait for goals page to fully load — look for any goal-related content
    await page.waitForSelector('button:has-text("View 30 Day Plan"), button:has-text("Create Your Goal"), button:has-text("View Today")', { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(1000);
    await capture(8); // Capture whatever state we're in

    // Click "View 30 Day Plan"
    const planBtn = page.locator('button:has-text("View 30 Day Plan")');
    if (await planBtn.isVisible().catch(() => false)) {
      await clickWithIndicator(page, planBtn, capture, 4);
      await page.waitForTimeout(2000);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);
      await capture(15); // Calendar view
      await smoothScroll(page, capture, 400, 30);
      await capture(8);
      await smoothScroll(page, capture, -400, 25);
      await capture(5);

      // Click a day button — today is Thursday March 5
      const dayBtn = page.locator('button:has-text("Thu")').first();
      if (await dayBtn.isVisible().catch(() => false)) {
        await clickWithIndicator(page, dayBtn, capture, 4);
        await page.waitForTimeout(2000);
        await capture(15); // Day view
        await smoothScroll(page, capture, 300, 20);
        await capture(8);
      }
    }
  });

  // ── 10 & 11 & 12: Activities + Submit + Result ──
  await recordSite(browser, 'fd-complete-day', async (page, capture) => {
    await loginFlow(page);
    await injectClickIndicator(page);

    // Wait for goals page to fully load
    await page.waitForSelector('button:has-text("View Today"), button:has-text("Create Your Goal")', { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(1000);
    await capture(5);

    // Go to today's activities
    const todayBtn = page.locator('button:has-text("View Today\'s Activities")');
    if (await todayBtn.isVisible().catch(() => false)) {
      await clickWithIndicator(page, todayBtn, capture, 3);
      await page.waitForTimeout(2000);
      await capture(8);

      // Check activity boxes
      const checkboxes = page.locator('[role="checkbox"]');
      await page.waitForSelector('[role="checkbox"]', { timeout: 5000 }).catch(() => {});
      const count = await checkboxes.count();
      for (let i = 0; i < Math.min(count, 3); i++) {
        const cb = checkboxes.nth(i);
        if (await cb.isVisible().catch(() => false)) {
          await clickWithIndicator(page, cb, capture, 3);
          await page.waitForTimeout(400);
          await capture(3);
        }
      }

      // Scroll down to reflection
      await smoothScroll(page, capture, 300, 20);

      // Type reflection
      const reflection = page.locator('textarea[placeholder*="thoughts"]');
      if (await reflection.isVisible().catch(() => false)) {
        await reflection.click();
        await capture(2);
        await reflection.type('Felt great making progress today!', { delay: 45 });
        await capture(8);
      }

      // Scroll to Submit button
      await smoothScroll(page, capture, 200, 12);
      await capture(4);

      // Click Submit Progress
      const submitBtn = page.locator('button:has-text("Submit Progress")');
      if (await submitBtn.isVisible().catch(() => false)) {
        await clickWithIndicator(page, submitBtn, capture, 4);
        await page.waitForTimeout(2000);
        await capture(15); // XP animation / congrats
        await page.waitForTimeout(2000);
        await capture(15); // Congrats continued
      }
    }
  });

  // ── 13 & 14: Goals Homepage with Stats + Achievements ──
  await recordSite(browser, 'fd-achievements', async (page, capture) => {
    await loginFlow(page);
    await injectClickIndicator(page);
    await capture(15); // Goals homepage — should now show stats

    // Scroll to see stats
    await smoothScroll(page, capture, 400, 30);
    await capture(10);
    await smoothScroll(page, capture, -200, 15);
    await capture(8);

    // Try to find achievements/trophy
    const menuBtn = page.locator('button:has-text("Menu")');
    if (await menuBtn.isVisible().catch(() => false)) {
      await clickWithIndicator(page, menuBtn, capture, 3);
      await page.waitForTimeout(1500);
      await capture(12); // Menu opened

      // Look for any menu items
      const menuItems = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('a, button, [role="menuitem"]'))
          .filter(el => el.offsetParent !== null)
          .map(el => el.textContent?.trim()?.slice(0, 60));
      });
      console.log('  Menu items:', menuItems.join(', '));

      // Close menu
      await page.keyboard.press('Escape');
      await page.waitForTimeout(500);
      await capture(5);
    }
  });

  await browser.close();
  try { fs.rmSync(FRAME_DIR, { recursive: true, force: true }); } catch {}

  console.log('\nDone! FirstDay videos:');
  fs.readdirSync(OUT_DIR).filter(f => f.startsWith('fd-') && f.endsWith('.mp4')).sort().forEach(f => {
    const size = (fs.statSync(path.join(OUT_DIR, f)).size / 1024).toFixed(0);
    console.log(`  ${f} (${size}KB)`);
  });
}

main().catch(console.error);
