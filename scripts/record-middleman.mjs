import { chromium } from 'playwright';
import path from 'path';
import { execSync } from 'child_process';
import fs from 'fs';
import sharp from 'sharp';

const OUT_DIR = path.resolve('public/images/carousel');
const FRAME_DIR = path.resolve('.tmp-frames');
fs.mkdirSync(OUT_DIR, { recursive: true });

// 9:16 phone viewport
const VIEWPORT = { width: 393, height: 852 };
const FPS = 12;

// Final square output
const SQUARE = 600;
// Phone dimensions on the square canvas
const PHONE_W = 260;
const PHONE_H = Math.round(PHONE_W * (852 / 393)); // ~564
const PHONE_X = Math.round((SQUARE - PHONE_W) / 2);
const PHONE_Y = Math.round((SQUARE - PHONE_H) / 2);
const CORNER_R = 32;

// Create gradient background (neon accent)
async function createGradientBg() {
  // Neon blue-purple gradient
  const svg = `<svg width="${SQUARE}" height="${SQUARE}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#0066FF;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#6633FF;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#000000;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="${SQUARE}" height="${SQUARE}" fill="url(#g)" />
  </svg>`;
  return sharp(Buffer.from(svg)).png().toBuffer();
}

// Create phone frame mask (rounded rectangle)
function phoneMaskSvg() {
  return `<svg width="${PHONE_W}" height="${PHONE_H}" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="${PHONE_W}" height="${PHONE_H}" rx="${CORNER_R}" ry="${CORNER_R}" fill="white" />
  </svg>`;
}

// Create screen gloss overlay
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

// Create phone shadow
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

