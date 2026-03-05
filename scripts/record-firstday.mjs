import { chromium } from 'playwright';
import path from 'path';
import { execSync } from 'child_process';
import fs from 'fs';

const OUT_DIR = path.resolve('public/images/carousel');
const FRAME_DIR = path.resolve('.tmp-frames');

fs.mkdirSync(OUT_DIR, { recursive: true });

const VIEWPORT = { width: 400, height: 400 };
const FPS = 12;

async function smoothScrollCapture(page, capture, distance, frameCount) {
  const stepDistance = distance / frameCount;
  for (let i = 0; i < frameCount; i++) {
    await page.evaluate((d) => window.scrollBy(0, d), stepDistance);
    await capture(1);
  }
}

async function recordSite(browser, name, fn) {
  console.log(`Recording ${name}...`);
  const siteFrameDir = path.join(FRAME_DIR, name);
  fs.mkdirSync(siteFrameDir, { recursive: true });

  const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 1 });
  const page = await context.newPage();
  let frameNum = 0;
  const capture = async (count) => {
    for (let i = 0; i < count; i++) {
      await page.screenshot({ path: path.join(siteFrameDir, `frame-${String(frameNum).padStart(5, '0')}.png`) });
      frameNum++;
    }
  };

  await fn(page, capture);
  await page.close();
  await context.close();

  const mp4Path = path.join(OUT_DIR, `${name}.mp4`);
  console.log(`  Stitching ${frameNum} frames...`);
  execSync(
    `ffmpeg -y -framerate ${FPS} -i "${siteFrameDir}/frame-%05d.png" -vf "scale=600:600:flags=lanczos" -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -an -movflags +faststart "${mp4Path}"`,
    { stdio: 'pipe' }
  );
  const size = (fs.statSync(mp4Path).size / 1024).toFixed(0);
  console.log(`  Saved ${name}.mp4 (${size}KB)`);
  fs.rmSync(siteFrameDir, { recursive: true, force: true });
}

async function main() {
  const browser = await chromium.launch({ headless: true });

  // ─── FirstDay: Get Started → signup page ───
  await recordSite(browser, 'firstday-onboarding', async (page, capture) => {
    await page.goto('https://firstday.life', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForSelector('text=Get Started', { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(500);
    await capture(15);
    await page.click('text=Get Started');
    await page.waitForTimeout(2500);
    await capture(20);
    await smoothScrollCapture(page, capture, 300, 30);
    await capture(15);
  });

  // ─── FirstDay: Start Your Own Journey → goal creation ───
  await recordSite(browser, 'firstday-goal', async (page, capture) => {
    await page.goto('https://firstday.life', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1000);

    // Click Start Your Own Journey
    const journeyBtn = await page.locator('text=Start Your Own Journey').first();
    await journeyBtn.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await capture(15);
    await journeyBtn.click();
    await page.waitForTimeout(2500);
    await capture(20);

    // Try to type a goal if there's an input
    const input = page.locator('input[type="text"], textarea').first();
    if (await input.isVisible().catch(() => false)) {
      await input.click();
      await capture(5);
      await input.type('Learn to play guitar', { delay: 80 });
      await capture(20);
    }

    await smoothScrollCapture(page, capture, 400, 35);
    await capture(15);
  });

  // ─── FirstDay: Deep scroll through features ───
  await recordSite(browser, 'firstday-features', async (page, capture) => {
    await page.goto('https://firstday.life', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1000);

    // Scroll past hero to How It Works
    const howItWorks = page.locator('text=How It Works').first();
    await howItWorks.scrollIntoViewIfNeeded().catch(() => {});
    await page.waitForTimeout(300);
    await capture(15);
    await smoothScrollCapture(page, capture, 800, 60);
    await capture(10);
    await smoothScrollCapture(page, capture, 600, 45);
    await capture(15);
  });

  await browser.close();
  try { fs.rmSync(FRAME_DIR, { recursive: true, force: true }); } catch {}

  console.log('\nDone!');
  fs.readdirSync(OUT_DIR).filter(f => f.endsWith('.mp4')).forEach(f => {
    const size = (fs.statSync(path.join(OUT_DIR, f)).size / 1024).toFixed(0);
    console.log(`  ${f} (${size}KB)`);
  });
}

main().catch(console.error);
