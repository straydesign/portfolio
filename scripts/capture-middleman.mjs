import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

const CHROME_PATH = '/Users/tomsesler/.cache/puppeteer/chrome/mac_arm-145.0.7632.77/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const OUTPUT_DIR = '/Users/tomsesler/portfolio/public/images/middleman';
const BASE_URL = 'https://middleman.quest';

// Ensure output directory exists
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

let screenshotIndex = 0;

async function takeScreenshot(page, name) {
  screenshotIndex++;
  const filename = `screen-${screenshotIndex}-${name}.png`;
  const filepath = path.join(OUTPUT_DIR, filename);
  await page.screenshot({ path: filepath, fullPage: true });
  console.log(`Saved: ${filename}`);
  return filepath;
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process',
    ],
  });

  const page = await browser.newPage();

  // Set iPhone 14 Pro viewport with 2x device scale factor
  await page.setViewport({
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
  });

  // Set a mobile user agent
  await page.setUserAgent(
    'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
  );

  console.log(`Navigating to ${BASE_URL}...`);

  try {
    await page.goto(BASE_URL, {
      waitUntil: 'networkidle2',
      timeout: 60000,
    });
  } catch (err) {
    console.log(`Navigation warning: ${err.message}`);
    console.log('Continuing anyway...');
  }

  // Wait a bit for any animations or lazy loading
  await sleep(3000);

  // Log the page title and URL
  const title = await page.title();
  const currentUrl = page.url();
  console.log(`Page title: "${title}"`);
  console.log(`Current URL: ${currentUrl}`);

  // Check page content to understand the structure
  const pageContent = await page.evaluate(() => {
    return {
      bodyHTML: document.body?.innerHTML?.substring(0, 2000) || 'no body',
      iframes: Array.from(document.querySelectorAll('iframe')).map(f => ({
        src: f.src,
        width: f.width,
        height: f.height,
      })),
      links: Array.from(document.querySelectorAll('a')).map(a => ({
        href: a.href,
        text: a.textContent?.trim().substring(0, 50),
      })),
      buttons: Array.from(document.querySelectorAll('button, [role="button"], [data-action]')).map(b => ({
        text: b.textContent?.trim().substring(0, 50),
        tag: b.tagName,
        className: b.className?.substring?.(0, 100) || '',
      })),
      clickableElements: Array.from(document.querySelectorAll('[onclick], [data-click], [tabindex]')).map(el => ({
        tag: el.tagName,
        text: el.textContent?.trim().substring(0, 50),
      })),
    };
  });

  console.log('\n--- Page Structure ---');
  console.log('Iframes:', JSON.stringify(pageContent.iframes, null, 2));
  console.log('Links:', JSON.stringify(pageContent.links, null, 2));
  console.log('Buttons:', JSON.stringify(pageContent.buttons, null, 2));
  console.log('Clickable elements:', JSON.stringify(pageContent.clickableElements, null, 2));
  console.log('Body HTML (first 2000 chars):', pageContent.bodyHTML);

  // Take the initial screenshot
  await takeScreenshot(page, 'home');

  // Check if there's a Figma prototype iframe
  if (pageContent.iframes.length > 0) {
    console.log('\n--- Found iframes, attempting to interact with Figma prototype ---');

    for (const iframe of pageContent.iframes) {
      if (iframe.src && (iframe.src.includes('figma') || iframe.src.includes('proto'))) {
        console.log(`Figma iframe found: ${iframe.src}`);

        // Try navigating directly to the iframe source
        const iframePage = await browser.newPage();
        await iframePage.setViewport({
          width: 390,
          height: 844,
          deviceScaleFactor: 2,
        });
        await iframePage.setUserAgent(
          'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
        );

        try {
          await iframePage.goto(iframe.src, {
            waitUntil: 'networkidle2',
            timeout: 60000,
          });
          await sleep(3000);
          await takeScreenshot(iframePage, 'figma-prototype');
        } catch (err) {
          console.log(`Could not load iframe directly: ${err.message}`);
        }
        await iframePage.close();
      }
    }
  }

  // Strategy: Try to interact with the page directly
  // Look for clickable elements that might navigate between screens
  console.log('\n--- Attempting to find and click through screens ---');

  // First, let's check if this is a Figma prototype embedded page
  // Figma prototypes render in a canvas, so we need to try clicking on areas
  const hasFigmaCanvas = await page.evaluate(() => {
    return !!document.querySelector('canvas') ||
           !!document.querySelector('[data-testid]') ||
           !!document.querySelector('.figma-prototype') ||
           document.body.innerHTML.includes('figma');
  });

  console.log(`Has Figma-like canvas: ${hasFigmaCanvas}`);

  // Try to find and click interactive elements
  // Strategy 1: Click on buttons and links
  const clickTargets = await page.evaluate(() => {
    const targets = [];

    // Get all potentially clickable elements
    const selectors = [
      'button',
      'a',
      '[role="button"]',
      '[data-action]',
      '[onclick]',
      'input[type="submit"]',
      '.btn',
      '.button',
      '[tabindex="0"]',
      'nav a',
      'nav button',
    ];

    for (const selector of selectors) {
      const elements = document.querySelectorAll(selector);
      for (const el of elements) {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          targets.push({
            selector,
            text: el.textContent?.trim().substring(0, 50),
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2,
            tag: el.tagName,
            href: el.href || '',
          });
        }
      }
    }

    return targets;
  });

  console.log(`Found ${clickTargets.length} clickable targets`);

  // Track which screens we've already captured (by comparing page content hashes)
  const capturedScreens = new Set();
  capturedScreens.add(await getPageHash(page));

  // Click through interactive elements
  for (const target of clickTargets) {
    try {
      console.log(`\nClicking: "${target.text}" (${target.tag} at ${target.x},${target.y})`);

      // If it's an external link, skip
      if (target.href && !target.href.includes('middleman.quest') && !target.href.startsWith('/') && !target.href.startsWith('#')) {
        console.log(`  Skipping external link: ${target.href}`);
        continue;
      }

      await page.mouse.click(target.x, target.y);
      await sleep(2000);

      // Check if the page changed
      const newHash = await getPageHash(page);
      if (!capturedScreens.has(newHash)) {
        capturedScreens.add(newHash);
        const safeName = (target.text || 'screen')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .substring(0, 30)
          .replace(/^-|-$/g, '');
        await takeScreenshot(page, safeName || 'screen');
      } else {
        console.log('  Page did not change significantly');
      }
    } catch (err) {
      console.log(`  Error clicking: ${err.message}`);
    }
  }

  // Strategy 2: If it's a prototype-like page, try clicking on common screen areas
  // Mobile prototypes often have bottom navigation, cards, etc.
  console.log('\n--- Trying position-based clicks for prototype navigation ---');

  const positionClicks = [
    { name: 'center', x: 195, y: 422 },
    { name: 'bottom-nav-left', x: 65, y: 800 },
    { name: 'bottom-nav-center', x: 195, y: 800 },
    { name: 'bottom-nav-right', x: 325, y: 800 },
    { name: 'top-right', x: 350, y: 50 },
    { name: 'top-left', x: 40, y: 50 },
    { name: 'cta-area', x: 195, y: 650 },
    { name: 'card-first', x: 195, y: 300 },
    { name: 'card-second', x: 195, y: 500 },
  ];

  for (const pos of positionClicks) {
    try {
      console.log(`Clicking position: ${pos.name} (${pos.x}, ${pos.y})`);
      await page.mouse.click(pos.x, pos.y);
      await sleep(1500);

      const newHash = await getPageHash(page);
      if (!capturedScreens.has(newHash)) {
        capturedScreens.add(newHash);
        await takeScreenshot(page, pos.name);
      }
    } catch (err) {
      console.log(`  Error: ${err.message}`);
    }
  }

  // Strategy 3: Navigate back and try other paths
  console.log('\n--- Trying to go back to home and explore other paths ---');
  try {
    await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(3000);
  } catch (err) {
    console.log(`Navigation back warning: ${err.message}`);
  }

  // Try scrolling to reveal more content
  console.log('\n--- Scrolling to check for more content ---');
  const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
  console.log(`Page scroll height: ${scrollHeight}`);

  if (scrollHeight > 844) {
    for (let scrollPos = 844; scrollPos < scrollHeight; scrollPos += 844) {
      await page.evaluate((pos) => window.scrollTo(0, pos), scrollPos);
      await sleep(1000);
      const newHash = await getPageHash(page);
      if (!capturedScreens.has(newHash)) {
        capturedScreens.add(newHash);
        await takeScreenshot(page, `scroll-${scrollPos}`);
      }
    }
  }

  // Strategy 4: Check if there are different URL paths we can try
  console.log('\n--- Checking for alternate URL paths ---');
  const urlsToTry = [
    `${BASE_URL}/`,
    `${BASE_URL}/#`,
    `${BASE_URL}/home`,
    `${BASE_URL}/store`,
    `${BASE_URL}/order`,
    `${BASE_URL}/menu`,
  ];

  for (const url of urlsToTry) {
    if (url === BASE_URL || url === `${BASE_URL}/`) continue;
    try {
      console.log(`Trying URL: ${url}`);
      const response = await page.goto(url, {
        waitUntil: 'networkidle2',
        timeout: 15000,
      });
      if (response && response.status() < 400) {
        await sleep(2000);
        const newHash = await getPageHash(page);
        if (!capturedScreens.has(newHash)) {
          capturedScreens.add(newHash);
          const pathName = new URL(url).pathname.replace(/\//g, '-').substring(1) || 'alt';
          await takeScreenshot(page, pathName);
        }
      }
    } catch (err) {
      console.log(`  Could not load: ${err.message}`);
    }
  }

  console.log(`\n--- Done! Captured ${screenshotIndex} screenshots ---`);
  console.log(`Screenshots saved to: ${OUTPUT_DIR}`);

  await browser.close();
}

async function getPageHash(page) {
  try {
    return await page.evaluate(() => {
      // Create a simple hash of the visible page content
      const bodyText = document.body?.innerText || '';
      const bodyClasses = document.body?.className || '';
      const url = window.location.href;
      // Include visible elements structure
      const structure = Array.from(document.querySelectorAll('*'))
        .filter(el => {
          const rect = el.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0;
        })
        .slice(0, 50)
        .map(el => `${el.tagName}.${el.className}`)
        .join('|');
      return `${url}::${bodyText.substring(0, 500)}::${structure.substring(0, 500)}`;
    });
  } catch {
    return Math.random().toString(); // If we can't hash, treat as unique
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
