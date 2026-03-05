import { chromium } from 'playwright';
import path from 'path';

const OUT = path.resolve('public/images/mockups');

const PAGES = [
  { url: 'https://middleman.quest', filename: 'middleman-screen.png' },
  { url: 'https://firstday.life', filename: 'firstday-screen.png' },
];

// iPhone 14 Pro dimensions
const VIEWPORT = { width: 393, height: 852 };

async function main() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    colorScheme: 'dark',
  });

  for (const page of PAGES) {
    const tab = await context.newPage();
    await tab.goto(page.url, { waitUntil: 'networkidle', timeout: 30000 });
    await tab.waitForTimeout(2000);
    await tab.screenshot({
      path: path.join(OUT, page.filename),
      type: 'png',
    });
    console.log(`Captured ${page.filename} from ${page.url}`);
    await tab.close();
  }

  await browser.close();
  console.log(`\nDone — screenshots saved to ${OUT}`);
}

main().catch(console.error);