// Thin phone bezel border
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
  // Resize screenshot to phone dimensions and apply rounded mask
  const resized = await sharp(inputPath)
    .resize(PHONE_W, PHONE_H, { fit: 'cover' })
    .composite([{ input: maskBuf, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // Add gloss overlay to the phone screen
  const withGloss = await sharp(resized)
    .composite([{ input: glossBuf, blend: 'over' }])
    .png()
    .toBuffer();

  // Compose: gradient bg + shadow + phone screen + bezel
  await sharp(gradientBuf)
    .composite([
      { input: shadowBuf, blend: 'over' },
      { input: withGloss, left: PHONE_X, top: PHONE_Y, blend: 'over' },
      { input: bezelBuf, blend: 'over' },
    ])
    .png()
    .toFile(outputPath);
}

async function smoothScrollCapture(page, capture, distance, frameCount) {
  const stepDistance = distance / frameCount;
  for (let i = 0; i < frameCount; i++) {
    await page.evaluate((d) => window.scrollBy(0, d), stepDistance);
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
    await fn(page, capture);
  } catch (e) {
    console.log(`  Error: ${e.message.split('\n')[0]}`);
  }
  await page.close();
  await context.close();

  if (frameNum === 0) { console.log(`  Skipped (no frames)`); return; }

  // Composite all frames into phone mockups
  console.log(`  Compositing ${frameNum} frames into phone mockups...`);
  for (let i = 0; i < frameNum; i++) {
    const rawPath = path.join(rawDir, `frame-${String(i).padStart(5, '0')}.png`);
    const compPath = path.join(compDir, `frame-${String(i).padStart(5, '0')}.png`);
    await compositeFrame(rawPath, compPath);
  }

  const mp4Path = path.join(OUT_DIR, `${name}.mp4`);
  console.log(`  Stitching...`);
  execSync(
    `ffmpeg -y -framerate ${FPS} -i "${compDir}/frame-%05d.png" -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p -an -movflags +faststart "${mp4Path}"`,
    { stdio: 'pipe' }
  );
  const size = (fs.statSync(mp4Path).size / 1024).toFixed(0);
  console.log(`  ✓ ${name}.mp4 (${size}KB)`);
  fs.rmSync(path.join(FRAME_DIR, name), { recursive: true, force: true });
}

async function enterDemo(page) {
  await page.goto('https://middleman.quest', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForSelector('text=MIDDLEMAN', { timeout: 10000 }).catch(() => {});
  await page.waitForTimeout(500);
  await page.locator('text=Try Demo').first().click();
  await page.waitForTimeout(3000);
}

async function main() {
  await initAssets();
  const browser = await chromium.launch({ headless: true });

  // 1. Login Flow
  await recordSite(browser, 'mm-login', async (page, capture) => {
    await page.goto('https://middleman.quest', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForSelector('text=MIDDLEMAN', { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(300);
    await capture(15);
    await page.locator('text=Try Demo').first().click();
    await page.waitForTimeout(1000);
    await capture(10);
    await page.waitForTimeout(2000);
    await capture(35);
  });

  // 2. Dashboard Overview
  await recordSite(browser, 'mm-dashboard', async (page, capture) => {
    await enterDemo(page);
    await capture(15);
    await smoothScrollCapture(page, capture, 800, 50);
    await capture(12);
    await smoothScrollCapture(page, capture, -300, 19);
  });

  // 3. Store Switcher
  await recordSite(browser, 'mm-store-switch', async (page, capture) => {
    await enterDemo(page);
    await capture(10);
    await page.locator('button[aria-label*="Current store"]').first().click();
    await page.waitForTimeout(1500);
    await capture(18);
    const options = page.locator('[role="option"], [role="menuitem"], li button, [role="dialog"] button, [role="listbox"] div');
    const ct = await options.count();
    if (ct > 1) {
      await options.nth(1).click();
      await page.waitForTimeout(1500);
      await capture(15);
    } else {
      await capture(15);
      await page.keyboard.press('Escape');
      await page.waitForTimeout(500);
      await capture(7);
    }
  });

  // 4. Orders Tab
  await recordSite(browser, 'mm-orders', async (page, capture) => {
    await enterDemo(page);
    await capture(8);
    await page.locator('button[aria-label="Navigate to Orders"]').first().click();
    await page.waitForTimeout(2000);
    await capture(15);
    await smoothScrollCapture(page, capture, 500, 35);
    await capture(8);
    const row = page.locator('[role="row"], [role="listitem"], .cursor-pointer, tr').first();
    if (await row.isVisible().catch(() => false)) {
      await row.click();
      await page.waitForTimeout(2000);
      await capture(15);
      await smoothScrollCapture(page, capture, 300, 20);
    }
    await capture(10);
  });

  // 5. Stock Management
  await recordSite(browser, 'mm-stock', async (page, capture) => {
    await enterDemo(page);
    await capture(5);
    await page.locator('button[aria-label="Navigate to Stock"]').first().click();
    await page.waitForTimeout(2000);
    await capture(15);
    await smoothScrollCapture(page, capture, 600, 40);
    await capture(10);
    const check = page.locator('input[type="checkbox"], [role="checkbox"], [role="switch"]').first();
    if (await check.isVisible().catch(() => false)) {
      await check.click();
      await page.waitForTimeout(500);
      await capture(8);
    }
    await smoothScrollCapture(page, capture, 300, 20);
    await capture(8);
  });

  // 6. Route Map
  await recordSite(browser, 'mm-route', async (page, capture) => {
    await enterDemo(page);
    await capture(5);
    await page.locator('button[aria-label="View map"]').first().click();
    await page.waitForTimeout(3000);
    await capture(25);
    await smoothScrollCapture(page, capture, 300, 25);
    await capture(10);
    await smoothScrollCapture(page, capture, -150, 12);
    await capture(12);
  });

  // 7. Tab-to-Tab Navigation
  await recordSite(browser, 'mm-nav-flow', async (page, capture) => {
    await enterDemo(page);
    await capture(10);
    await page.locator('button[aria-label="Navigate to Orders"]').first().click();
    await page.waitForTimeout(1200);
    await capture(14);
    await page.locator('button[aria-label="Navigate to Stock"]').first().click();
    await page.waitForTimeout(1200);
    await capture(14);
    await page.locator('button[aria-label="Navigate to Dashboard"]').first().click();
    await page.waitForTimeout(1200);
    await capture(14);
    await page.locator('button[aria-label="View map"]').first().click({ timeout: 5000 });
    await page.waitForTimeout(1500);
    await capture(14);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
    await capture(6);
  });

  // 8. Settings Panel
  await recordSite(browser, 'mm-settings', async (page, capture) => {
    await enterDemo(page);
    await capture(8);
    await page.locator('button[aria-label="Open settings"]').first().click();
    await page.waitForTimeout(2000);
    await capture(15);
    await smoothScrollCapture(page, capture, 400, 30);
    await capture(12);
  });

  await browser.close();
  try { fs.rmSync(FRAME_DIR, { recursive: true, force: true }); } catch {}

  console.log('\nDone! Middleman videos:');
  fs.readdirSync(OUT_DIR).filter(f => f.startsWith('mm-') && f.endsWith('.mp4')).sort().forEach(f => {
    const size = (fs.statSync(path.join(OUT_DIR, f)).size / 1024).toFixed(0);
    console.log(`  ${f} (${size}KB)`);
  });
}

main().catch(console.error);
