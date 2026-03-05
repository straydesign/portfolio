import { chromium } from 'playwright';
import path from 'path';
import { execSync } from 'child_process';
import fs from 'fs';

const OUT_DIR = path.resolve('public/images/carousel');
const FRAME_DIR = path.resolve('.tmp-frames');

fs.mkdirSync(OUT_DIR, { recursive: true });

const VIEWPORT = { width: 400, height: 400 };
const FPS = 12;

const SITES = [
  // ─── MIDDLEMAN ───
  {
    name: 'middleman-login',
    url: 'https://middleman.quest',
    waitFor: 'text=MIDDLEMAN',
    actions: async (page, capture) => {
      await capture(20);
      await smoothScrollCapture(page, capture, 350, 40);
      await capture(10);
      await smoothScrollCapture(page, capture, -350, 30);
      await capture(15);
    },
  },
  // ─── FIRSTDAY ───
  {
    name: 'firstday-hero',
    url: 'https://firstday.life',
    waitFor: 'text=Achieve any goal',
    actions: async (page, capture) => {
      await capture(20);
      await smoothScrollCapture(page, capture, 500, 45);
      await capture(10);
      await smoothScrollCapture(page, capture, -500, 40);
      await capture(15);
    },
  },
  {
    name: 'firstday-features',
    url: 'https://firstday.life',
    waitFor: 'text=Achieve any goal',
    actions: async (page, capture) => {
      // Scroll past hero to features
      await page.evaluate(() => window.scrollTo(0, 600));
      await page.waitForTimeout(300);
      await capture(15);
      await smoothScrollCapture(page, capture, 600, 50);
      await capture(10);
      await smoothScrollCapture(page, capture, 500, 40);
      await capture(10);
      await smoothScrollCapture(page, capture, -400, 35);
      await capture(15);
    },
  },
  {
    name: 'firstday-bottom',
    url: 'https://firstday.life',
    waitFor: 'text=Achieve any goal',
    actions: async (page, capture) => {
      // Scroll to bottom area
      await page.evaluate(() => window.scrollTo(0, 1500));
      await page.waitForTimeout(300);
      await capture(15);
      await smoothScrollCapture(page, capture, 600, 50);
      await capture(10);
      await smoothScrollCapture(page, capture, -300, 30);
      await capture(15);
    },
  },
  // ─── PORTFOLIO (just one for variety) ───
  {
    name: 'portfolio-home',
    url: 'http://localhost:3000',
    waitFor: 'text=PRODUCT DESIGNER',
    actions: async (page, capture) => {
      await capture(20);
      await smoothScrollCapture(page, capture, 500, 45);
      await capture(10);
      await smoothScrollCapture(page, capture, -500, 40);
      await capture(15);
    },
  },
];

async function smoothScrollCapture(page, capture, distance, frameCount) {
  const stepDistance = distance / frameCount;
  for (let i = 0; i < frameCount; i++) {
    await page.evaluate((d) => window.scrollBy(0, d), stepDistance);
    await capture(1);
  }
}

async function main() {
  const browser = await chromium.launch();

  // Clean old mp4s
  fs.readdirSync(OUT_DIR).filter(f => f.endsWith('.mp4')).forEach(f => {
    fs.unlinkSync(path.join(OUT_DIR, f));
  });

  for (const site of SITES) {
    console.log(`Recording ${site.name}...`);

    const siteFrameDir = path.join(FRAME_DIR, site.name);
    fs.mkdirSync(siteFrameDir, { recursive: true });

    const context = await browser.newContext({
      viewport: VIEWPORT,
      deviceScaleFactor: 1,
      colorScheme: 'dark',
    });

    const page = await context.newPage();
    await page.goto(site.url, { waitUntil: 'networkidle', timeout: 30000 });

    try {
      await page.waitForSelector(site.waitFor, { timeout: 10000 });
    } catch {
      console.log(`  Warning: waitFor not found, continuing`);
    }
    await page.waitForTimeout(500);

    let frameNum = 0;
    const capture = async (count) => {
      for (let i = 0; i < count; i++) {
        const framePath = path.join(siteFrameDir, `frame-${String(frameNum).padStart(5, '0')}.png`);
        await page.screenshot({ path: framePath });
        frameNum++;
      }
    };

    await site.actions(page, capture);

    await page.close();
    await context.close();

    const mp4Path = path.join(OUT_DIR, `${site.name}.mp4`);
    console.log(`  Stitching ${frameNum} frames...`);
    try {
      execSync(
        `ffmpeg -y -framerate ${FPS} -i "${siteFrameDir}/frame-%05d.png" -vf "scale=600:600:flags=lanczos" -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -an -movflags +faststart "${mp4Path}"`,
        { stdio: 'pipe' }
      );
      const size = (fs.statSync(mp4Path).size / 1024).toFixed(0);
      console.log(`  Saved ${site.name}.mp4 (${size}KB)`);
    } catch (e) {
      console.error(`  ffmpeg failed: ${e.stderr?.toString().slice(-200) || e.message}`);
    }

    fs.rmSync(siteFrameDir, { recursive: true, force: true });
  }

  await browser.close();
  try { fs.rmSync(FRAME_DIR, { recursive: true, force: true }); } catch {}

  console.log('\nDone!');
  fs.readdirSync(OUT_DIR).filter(f => f.endsWith('.mp4')).forEach(f => {
    const size = (fs.statSync(path.join(OUT_DIR, f)).size / 1024).toFixed(0);
    console.log(`  ${f} (${size}KB)`);
  });
}

main().catch(console.error);
