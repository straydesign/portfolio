import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const PAGES = [
  { name: 'Home', path: '/' },
  { name: 'Resume', path: '/resume' },
  { name: 'Books & Interests', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Middleman Case Study', path: '/middleman' },
  { name: 'FirstDay Case Study', path: '/dayone' },
  { name: 'DoorDash Case Study', path: '/doordash' },
  { name: 'Design System', path: '/design-system' },
];

const BASE = 'http://localhost:3000';

interface Violation {
  id: string;
  impact: string | null;
  description: string;
  helpUrl: string;
  nodes: { html: string; failureSummary: string }[];
}

async function run() {
  const browser = await chromium.launch();
  const context = await browser.newContext();

  let totalViolations = 0;
  const results: { page: string; violations: Violation[] }[] = [];

  for (const page of PAGES) {
    const tab = await context.newPage();
    await tab.goto(`${BASE}${page.path}`, { waitUntil: 'networkidle' });

    // Wait for client-side rendering
    await tab.waitForTimeout(1500);

    const axeResults = await new AxeBuilder({ page: tab })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
      .analyze();

    if (axeResults.violations.length > 0) {
      results.push({ page: page.name, violations: axeResults.violations as Violation[] });
      totalViolations += axeResults.violations.length;
    }

    await tab.close();
  }

  // Print report
  console.log('\n' + '='.repeat(70));
  console.log('  ACCESSIBILITY AUDIT REPORT — straydesign.co');
  console.log('  WCAG 2.1 Level AA + Best Practices');
  console.log('='.repeat(70) + '\n');

  if (results.length === 0) {
    console.log('  ✅ No violations found across all pages.\n');
  } else {
    console.log(`  Found ${totalViolations} issue(s) across ${results.length} page(s).\n`);

    for (const { page, violations } of results) {
      console.log(`─── ${page} ${'─'.repeat(Math.max(0, 55 - page.length))}`);
      for (const v of violations) {
        const severity = v.impact?.toUpperCase() || 'UNKNOWN';
        console.log(`\n  [${severity}] ${v.id}`);
        console.log(`  ${v.description}`);
        console.log(`  Affected elements: ${v.nodes.length}`);
        for (const node of v.nodes.slice(0, 3)) {
          const html = node.html.length > 120 ? node.html.slice(0, 120) + '...' : node.html;
          console.log(`    → ${html}`);
          console.log(`      ${node.failureSummary}`);
        }
        if (v.nodes.length > 3) {
          console.log(`    ... and ${v.nodes.length - 3} more`);
        }
        console.log(`  Docs: ${v.helpUrl}`);
      }
      console.log('');
    }
  }

  console.log('='.repeat(70));
  console.log(`  Pages scanned: ${PAGES.length}`);
  console.log(`  Total violations: ${totalViolations}`);
  console.log('='.repeat(70) + '\n');

  await browser.close();
  process.exit(totalViolations > 0 ? 1 : 0);
}

run().catch((e) => {
  console.error('Audit failed:', e.message);
  process.exit(2);
});
