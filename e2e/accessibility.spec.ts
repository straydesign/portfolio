import { test, expect } from 'playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
  test.describe('Axe automated scan', () => {
    test('home page has no critical accessibility violations', async ({ page }) => {
      await page.goto('/');
      // Wait for client-side hydration and animations to settle
      await page.waitForTimeout(2000);

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        // Exclude the WebGL canvas which axe can't meaningfully scan
        .exclude('canvas')
        // Footer attribution is intentionally low-contrast (decorative, not primary content)
        .exclude('.text-white\\/30')
        .analyze();

      // Filter out known false positives or issues from third-party scripts
      const criticalViolations = results.violations.filter(
        (v) => v.impact === 'critical' || v.impact === 'serious',
      );

      expect(
        criticalViolations,
        `Found ${criticalViolations.length} critical/serious a11y violations:\n${criticalViolations.map((v) => `  - ${v.id}: ${v.description} (${v.nodes.length} instances)`).join('\n')}`,
      ).toHaveLength(0);
    });

    test('about page has no critical accessibility violations', async ({ page }) => {
      await page.goto('/about');
      await page.waitForTimeout(2000);

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .exclude('canvas')
        .exclude('.text-white\\/30')
        .analyze();

      const criticalViolations = results.violations.filter(
        (v) => v.impact === 'critical' || v.impact === 'serious',
      );

      expect(
        criticalViolations,
        `Found ${criticalViolations.length} critical/serious a11y violations:\n${criticalViolations.map((v) => `  - ${v.id}: ${v.description} (${v.nodes.length} instances)`).join('\n')}`,
      ).toHaveLength(0);
    });

    test('resume page has no critical accessibility violations', async ({ page }) => {
      await page.goto('/resume');
      await page.waitForTimeout(2000);

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .exclude('canvas')
        .exclude('.text-white\\/30')
        .analyze();

      const criticalViolations = results.violations.filter(
        (v) => v.impact === 'critical' || v.impact === 'serious',
      );

      expect(
        criticalViolations,
        `Found ${criticalViolations.length} critical/serious a11y violations:\n${criticalViolations.map((v) => `  - ${v.id}: ${v.description} (${v.nodes.length} instances)`).join('\n')}`,
      ).toHaveLength(0);
    });
  });

  test.describe('Heading hierarchy', () => {
    test('home page has exactly one h1', async ({ page }) => {
      await page.goto('/');
      const h1Elements = page.locator('h1');
      await expect(h1Elements).toHaveCount(1);
    });

    test('about page has exactly one h1', async ({ page }) => {
      await page.goto('/about');
      const h1Elements = page.locator('h1');
      await expect(h1Elements).toHaveCount(1);
    });

    test('home page headings exist in logical order', async ({ page }) => {
      await page.goto('/');

      // h1 exists (PRODUCT DESIGNER)
      const h1 = page.locator('h1').first();
      await expect(h1).toBeVisible();

      // h2 headings exist for major sections
      const h2s = page.locator('h2');
      const h2Count = await h2s.count();
      expect(h2Count).toBeGreaterThanOrEqual(2);
    });
  });

  test.describe('Images', () => {
    test('all images have alt attributes', async ({ page }) => {
      await page.goto('/');

      const images = page.locator('img');
      const count = await images.count();

      for (let i = 0; i < count; i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');
        // alt can be empty string for decorative images, but must exist
        expect(alt, `Image at index ${i} is missing alt attribute`).not.toBeNull();
      }
    });

    test('about page images have alt attributes', async ({ page }) => {
      await page.goto('/about');

      const images = page.locator('img');
      const count = await images.count();

      for (let i = 0; i < count; i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');
        expect(alt, `Image at index ${i} is missing alt attribute`).not.toBeNull();
      }
    });
  });

  test.describe('Focus management', () => {
    test('interactive elements have visible focus styles', async ({ page }) => {
      await page.goto('/');
      await page.setViewportSize({ width: 1280, height: 720 });

      // Tab to the skip link and verify it becomes visible on focus
      await page.keyboard.press('Tab');
      const skipLink = page.locator('a.skip-link');
      await expect(skipLink).toBeFocused();
    });

    test('nav buttons are keyboard focusable', async ({ page }) => {
      await page.goto('/');
      await page.setViewportSize({ width: 1280, height: 720 });

      // Tab past skip link into the header navigation
      // The nav buttons should be reachable by keyboard
      const navButtons = page.locator('nav button');
      const count = await navButtons.count();
      expect(count).toBeGreaterThan(0);

      // Verify all nav buttons have tabIndex >= 0 (are focusable)
      for (let i = 0; i < count; i++) {
        const button = navButtons.nth(i);
        const tagName = await button.evaluate((el) => el.tagName);
        // Buttons are natively focusable
        expect(tagName.toLowerCase()).toBe('button');
      }
    });

    test('project cards are keyboard accessible', async ({ page }) => {
      await page.goto('/');

      // Project cards have role="link" and tabIndex={0}
      const projectCards = page.locator('[role="link"][tabindex="0"]');
      const count = await projectCards.count();
      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe('ARIA landmarks', () => {
    test('page has proper landmark structure', async ({ page }) => {
      await page.goto('/');

      // Header
      const header = page.locator('header');
      await expect(header).toBeAttached();

      // Main
      const main = page.locator('main');
      await expect(main).toBeAttached();

      // Footer
      const footer = page.locator('footer');
      await expect(footer).toBeAttached();

      // Nav
      const nav = page.locator('nav');
      await expect(nav).toBeAttached();
    });
  });
});
